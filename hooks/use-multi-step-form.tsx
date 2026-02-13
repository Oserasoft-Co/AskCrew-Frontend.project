import { parseAsInteger, useQueryState } from "nuqs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
type FilesMap = Record<string, File[]>;

const sanitizeForStorage = (obj: unknown): unknown => {
  if (obj == null || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map(sanitizeForStorage);
  }

  const record = obj as Record<string, unknown>;
  const copy: Record<string, unknown> = {};

  for (const key in record) {
    if (!Object.prototype.hasOwnProperty.call(record, key)) continue;
    const val = record[key];
    if (typeof val === "string") {
      if (val.startsWith("data:") || val.length > 100000) {
        copy[key] = "__omitted_large_data__";
        continue;
      }
      copy[key] = val;
      continue;
    }
    if (typeof val === "object" && val !== null) {
      try {
        copy[key] = sanitizeForStorage(val);
      } catch {
        copy[key] = undefined;
      }
      continue;
    }
    copy[key] = val;
  }
  return copy;
};

export interface MultiStepFormHook<T extends Record<string, unknown>> {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  next: () => void;
  previous: () => void;
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  saveStepData: (data: Partial<T>) => void;
  clearData: () => void;
  isLoaded: boolean;
  files: FilesMap;
  saveFiles: (key: string, newFiles: File[]) => void;
  removeFile: (key: string) => void;
}

const useMultiStepForm = <T extends Record<string, unknown>>({
  steps,
  initialStep = 1,
  storageKey = "multi-step-form-data",
}: {
  steps: number;
  initialStep?: number;
  storageKey?: string;
}): MultiStepFormHook<T> => {
  const [currentStep, setCurrentStep] = useQueryState(
    "step",
    parseAsInteger.withDefault(initialStep).withOptions({
      history: "push",
    }),
  );

  const [formData, setFormData] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem(storageKey);
      if (storedData) {
        try {
          return JSON.parse(storedData) as T;
        } catch (error) {
          console.error("Failed to parse stored form data:", error);
        }
      }
    }
    return {} as T;
  });

  const [files, setFiles] = useState<FilesMap>({});

  const [isLoaded, setIsLoaded] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    Promise.resolve().then(() => setIsLoaded(true));

    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData) as T;
        Promise.resolve().then(() => setFormData(parsed));
      } catch (error) {
        console.error("Failed to parse stored form data:", error);
      }
    }
  }, [storageKey]);

  const saveStepData = useCallback(
    (data: Partial<T>) => {
      setFormData((prev) => {
        const newData = { ...prev, ...data };
        try {
          const safe = sanitizeForStorage(newData);
          localStorage.setItem(storageKey, JSON.stringify(safe));
        } catch (err) {
          console.error("Failed to persist form data to localStorage:", err);
        }
        return newData;
      });
    },
    [storageKey],
  );

  const saveFiles = useCallback((key: string, newFiles: File[]) => {
    setFiles((prev) => {
      const existing = prev[key];
      if (existing === newFiles) return prev;
      if (
        Array.isArray(existing) &&
        Array.isArray(newFiles) &&
        existing.length === newFiles.length &&
        existing.every(
          (f, i) => f.name === newFiles[i].name && f.size === newFiles[i].size,
        )
      ) {
        return prev;
      }
      return {
        ...prev,
        [key]: newFiles,
      };
    });
  }, []);

  const removeFile = useCallback((key: string) => {
    setFiles((prev) => {
      if (!prev[key]) return prev;
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  }, []);

  const clearData = () => {
    setFormData({} as T);
    setFiles({});
    localStorage.removeItem(storageKey);
  };

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === steps;

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const previous = () => {
    setCurrentStep(currentStep - 1);
  };

  return {
    currentStep,
    isFirstStep,
    isLastStep,
    next,
    previous,
    formData,
    setFormData,
    saveStepData,
    clearData,
    isLoaded,
    files,
    saveFiles,
    removeFile,
  };
};

export default useMultiStepForm;

const multiStepContext = createContext<MultiStepFormHook<
  Record<string, unknown>
> | null>(null);

export const MultiStepProvider = <T extends Record<string, unknown>>({
  children,
  value,
}: {
  children: ReactNode;
  value: MultiStepFormHook<T>;
}) => {
  return (
    <multiStepContext.Provider
      value={value as unknown as MultiStepFormHook<Record<string, unknown>>}
    >
      {children}
    </multiStepContext.Provider>
  );
};

export const useMultiStepContext = <T extends Record<string, unknown>>() => {
  const context = useContext(multiStepContext);
  if (!context) {
    throw new Error(
      "useMultiStepContext must be used within a MultiStepProvider",
    );
  }
  return context as unknown as MultiStepFormHook<T>;
};
