import { parseAsInteger, useQueryState } from "nuqs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
type FilesMap = Record<string, File[]>;

const useMultiStepForm = <T extends Record<string, any>>({
  steps,
  initialStep = 1,
  storageKey = "multi-step-form-data",
}: {
  steps: number;
  initialStep?: number;
  storageKey?: string;
}) => {
  const [currentStep, setCurrentStep] = useQueryState(
    "step",
    parseAsInteger.withDefault(initialStep).withOptions({
      history: "push",
    })
  );

  const [formData, setFormData] = useState<T>({} as T);
  const [files, setFiles] = useState<FilesMap>({});

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
      try {
        setFormData(JSON.parse(storedData));
      } catch (error) {
        console.error("Failed to parse stored form data:", error);
      }
    }
    setIsLoaded(true);
  }, [storageKey]);

  const sanitizeForStorage = (obj: any) => {
    if (obj == null || typeof obj !== "object") return obj;
    const copy: any = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
      const val = obj[key];
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
        } catch (e) {
          copy[key] = undefined;
        }
        continue;
      }
      copy[key] = val;
    }
    return copy;
  };

  const saveStepData = useCallback(
    (data: Partial<T>) => {
      setFormData((prev) => {
        const newData = { ...prev, ...data };
        try {
          const safe = sanitizeForStorage(newData as any);
          localStorage.setItem(storageKey, JSON.stringify(safe));
        } catch (err) {
          console.error("Failed to persist form data to localStorage:", err);
        }
        return newData;
      });
    },
    [storageKey]
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
          (f, i) => f.name === newFiles[i].name && f.size === newFiles[i].size
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
    saveStepData,
    clearData,
    isLoaded,
    files,
    saveFiles,
    removeFile,
  };
};
export default useMultiStepForm;

type MultiStepReturnType<T extends Record<string, any> = any> = ReturnType<
  typeof useMultiStepForm<T>
>;

const multiStepContext = createContext<MultiStepReturnType | null>(null);

export const MultiStepProvider = <T extends Record<string, any>>({
  children,
  value,
}: {
  children: ReactNode;
  value: MultiStepReturnType<T>;
}) => {
  return (
    <multiStepContext.Provider value={value}>
      {children}
    </multiStepContext.Provider>
  );
};

export const useMultiStepContext = <T extends Record<string, any>>() => {
  const context = useContext(multiStepContext);
  if (!context) {
    throw new Error(
      "useMultiStepContext must be used within a MultiStepProvider"
    );
  }
  return context as MultiStepReturnType<T>;
};
