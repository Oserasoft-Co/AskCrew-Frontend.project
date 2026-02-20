"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface DashboardHorizontalSectionProps {
  title: string;
  seeMoreHref?: string;
  children: React.ReactNode;
}

export function DashboardHorizontalSection({
  title,
  seeMoreHref = "#",
  children,
}: DashboardHorizontalSectionProps) {
  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <Link
          href={seeMoreHref}
          className="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center gap-1 group"
        >
          See More
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        {children}
      </div>
    </div>
  );
}
