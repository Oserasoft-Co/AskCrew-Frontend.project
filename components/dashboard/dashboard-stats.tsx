"use client";

import {
  Eye,
  Smartphone,
  Trophy,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

interface StatItemProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  accentFrom: string;
  accentTo: string;
  iconBg: string;
  trend?: string;
}

function StatItem({
  icon: Icon,
  label,
  value,
  accentFrom,
  accentTo,
  iconBg,
  trend,
}: StatItemProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl lg:rounded-3xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-500 cursor-default">
      {/* Gradient accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentFrom} ${accentTo} opacity-60 group-hover:opacity-100 transition-opacity`}
      />
      {/* Hover glow */}
      <div
        className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${accentFrom} ${accentTo} rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
      />

      <div className="relative p-5 lg:p-6 xl:p-8 flex items-center gap-4 lg:gap-5">
        <div
          className={`shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center ${iconBg} shadow-sm group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-current" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs lg:text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl xl:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              {value}
            </p>
            {trend && (
              <div className="flex items-center gap-0.5 text-green-500 text-xs font-bold">
                <ArrowUpRight className="size-3" />
                {trend}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 lg:gap-5">
      <StatItem
        icon={Eye}
        label="Views"
        value="230.40"
        accentFrom="from-orange-500"
        accentTo="to-amber-400"
        iconBg="bg-orange-50 dark:bg-orange-500/10 text-orange-500"
        trend="+12%"
      />
      <StatItem
        icon={Smartphone}
        label="Bookings"
        value="340"
        accentFrom="from-purple-500"
        accentTo="to-violet-400"
        iconBg="bg-purple-50 dark:bg-purple-500/10 text-purple-500"
        trend="+8%"
      />
      <StatItem
        icon={TrendingUp}
        label="Engagement"
        value="89%"
        accentFrom="from-emerald-500"
        accentTo="to-teal-400"
        iconBg="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500"
        trend="+5%"
      />

      {/* Top Work - spans full on sm, normal on xl */}
      <div className="sm:col-span-2 xl:col-span-1">
        <div className="group relative overflow-hidden rounded-2xl lg:rounded-3xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-500 cursor-default h-full">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-rose-400 opacity-60 group-hover:opacity-100 transition-opacity" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-pink-500 to-rose-400 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

          <div className="relative p-5 lg:p-6 xl:p-8 flex items-center gap-4 lg:gap-5">
            <div className="shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center bg-pink-50 dark:bg-pink-500/10 text-pink-500 shadow-sm group-hover:scale-110 transition-transform duration-300">
              <Trophy className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs lg:text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                Top Work
              </p>
              <p className="text-2xl lg:text-3xl xl:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                120.56K
              </p>
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-sm lg:text-base font-bold text-gray-900 dark:text-white">
                The Conjuring
              </p>
              <p className="text-xs text-gray-400 font-medium">Top views</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
