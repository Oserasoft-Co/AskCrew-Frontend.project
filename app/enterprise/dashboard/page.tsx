"use client";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "./data.json";
import { getCurrentUserProfile } from "@/lib/actions/auth";
import { useQuery } from "@tanstack/react-query";
import { AboutSection, InfoCards, PortfolioGrid, ProfileHeader } from "@/components/enterprise/profile";

export default function Page() {
    const { data: userProfileResponse } = useQuery({
    queryKey: ["current-user-profile"],
    queryFn: getCurrentUserProfile,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const userData = userProfileResponse?.success
    ? userProfileResponse?.data
    : null;
 const name = userData?.fullname||"";
  const image = userData?.profile_photo || "";
  const rating = userData?.rating_mean||0;
  const reviewCount = userData?.rating_count||"";
  const role = userData?.profile?.specification||"";
  const isAvailable = userData?.is_active||"";
  const isVerified = userData?.is_verified||"";
  const about = userData?.personal_info || "No information available";
  const location = `${userData?.profile?.city||"..."}, ${userData?.profile?.country||"..."}`;
  const roleType = userData?.profile?.experience;
  const portfolio = userData?.profile?.images?.map((img:any, index:any) => ({
    id: String(index + 1),
    title: `Work ${index + 1}`,
    image: img?.image,
    role: role,
  }));


  return (
    <div className="flex flex-1 flex-col px-4 pb-12 pt-6 sm:px-6 lg:px-10">
      {/* <div className="@container/main flex flex-1 flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(249,115,22,0.14),rgba(147,51,234,0.18))] p-4 shadow-[0_30px_110px_-60px_rgba(147,51,234,0.55)] backdrop-blur-xl sm:p-6">
            <SectionCards />
          </div>
          <ChartAreaInteractive />
          <DataTable data={data} />
        </div>
      </div> */}
         <div className="">
              <div className="space-y-6">
                {/* Profile Header */}
                <ProfileHeader
                  name={name}
                  image={image}
                  rating={rating}
                  reviewCount={reviewCount}
                  role={role}
                  isAvailable={isAvailable}
                  isVerified={isVerified}
                />
      
                {/* About Section */}
                <AboutSection about={about} />
      
                {/* Location and Role Type */}
                <InfoCards location={location} roleType={roleType} />
      
                {/* Portfolio Section */}
                <PortfolioGrid portfolio={portfolio||[]} />
      
                {/* Chat Button */}
              </div>
            </div>
    </div>
  );
}
