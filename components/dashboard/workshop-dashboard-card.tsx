"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";

interface WorkshopDashboardCardProps {
  title: string;
  date: string;
  provider: string;
  image: string;
}

export function WorkshopDashboardCard({
  title,
  date,
  provider,
  image,
}: WorkshopDashboardCardProps) {
  return (
    <Card className="min-w-[280px] group cursor-pointer overflow-hidden border-none bg-white rounded-3xl shadow-xs hover:shadow-lg transition-all">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
            {title}
          </h3>
          <span className="text-[10px] font-bold text-gray-400">{date}</span>
        </div>
        <p className="text-xs font-semibold text-gray-400">
          BY/ <span className="text-gray-600">{provider}</span>
        </p>
      </div>
    </Card>
  );
}
