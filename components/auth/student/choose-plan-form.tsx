"use client";

import { PricingCard, PricingPlan } from "@/components/pricing/pricing-card";
import { fetchPlans } from "@/components/pricing/pricing-data";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMultiStepContext } from "@/hooks/use-multi-step-form";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

interface StudentFormData extends Record<string, unknown> {
  fullname?: string;
  email?: string;
  mobile_phone?: string;
  password?: string;
  city?: string;
  country?: string;
  institute?: string;
  academic_year?: string;
  personal_info?: string;
  facebook_link?: string;
  instagram_link?: string;
  linkedin_link?: string;
  youtube_link?: string;
  skills?: string;
  experience?: string[];
  specification?: string[];
}

const ChoosePlanForm = () => {
  const { formData, clearData, files } = useMultiStepContext<StudentFormData>();
  const [planId, setPlanId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (selectedPlanId?: number) => {
    try {
      setIsSubmitting(true);
      const formDataToSend = new FormData();

      // Append all text fields
      const fields: (keyof StudentFormData)[] = [
        "fullname",
        "email",
        "mobile_phone",
        "password",
        "city",
        "country",
        "institute",
        "academic_year",
        "personal_info",
        "facebook_link",
        "instagram_link",
        "linkedin_link",
        "youtube_link",
        "skills",
      ];

      fields.forEach((field) => {
        const value = formData[field];
        if (value !== undefined && value !== null) {
          formDataToSend.append(field as string, String(value));
        }
      });

      // Default skills if none provided (as per original code)
      if (!formData.skills) {
        formDataToSend.append("skills", "Theatrical Acting");
      }

      // Append arrays
      formData.experience?.forEach((exp) =>
        formDataToSend.append("experience", exp),
      );
      formData.specification?.forEach((spec) =>
        formDataToSend.append("specification", spec),
      );

      // Use the selected plan ID or find free plan as fallback
      let finalPlanId = selectedPlanId || planId;

      if (!finalPlanId) {
        const freePlanId = data?.find(
          (plan: PricingPlan) =>
            plan.tier?.toLowerCase() === "free" ||
            plan.name?.toLowerCase().includes("free") ||
            parseFloat(plan.price as string) === 0,
        )?.id;
        finalPlanId = freePlanId || null;
      }

      if (finalPlanId) {
        formDataToSend.append("plan_id", finalPlanId.toString());
      }

      // Handle file uploads from context
      if (files["profile_photo"]) {
        const profilePhotos = Array.isArray(files["profile_photo"])
          ? files["profile_photo"]
          : [files["profile_photo"]];
        profilePhotos.forEach((file) => {
          formDataToSend.append("profile_photo", file);
        });
      }

      if (files["cv"]) {
        const cvFiles = Array.isArray(files["cv"])
          ? files["cv"]
          : [files["cv"]];
        cvFiles.forEach((file) => {
          formDataToSend.append("cv", file);
        });
      }

      const response = await axiosInstance.post(
        "auth/student/signup",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 201) {
        if (response.data?.payment?.transaction?.url) {
          clearData();
          window.location.replace(response.data.payment.transaction.url);
          return;
        }

        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data?.message || "Signup successful!",
        }).then(() => {
          clearData();
          setIsSubmitting(false);
          router.push("/viewer/login");
        });
      } else {
        const errorMsg =
          response.data?.message ||
          (response.data?.errors
            ? Object.values(response.data.errors).join("\n")
            : "Something went wrong.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMsg,
        });
      }
    } catch (e: unknown) {
      const error = e as AxiosError<{
        message?: string;
        errors?: Record<string, string[] | string>;
      }>;
      console.error("Error:", error);
      setIsSubmitting(false);

      let errorMsg = "";
      const responseData = error.response?.data;

      if (responseData) {
        if (typeof responseData === "object" && responseData !== null) {
          if (responseData.message) {
            errorMsg = responseData.message;
          } else if (responseData.errors) {
            errorMsg = Object.values(responseData.errors)
              .map((err) => (Array.isArray(err) ? err.join("\n") : err))
              .join("\n");
          } else {
            errorMsg = Object.values(responseData)
              .map((val) => (Array.isArray(val) ? val.join("\n") : String(val)))
              .join("\n");
          }
        } else if (typeof responseData === "string") {
          errorMsg = responseData;
        } else {
          errorMsg = "An error occurred. Please check your input.";
        }
      } else {
        errorMsg = "Network error. Please try again later.";
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMsg || "An unexpected error occurred.",
      });
    }
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["StudentPlans"],
    queryFn: async () => {
      const plans = await fetchPlans();
      return plans.studentPlans;
    },
  });
  const handlePlanSelect = (selectedPlanId: number) => {
    const selectedPlan = data?.find(
      (plan: PricingPlan) => plan.id === selectedPlanId,
    );
    const isFree =
      selectedPlan &&
      (selectedPlan.tier?.toLowerCase() === "free" ||
        selectedPlan.name?.toLowerCase().includes("free") ||
        parseFloat(selectedPlan.price as string) === 0);

    setPlanId(selectedPlanId);

    if (isFree) {
      // For free plan, just highlight it
      return;
    }

    // For paid plans, submit immediately
    onSubmit(selectedPlanId);
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 flex items-center justify-center gap-2 md:w-[500px] md:h-[550px]">
        <svg
          className="animate-spin h-5 w-5 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        Loading plans...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">Failed to load plans.</div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Choose your plan</h2>
        <p className="text-muted-foreground">
          Select the plan that best fits your needs
        </p>
      </div>
      <ScrollArea className="md:h-[550px]  md:w-[600px] md:px-4 py-4">
        <div className="grid grid-cols-1 gap-6 md:p-8">
          {data &&
            data.map((plan: PricingPlan) => (
              <div
                key={plan.name}
                className={`cursor-pointer transition-all duration-200 rounded-2xl ${
                  planId === plan.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <PricingCard plan={plan} onSelect={handlePlanSelect} />
              </div>
            ))}
        </div>
      </ScrollArea>

      <div className="flex gap-4 justify-end pt-4">
        <Button
          variant="ghost"
          onClick={() => onSubmit()}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-4 w-4 mr-2 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Loading...
            </>
          ) : (
            "Skip for now"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChoosePlanForm;
