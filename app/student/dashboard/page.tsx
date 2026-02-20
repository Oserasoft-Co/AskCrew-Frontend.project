"use client";

import { getCurrentUserProfile } from "@/lib/actions/auth";
import { useQuery } from "@tanstack/react-query";
import { DashboardHome } from "@/components/dashboard/dashboard-home";

export default function Page() {
  const { data: userProfileResponse } = useQuery({
    queryKey: ["current-user-profile"],
    queryFn: getCurrentUserProfile,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const userData = userProfileResponse?.success
    ? userProfileResponse?.data
    : null;

  const user = {
    name: userData?.fullname || "User",
    image: userData?.profile_photo || "",
    role: userData?.profile?.specification || "Student",
    rating: userData?.rating_mean || 0,
    reviewCount: userData?.rating_count || 0,
    isAvailable: userData?.is_active || false,
    isVerified: userData?.is_verified || false,
  };

  return (
    <div className="flex flex-1 flex-col px-4 pb-12 pt-6 sm:px-6 lg:px-10 bg-gray-50/50">
      <DashboardHome user={user} />
    </div>
  );
}
