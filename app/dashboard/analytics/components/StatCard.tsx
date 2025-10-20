"use client";

import Select from "@/components/ui/Select";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { FiTrendingUp } from "react-icons/fi";

interface Props {
  label: string;
  value: string;
  change: string;
  color: string;
  data: number[];
}

export default function StatCard({ label, value, change, color, data }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3 border border-gray-100">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <Select options={["All time"]} />
      </div>
      <p className="text-lg font-semibold">{value}</p>
      <div className="flex items-center text-green-500 text-sm font-medium gap-1">
        <FiTrendingUp /> {change}
      </div>
      <Sparklines data={data}>
        <SparklinesLine color={color} />
      </Sparklines>
    </div>
  );
}
