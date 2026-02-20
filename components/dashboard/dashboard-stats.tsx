"use client";

import { Eye, Smartphone, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatItemProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
}

function StatItem({ icon: Icon, label, value, color }: StatItemProps) {
  return (
    <Card className="flex items-center gap-4 p-4 rounded-2xl border-none bg-white shadow-xs hover:shadow-md transition-shadow">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50`}
      >
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-400">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </Card>
  );
}

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatItem
        icon={Eye}
        label="Views"
        value="230.40"
        color="text-orange-500"
      />
      <StatItem
        icon={Smartphone}
        label="Bookings"
        value="340"
        color="text-orange-500"
      />
      <div className="lg:col-span-1 md:col-span-2">
        <Card className="flex items-center justify-between p-4 rounded-2xl border-none bg-white shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50">
              <Trophy className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Top Work</p>
              <p className="text-xl font-bold text-gray-900">120.560</p>
            </div>
          </div>
          <p className="text-lg font-medium text-gray-900 mr-4">
            The Conjuring
          </p>
        </Card>
      </div>
    </div>
  );
}
