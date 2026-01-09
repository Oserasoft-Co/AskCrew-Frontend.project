import { CheckboxGroup, Option } from "@/components/global/checkbox-group";
import FormText from "@/components/global/form-text";
import { Button } from "@/components/ui/button";
import { useMultiStepContext } from "@/hooks/use-multi-step-form";
import { useEffect, useState } from "react";

const experienceYearsOptions: Option[] = [
  {
    label: "Beginner ( less than 1 year )",
    value: "Beginner",
  },
  {
    label: "Intermediate ( 1 - 3 years )",
    value: "intermediate",
  },
  {
    label: "Advanced ( 3 - 7 years )",
    value: "advanced",
  },
  {
    label: "Expert ( +7 years )",
    value: "expert",
  },
];

const DefineExperienceForm = () => {
  const [formData, setFormData] = useState({
    experience: [] as string[],
    personalInfo: "",
  });
  const [error, setError] = useState("");

  const { next, saveStepData , formData: contextFormData } = useMultiStepContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate experience
    if (formData.experience.length === 0) {
      setError("Please select at least one experience level");
      return;
    }

    setError("");
    saveStepData(formData);
    console.log("Form submitted:", formData);
    next();
  };

  // Remove the problematic useEffect and instead pre-fill form data from context (if available)
  // Assuming useMultiStepContext provides initial data, e.g. stepData

  useEffect(() => {
    if (contextFormData?.experience || contextFormData?.personalInfo) {
      setFormData({
        experience: contextFormData.experience || [],
        personalInfo: contextFormData.personalInfo || "",
      });
    }
  }, [contextFormData]);

  return (
    <div className="bg-white p-4 md:p-10 flex-1 space-y-5">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Define Your Experience
        </h1>
        <p className="text-gray-500 text-sm">
          Select how many years you&apos;ve been working in the industry.
        </p>
      </div>

      <CheckboxGroup
        options={experienceYearsOptions}
        value={formData.experience}
        onValueChange={(value) => {
          setFormData((prev) => ({
            ...prev,
            experience: value,
          }));
          if (value.length > 0) {
            setError("");
          }
        }}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <FormText
        label="Personal Info ( optional )"
        placeholder="some info about you...."
        value={formData.personalInfo}
        onChange={(value) => {
          setFormData((prev) => ({
            ...prev,
            personalInfo: value.target.value,
          }));
        }}
      />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 w-full grid">
        {/* Register Button */}
        <Button type="submit" variant={"linear-1"} size={"xl"}>
          Next
        </Button>
      </form>
    </div>
  );
};
export default DefineExperienceForm;
