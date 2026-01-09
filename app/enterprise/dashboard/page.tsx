import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "./data.json";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col px-4 pb-12 pt-6 sm:px-6 lg:px-10">
      <div className="@container/main flex flex-1 flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(249,115,22,0.14),rgba(147,51,234,0.18))] p-4 shadow-[0_30px_110px_-60px_rgba(147,51,234,0.55)] backdrop-blur-xl sm:p-6">
            <SectionCards />
          </div>
          <ChartAreaInteractive />
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
