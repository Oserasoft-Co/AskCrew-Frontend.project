import CustomSelect from "@/components/global/custom-select";
import { FileUploader } from "@/components/global/file-uplaod";
import FormGroup from "@/components/global/form-group";
import { Button } from "@/components/ui/button";
import { useMultiStepContext } from "@/hooks/use-multi-step-form";
import { toBase64 } from "@/lib/toBase64";
import {
  enterpriseStepFour,
  EnterpriseStepFourData,
} from "@/Schemas/auth/enterprise-register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

const PersonalInfoForm = () => {
  const { next, saveStepData, formData } =
    useMultiStepContext<EnterpriseStepFourData>();
  const [images, setImages] = useState<File[]>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<EnterpriseStepFourData>({
    resolver: zodResolver(enterpriseStepFour),
    mode: "all",
    defaultValues: {
      country: "",
      city: "",
      myWork: "",
      images: "",
    },
  });
  const handleImage = (file: File[]) => {
    setImages(file);
  };
  const onSubmit = async (data: EnterpriseStepFourData) => {
    let image;
    if (images&&images?.length>0) {
      console.log("hel");
      
      image = await toBase64(images[0]);
      data.images = image;
    }
    console.log("Form submitted:", data);
    saveStepData(data);
    next();
  };
 useEffect(() => {
    if (formData) {
      reset({
        country: formData.country || "",
        city: formData.city || "",
        myWork: formData.myWork || "",
        images: formData.images || "",
      });
    }
  }, [formData, reset]);

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full grid">
        {/* User Name */}
        <FormGroup
          label="Your Country"
          size={"xl"}
          placeholder="Enter your country name"
          type="text"
          {...register("country")}
          message={errors.country?.message as string}
        />
        <FormGroup
          label="Your city"
          size={"xl"}
          placeholder="Enter your city name"
          type="text"
          {...register("city")}
          message={errors.city?.message as string}
        />

        <FileUploader
          label="Upload your profile picture"
          maxFiles={1}
          onChange={handleImage}
        />

        <Controller
          name="myWork"
          control={control}
          render={({ field }) => (
            <CustomSelect
              label="My Work"
              className="w-full"
              value={field.value}
              onValueChange={field.onChange}
              options={[
                { value: "producer", label: "Producer" },
                { value: "actor", label: "Actor" },
                { value: "author", label: "Author" },
                { value: "photographer", label: "Photographer" },
                { value: "director", label: "Director" },
                { value: "writer", label: "Writer" },
              ]}
              message={errors.myWork?.message as string}
            />
          )}
        />
        {/* Register Button */}
        <Button type="submit" variant={"linear-1"} size={"xl"}>
          Next
        </Button>
      </form>
    </div>
  );
};
export default PersonalInfoForm;
