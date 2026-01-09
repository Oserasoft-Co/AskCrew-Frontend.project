"use client";

import { Button } from "@/components/ui/button";
import { useMultiStepContext } from "@/hooks/use-multi-step-form";
import { useEffect, useState } from "react";
import { CheckboxGroup, type Option } from "@/components/global/checkbox-group";

const specsOptions: Option[] = [
  {
    label: "Director",
    value: "director",
  },
  {
    label: "Producer",
    value: "producer",
  },
  {
    label: "Copywriter",
    value: "Copywriter",
  },
  {
    label: "Photography",
    value: "Photography",
  },
  {
    label: "Assistant Director",
    value: "Assistant Director",
  },
  {
    label: "Art Director",
    value: "art-director",
  },
  {
    label: "Camera Operator",
    value: "camera-operator",
  },
  {
    label: "Video Editor",
    value: "video-editor",
  },
  {
    label: "Film Distributor",
    value: "film-distributor",
  },
  {
    label: "VFX Artist",
    value: "vfx-artist",
  },
  {
    label: "Mentor",
    value: "mentor",
  },
  {
    label: "Stylist",
    value: "stylist",
  },
  {
    label: "Makeup Artist",
    value: "makeup-artist",
  },
  {
    label: "Casting Director",
    value: "casting-director",
  },
  {
    label: "Sound Engineer",
    value: "sound-engineer",
  },
  {
    label: "Studio Owner",
    value: "studio-owner",
  },
];

const ChooseSpecificationForm = () => {
  const [specs, setSpecs] = useState<{ specification: string[] }>(() => ({
    specification: [],
  }));
  const [error, setError] = useState<string>("");
  
  const { next, saveStepData, formData } = useMultiStepContext();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that at least one spec is selected
    if (specs.specification.length === 0) {
      setError("Please select at least one specification");
      return;
    }

    setError("");
    console.log("Form submitted:", specs);
    saveStepData(specs);
    next();
  };

  useEffect(() => {
    // Pre-fill form if data exists
    if (formData.specification) {
      setSpecs({
        specification: formData.specification,
      });
    }
  }, [formData]);

  return (
    <div className="bg-white p-4 md:p-10 flex-1">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Choose Your Specification
        </h1>
        <p className="text-gray-500 text-sm">
          Tell us your area of expertise to personalize your experience.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 w-full grid">
        <CheckboxGroup
          options={specsOptions}
          value={specs.specification}
          listClassName="grid md:grid-cols-2 gap-4"
          onValueChange={(value) => {
            setSpecs((prev) => ({
              ...prev,
              specification: value,
            }));
            // Clear error when user selects an option
            if (value.length > 0) {
              setError("");
            }
          }}
        />

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Register Button */}
        <Button type="submit" variant={"linear-1"} size={"xl"}>
          Next
        </Button>
      </form>
    </div>
  );
};
export default ChooseSpecificationForm;
