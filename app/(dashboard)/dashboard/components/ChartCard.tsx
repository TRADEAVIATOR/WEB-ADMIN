"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Select from "@/components/ui/Select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartCardProps {
  title: string;
  type: "line" | "bar";
  className?: string;
}

export default function ChartCard({ title, className }: ChartCardProps) {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: title,
        data: [12, 19, 10, 15, 20, 25],
        borderColor: "#FE7F32",
        backgroundColor: "rgba(254,127,50,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-secondary">{title}</h2>
        <Select options={["Crypto", "Giftcard"]} />
      </div>
      <Line data={data} />
    </div>
  );
}
