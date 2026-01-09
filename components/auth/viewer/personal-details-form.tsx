"use client";

import FormGroup from "@/components/global/form-group";
import ImageInput from "@/components/global/image-input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProfileSchema,
  type UpdateProfileFormData,
  type UpdateProfileResponse,
} from "@/Schemas/auth/update-profile";
import { getCurrentUserProfile } from "@/lib/actions/auth";
import axiosInstance from "@/lib/axiosInstance";
import Swal from "sweetalert2";
import PhoneInputComponent from "@/components/global/phone-input";
import FormText from "@/components/global/form-text";

const PersonalDetailsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("/icons/user-2.svg");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullname: "",
      email: "",
      mobile_phone: "",
      personal_info: "",
    },
  });

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getCurrentUserProfile();

        if (response.success && response.data) {
          const user = response.data;

          // Set form values
          setValue("fullname", user.fullname || "");
          setValue("email", user.email || "");
          setValue("mobile_phone", user.mobile_phone || "");
          setValue("personal_info", user.personal_info || "");

          // Set profile image preview
          if (user.profile_photo) {
            setPreviewUrl(user.profile_photo);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfile();
  }, [setValue]);

  const handleImageChange = (file: File | null) => {
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: UpdateProfileFormData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      // Only send allowed fields: fullname, profile_photo, personal_info
      formData.append("fullname", data.fullname);

      if (selectedImage) {
        formData.append("profile_photo", selectedImage);
      }

      if (data.personal_info) {
        formData.append("personal_info", data.personal_info);
      }

      const response = await axiosInstance.patch<UpdateProfileResponse>(
        "/auth/profiles/update-profile/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message || "Profile updated successfully!",
        confirmButtonText: "OK",
      }).then(() => {
        // Optionally, you can refresh the page or redirect
       window.location.reload();
      });
    } catch (error: unknown) {
      console.error("Update profile error:", error);

      let errorMessage = "Failed to update profile. Please try again.";

      if (error && typeof error === "object") {
        const err = error as {
          response?: {
            data?: {
              message?: string;
              detail?: string;
              error?: string;
              [key: string]: unknown;
            };
            status?: number;
          };
          message?: string;
        };

        if (err.response?.data) {
          const data = err.response.data;

          if (data.message) {
            errorMessage = data.message;
          } else if (data.detail) {
            errorMessage = data.detail;
          } else if (data.error) {
            errorMessage = data.error;
          } else if (typeof data === "string") {
            errorMessage = data;
          }
        } else if (err.message) {
          errorMessage = err.message;
        }
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="md:shadow-sm rounded-lg sm:w-[500px] px-4 mx-auto my-5 sm:p-4 bg-white! z-50 isolate p-0 space-y-5">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:shadow-sm rounded-lg sm:w-[500px] px-4 mx-auto my-5 sm:p-4 bg-white! z-50 isolate p-0 space-y-5"
    >
      <h2 className="text-neutral-500 text-xl">Personal Details</h2>
      <ImageInput
        primaryImage={previewUrl}
        className="mx-auto"
        onImageChange={handleImageChange}
      />
      <div className="space-y-4">
        <div>
          <FormGroup
            label="Full Name"
            type="text"
            variant={"rounded"}
            size={"xl"}
            {...register("fullname")}
            message={errors.fullname?.message}
          />
        </div>

        <div>
          <FormGroup
            label="Email Address"
            type="email"
            variant={"rounded"}
            size={"xl"}
            {...register("email")}
            message={errors.email?.message}
            disabled
          />
        </div>

        <div>
          <PhoneInputComponent
            value={watch("mobile_phone")}
            onChange={(phone) => setValue("mobile_phone", phone || "")}
            placeholder="Enter your phone number"
            errorMsg={errors.mobile_phone?.message}
            disabled
          />
        </div>
        <div>
             <FormText
                label="Personal Info ( optional )"
                placeholder="some info about you...."
                {...register("personal_info")}
                message={errors.personal_info?.message}
              />
        </div>

        <Button
          variant={"linear-1"}
          type="submit"
          size={"lg"}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
export default PersonalDetailsForm;
