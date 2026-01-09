"use client";
import CheckboxWithLabelGroup from "@/components/global/checkbox-with-label-group";
import FormGroup from "@/components/global/form-group";
import PasswordInput from "@/components/global/password-input";
import PhoneInputComponent from "@/components/global/phone-input";
import { Button } from "@/components/ui/button";
import { useMultiStepContext } from "@/hooks/use-multi-step-form";
import {
  enterpriseStepOne,
  EnterpriseStepOneData,
} from "@/Schemas/auth/enterprise-register";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const CreateAccountForm = () => {
  const { next, saveStepData, formData } =
    useMultiStepContext<EnterpriseStepOneData>();

  // Get pre-filled data from viewer signup
  const getPrefilledData = () => {
    if (typeof window === "undefined") return null;
    const storedData = sessionStorage.getItem("prefilledRegistrationData");
    if (storedData) {
      try {
        return JSON.parse(storedData);
      } catch (error) {
        console.error("Failed to parse prefilled data:", error);
        return null;
      }
    }
    return null;
  };

  const prefilledData = getPrefilledData();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<EnterpriseStepOneData>({
    resolver: zodResolver(enterpriseStepOne),
    mode: "onSubmit",
    defaultValues: {
      fullname: formData?.fullname || prefilledData?.fullname || "",
      email: formData?.email || prefilledData?.email || "",
      mobile_phone: formData?.mobile_phone || prefilledData?.mobile_phone || "",
      password: formData?.password || prefilledData?.password || "",
      termsAccepted: formData?.termsAccepted || false,
    },
  });

  const phoneValue = watch("mobile_phone");
  const termsAccepted = watch("termsAccepted");

  const onSubmit = (data: EnterpriseStepOneData) => {
    try {
      console.log("Form submitted:", data);

      // Save form data to multi-step context
      saveStepData(data);

      // Move to next step
      next();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };
  useEffect(() => {
    if (formData) {
      reset({
        fullname: formData.fullname || "",
        email: formData.email || "",
        mobile_phone: formData.mobile_phone || "",
        password: formData.password || "",
        termsAccepted: formData.termsAccepted || false,
      });
    }
  }, [formData, reset]);

  return (
    <div className="bg-white p-4 md:p-10 flex-1">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Your Account
        </h1>
        <p className="text-gray-500 text-sm">
          Join us in just a few steps and start streaming right away.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full grid">
        {/* User Name */}
        <FormGroup
          label="Full Name"
          type="text"
          {...register("fullname")}
          variant={"rounded"}
          size={"xl"}
          message={errors.fullname?.message}
        />

        {/* Email Address */}
        <div>
          <FormGroup
            label="Email Address"
            type="email"
            placeholder="enter your email"
            {...register("email")}
            variant={"rounded"}
            size={"xl"}
            message={errors.email?.message}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Mobile Number
          </label>
          <PhoneInputComponent
            value={phoneValue}
            placeholder="Enter your phone number"
            onChange={(phone) => setValue("mobile_phone", phone || "")}
            errorMsg={errors.mobile_phone?.message}
          />
        </div>

        {/* Password  */}
        <div>
          <PasswordInput
            label="Password"
            variant={"rounded"}
            size={"xl"}
            {...register("password")}
            message={errors.password?.message}
          />
        </div>

        {/* Terms Checkbox  */}
        <div>
          <CheckboxWithLabelGroup
            variant={"orange"}
            checked={termsAccepted}
            onCheckedChange={(checked: boolean) =>
              setValue("termsAccepted", checked)
            }
            className="md:text-sm text-xs"
            label={
              <>
                I accept the
                <a
                  href="#"
                  className="text-gray-900 underline hover:text-orange-500"
                >
                  terms
                </a>
                and
                <a
                  href="#"
                  className="text-gray-900 underline hover:text-orange-500"
                >
                  privacy policy
                </a>
              </>
            }
          />
          {errors.termsAccepted && (
            <p className="text-red-500 text-sm mt-1">
              {errors.termsAccepted.message}
            </p>
          )}
        </div>

        {/* Register Button */}
        <Button
          type="submit"
          variant={"linear-1"}
          size={"xl"}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Next"}
        </Button>
      </form>
    </div>
  );
};
export default CreateAccountForm;
