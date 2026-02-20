"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface TalentDashboardCardProps {
  name: string;
  role: string;
  image: string;
}

export function TalentDashboardCard({
  name,
  role,
  image,
}: TalentDashboardCardProps) {
  return (
    <Card className="min-w-[140px] p-6 flex flex-col items-center text-center gap-3 border-none bg-white rounded-3xl shadow-xs hover:shadow-md transition-all cursor-pointer group">
      <Avatar className="size-20 ring-4 ring-gray-50 shadow-sm group-hover:scale-110 transition-transform">
        <AvatarImage src={image} alt={name} className="object-cover" />
        <AvatarFallback className="bg-orange-50 text-orange-500 font-bold">
          {name[0]}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-0.5">
        <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{name}</h4>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          {role}
        </p>
      </div>
    </Card>
  );
}
