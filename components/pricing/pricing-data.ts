import axiosInstance from "@/lib/axiosInstance";
import { PricingPlan } from "./pricing-card";

// API Response Types
interface ApiFeature {
  id: number;
  name: string;
  description: string | null;
}

export interface ApiPlan {
  id: number;
  plan_type: "enterprise" | "student";
  tier: string;
  name: string;
  price: string;
  currency: string;
  booking_limit: number | null;
  is_active: boolean;
  features: ApiFeature[];
  created_at: string;
  updated_at: string;
}

interface ApiPlansResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiPlan[];
}

// Transform API data to PricingPlan format
export function transformApiPlans(apiResponse: ApiPlansResponse): {
  enterprisePlans: PricingPlan[];
  studentPlans: PricingPlan[];
} {
  const enterprisePlans: PricingPlan[] = [];
  const studentPlans: PricingPlan[] = [];

  apiResponse.results.forEach((plan) => {
    const pricingPlan: PricingPlan = {
      id: plan.id,
      name: plan.name,
      price: parseFloat(plan.price),
      period: "month",
      description: `${plan.tier} tier plan`,
      features: plan.features.map((f) => f.name),
      buttonText: parseFloat(plan.price) === 0 ? "Book a Call" : "Get started",
      highlighted: plan.tier === "pro" || plan.tier === "diamond",
      badge: plan.tier === "pro" ? "Most Popular" : undefined,
    };

    if (plan.plan_type === "enterprise") {
      enterprisePlans.push(pricingPlan);
    } else if (plan.plan_type === "student") {
      studentPlans.push(pricingPlan);
    }
  });

  return { enterprisePlans, studentPlans };
}

// Fetch and transform plans
export async function fetchPlans() {
  const response = await axiosInstance.get("/auth/plans");
  const data: ApiPlansResponse = response.data;
  return transformApiPlans(data);
}
