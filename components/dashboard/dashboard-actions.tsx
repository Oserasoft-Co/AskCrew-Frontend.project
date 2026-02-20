"use client";

import { Button } from "@/components/ui/button";

interface ActionItemProps {
  label: string;
  onClick?: () => void;
}

function ActionItem({ label, onClick }: ActionItemProps) {
  return (
    <Button
      onClick={onClick}
      className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6 h-auto text-base font-semibold shadow-md translate-y-0 hover:-translate-y-1 transition-all"
    >
      {label}
    </Button>
  );
}

export function DashboardActions() {
  const actions = [
    { label: "My Workshop" },
    { label: "My Job" },
    { label: "My Products" },
  ];

  return (
    <div className="flex flex-wrap gap-4 py-4">
      {actions.map((action) => (
        <ActionItem key={action.label} label={action.label} />
      ))}
    </div>
  );
}
