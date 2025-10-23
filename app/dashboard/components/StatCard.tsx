"use client";

import { Sparklines, SparklinesLine } from "react-sparklines";
import Select from "@/components/ui/Select";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  data?: number[];
  bgColor?: string;
  selectOptions?: string[];
}

export default function StatCard({
  label,
  value,
  change,
  data,
  bgColor,
  selectOptions,
}: StatCardProps) {
  return (
    <div
      className="relative rounded-2xl p-5 flex flex-col gap-3 overflow-hidden"
      style={{ backgroundColor: bgColor || "white" }}>
      <div className="flex justify-between items-center">
        <span
          className={`text-sm font-medium ${
            bgColor ? "text-white/90" : "text-gray-500"
          }`}>
          {label}
        </span>
        {selectOptions && <Select options={selectOptions} />}
      </div>

      <div className="space-y-0.5">
        <span
          className={`text-2xl font-bold leading-tight ${
            bgColor ? "text-white" : "text-gray-800"
          }`}>
          {value}
        </span>
        <div
          className={`flex flex-col ${
            bgColor ? "text-white/70" : "text-gray-500"
          }`}>
          <span className="text-sm font-medium">{change}</span>
          <span className="text-xs">Today</span>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 w-32 h-16 opacity-50">
        <Sparklines data={data} width={150} height={80}>
          <SparklinesLine
            color="#FE7F32"
            style={{
              fill: "#FE7F32",
              fillOpacity: 0.3,
              strokeWidth: 2,
              strokeLinejoin: "round",
              strokeLinecap: "round",
            }}
          />
        </Sparklines>
      </div>
    </div>
  );
}
