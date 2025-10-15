"use client";

import { Sparklines, SparklinesLine, SparklinesCurve } from "react-sparklines";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  data?: number[];
}

export default function StatCard({
  label,
  value,
  change,
  data = [5, 10, 5, 20, 8, 15, 10],
}: StatCardProps) {
  return (
    <div className="relative bg-white rounded-xl shadow-sm p-5 flex flex-col gap-2 overflow-hidden">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-2xl font-semibold text-secondary">{value}</span>
      <span className="text-sm text-green-500">{change}</span>

      <div className="absolute bottom-2 right-2 w-28 h-12 opacity-40">
        <Sparklines data={data} width={100} height={50}>
          <SparklinesLine color="#4ade80" style={{ strokeWidth: 2 }} />
          <SparklinesCurve style={{ fill: "#4ade80", strokeWidth: 0 }} />
        </Sparklines>
      </div>
    </div>
  );
}
