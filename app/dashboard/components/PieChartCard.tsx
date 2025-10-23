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
    labels: ["Mastercard", "Visa"],
    datasets: [
      {
        label: title,
        data: [75, 25],
        backgroundColor: ["#FE7F32", "#532000"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 14,
          boxHeight: 14,
          color: "#374151",
          font: { size: 12 },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className={`bg-white rounded-2xl p-5 ${className}`}>
      <h2 className="text-sm font-semibold text-gray-700 mb-4">{title}</h2>
      <div className="h-72 flex items-center justify-center">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
