"use client";

import Image from "next/image";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { FiTrendingUp } from "react-icons/fi";
import FormField from "@/components/ui/FormField";

interface Props {
  label: string;
  value: string;
  change: string;
  color: string;
  data: number[];
  subChange: string;
  icon: string;
  hasData?: boolean;
}

export default function StatCard({
  label,
  value,
  change,
  color,
  data,
  subChange,
  icon,
  hasData = true,
}: Props) {
  const showChart = hasData && data.length > 0;

  return (
    <div className="bg-white rounded-2xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src={icon} alt={label} width={18} height={18} />
          <p className="text-sm font-medium text-gray-600">{label}</p>
        </div>
        <FormField
          as="select"
          options={[{ label: "All time", value: "All time" }]}
          className="w-40"
        />
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <p className="text-xl font-bold text-gray-800">{value}</p>
          <p className="text-sm text-gray-500">{subChange}</p>
        </div>
        <div className="flex items-center text-green-500 text-sm font-medium gap-1 mt-1">
          <FiTrendingUp /> {change}
        </div>
      </div>

      <div className="h-16">
        {showChart ? (
          <Sparklines data={data}>
            <SparklinesLine
              color={color}
              style={{
                fill: color,
                fillOpacity: 0.065,
              }}
            />
          </Sparklines>
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-50 rounded">
            <p className="text-xs text-gray-400">No chart data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
