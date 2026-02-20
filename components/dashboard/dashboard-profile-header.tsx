"use client";

import { Star, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface DashboardProfileHeaderProps {
  name: string;
  image: string;
  role: string;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  isVerified: boolean;
}

export function DashboardProfileHeader({
  name,
  image,
  role,
  rating,
  reviewCount,
  isAvailable,
  isVerified,
}: DashboardProfileHeaderProps) {
  return (
    <Card className="p-4 rounded-3xl border-none bg-white shadow-xs">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="size-20 rounded-2xl ring-2 ring-gray-100 shadow-sm">
            <AvatarImage src={image} alt={name} className="object-cover" />
            <AvatarFallback className="bg-orange-100 text-orange-600 font-bold text-xl rounded-2xl">
              {name[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {isAvailable && (
            <div className="absolute -bottom-1 -left-1 flex items-center gap-1 bg-white px-2 py-0.5 rounded-full shadow-sm border border-gray-100">
              <div className="size-2 bg-green-500 rounded-full" />
              <span className="text-[10px] font-bold text-gray-500">
                Available
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-gray-900 tracking-tight">
                {name}
              </h2>
              {isVerified && (
                <CheckCircle2 className="size-5 fill-blue-500 text-blue-500" />
              )}
            </div>
          </div>
          <p className="text-sm font-medium text-gray-400">{role}</p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`size-3.5 ${
                    star <= Math.floor(rating)
                      ? "fill-orange-400 text-orange-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-black text-orange-500">
              {rating.toFixed(1)}
            </span>
            <span className="text-sm font-medium text-gray-400">
              ({reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
