import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  period: string;
  tier: string;
  description: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
  badge?: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  onSelect?: (planId: number) => void;
}

export function PricingCard({ plan, onSelect }: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
        plan.highlighted
          ? "bg-linear-to-br from-purple-50 to-orange-50 border-2 border-purple-500/20 shadow-xl"
          : "bg-background border border-border shadow-lg hover:shadow-xl"
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-block px-4 py-1.5 rounded-full bg-linear-to-r from-purple-600 to-orange-600 text-white text-xs font-bold shadow-lg">
            {plan.badge}
          </span>
        </div>
      )}

      {/* Plan Name */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">
            ${plan.price}
          </span>
          <span className="text-muted-foreground">/{plan.period}</span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 text-purple-600" />
            </div>
            <span className="text-sm text-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <Button
        onClick={() => onSelect?.(plan.id)}
        className={`w-full py-6 rounded-xl font-semibold transition-all ${
          plan.highlighted
            ? "bg-linear-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl"
            : "bg-muted hover:bg-muted/80 text-foreground"
        }`}
      >
        {plan.buttonText}
      </Button>
    </div>
  );
}
