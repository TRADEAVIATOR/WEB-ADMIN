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
  className?: string;
}

export default function ChartCard({ title, className }: ChartCardProps) {
  const data = {
    labels: Array.from({ length: 12 }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: "Crypto",
        data: [200, 400, 600, 800, 700, 1000, 900, 850, 950, 700, 800, 1000],
        borderColor: "#1671D9",
        backgroundColor: "rgba(22,113,217,0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Giftcards",
        data: [150, 300, 500, 700, 600, 900, 850, 800, 900, 650, 750, 950],
        borderColor: "#F56630",
        backgroundColor: "rgba(245,102,48,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className={`bg-white rounded-2xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-secondary">{title}</h2>
        <Select options={["Crypto", "Giftcard"]} />
      </div>
      <Line data={data} />
    </div>
  );
}
