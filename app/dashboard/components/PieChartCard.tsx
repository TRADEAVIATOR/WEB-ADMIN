"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartCardProps {
  title: string;
  className?: string;
}

export default function PieChartCard({ title, className }: PieChartCardProps) {
  const data = {
    labels: ["Crypto", "Giftcards", "Others"],
    datasets: [
      {
        label: title,
        data: [60, 30, 10],
        backgroundColor: ["#FE7F32", "#FACC15", "#3B82F6"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm p-5 ${className}`}>
      <h2 className="text-sm font-semibold text-gray-600 mb-3">{title}</h2>
      <Pie data={data} />
    </div>
  );
}
