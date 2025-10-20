"use client";

import { Sparklines, SparklinesLine, SparklinesCurve } from "react-sparklines";
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
  data = [5, 10, 5, 20, 8, 15, 10],
  bgColor,
  selectOptions,
}: StatCardProps) {
  return (
    <div
      className="relative rounded-xl shadow-sm p-5 flex flex-col gap-2 overflow-hidden"
      style={{ backgroundColor: bgColor || "white" }}>
      <div className="flex justify-between items-center">
        <span
          className={`text-sm font-medium ${
            bgColor ? "text-white" : "text-gray-500"
          }`}>
          {label}
        </span>
        {selectOptions && <Select options={selectOptions} />}
      </div>

      <span
        className={`text-2xl font-semibold ${
          bgColor ? "text-white" : "text-secondary"
        }`}>
        {value}
      </span>
      <span
        className={`${bgColor ? "text-green-200" : "text-green-500"} text-sm`}>
        {change}
      </span>

      <div className="absolute bottom-2 right-2 w-28 h-12 opacity-40">
        <Sparklines data={data} width={100} height={50}>
          <SparklinesLine
            color={bgColor ? "#FFC966" : "#4ade80"}
            style={{ strokeWidth: 2 }}
          />
          <SparklinesCurve
            style={{ fill: bgColor ? "#FFC966" : "#4ade80", strokeWidth: 0 }}
          />
        </Sparklines>
      </div>
    </div>
  );
}
