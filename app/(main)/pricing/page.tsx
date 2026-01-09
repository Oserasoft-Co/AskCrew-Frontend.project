"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SwapAccountPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<
    "enterprise" | "student" | null
  >(null);

  // Read viewer data directly in state initializer to avoid cascading renders
  const [viewerData] = useState<{
    fullname?: string;
    email?: string;
    mobile_phone?: string;
    password?: string;
  } | null>(() => {
    if (typeof window === "undefined") return null;
    const storedData = sessionStorage.getItem("viewerSignupData");
    if (storedData) {
      try {
        return JSON.parse(storedData);
      } catch (error) {
        console.error("Failed to parse viewer data:", error);
        return null;
      }
    }
    return null;
  });

  const handleAccountTypeSelection = (type: "enterprise" | "student") => {
    setSelectedType(type);

    // Store the viewer data and account type for the registration page
    if (viewerData) {
      sessionStorage.setItem(
        "prefilledRegistrationData",
        JSON.stringify({
          ...viewerData,
          accountType: type,
        })
      );
    } else {
      sessionStorage.setItem(
        "prefilledRegistrationData",
        JSON.stringify({
          accountType: type,
        })
      );
    }

    // Redirect to the appropriate registration page
    if (type === "enterprise") {
      router.push("/enterprise/register");
    } else {
      router.push("/student/register");
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-purple-500/10 via-transparent to-orange-500/10 border-b border-border/50">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-linear-to-r from-purple-600 via-orange-500 to-pink-600 bg-clip-text text-transparent">
              Choose Your Account Type
            </span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Select the account type that best fits your needs. Whether
            you&apos;re a business or a student, we have the perfect solution
            for you.
          </p>
        </div>
      </div>

      {/* Account Type Cards */}
      <div className="px-6 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Enterprise Card */}
          <div
            onClick={() => handleAccountTypeSelection("enterprise")}
            className={`group relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:scale-105 ${
              selectedType === "enterprise"
                ? "border-orange-500 shadow-2xl scale-105"
                : "border-gray-200 hover:border-orange-300"
            }`}
          >
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Building2 className="w-8 h-8 text-white" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Enterprise Account
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              Perfect for businesses and organizations looking to hire talent,
              post jobs, and manage workshops.
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Post job opportunities
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Find talented students
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Host workshops and events
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Upload and manage content
              </li>
            </ul>

            {/* Button */}
            <Button
              variant="linear-1"
              size="lg"
              className="w-full group-hover:shadow-lg transition-shadow"
            >
              Choose Enterprise
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Student Card */}
          <div
            onClick={() => handleAccountTypeSelection("student")}
            className={`group relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:scale-105 ${
              selectedType === "student"
                ? "border-purple-500 shadow-2xl scale-105"
                : "border-gray-200 hover:border-purple-300"
            }`}
          >
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Student Account
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              Ideal for students seeking opportunities, building portfolios, and
              connecting with enterprises.
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Apply for jobs and internships
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Showcase your portfolio
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Join workshops and events
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Connect with enterprises
              </li>
            </ul>

            {/* Button */}
            <Button
              variant="linear-1"
              size="lg"
              className="w-full group-hover:shadow-lg transition-shadow"
            >
              Choose Student
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-sm text-muted-foreground">
          You can switch between account types later in your settings.
        </p>
      </div>
    </div>
  );
}
