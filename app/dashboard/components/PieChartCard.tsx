"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { PieChartCardProps } from "@/types/props";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartCard({
  title,
  data,
  className,
}: PieChartCardProps) {
  const totalCards = data.reduce((sum, item) => sum + item.count, 0);

  const virtualCards = Math.floor(totalCards * 0.65);
  const physicalCards = totalCards - virtualCards;

  const chartData = {
    labels: ["Virtual Cards", "Physical Cards"],
    datasets: [
      {
        label: "Cards",
        data: [virtualCards, physicalCards],
        backgroundColor: ["#FE7F32", "#FFB088"],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 14,
          boxHeight: 14,
          color: "#374151",
          font: { size: 13 },
          padding: 16,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.parsed;
            const percentage = ((value / totalCards) * 100).toFixed(1);
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "60%",
  };

  return (
    <div
      className={`bg-white rounded-2xl p-6 border border-gray-100 ${className}`}>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">Total active cards</p>
      </div>

      <div className="h-64 flex items-center justify-center relative">
        <Doughnut data={chartData} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-3xl font-bold text-gray-800">{totalCards}</p>
          <p className="text-xs text-gray-500 mt-1">Total Cards</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-[#FE7F32]"></div>
              <p className="text-xs font-medium text-gray-600">Virtual</p>
            </div>
            <p className="text-xl font-bold text-gray-800">{virtualCards}</p>
            <p className="text-xs text-gray-500">
              {((virtualCards / totalCards) * 100).toFixed(0)}%
            </p>
          </div>

          <div className="bg-orange-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-[#FFB088]"></div>
              <p className="text-xs font-medium text-gray-600">Physical</p>
            </div>
            <p className="text-xl font-bold text-gray-800">{physicalCards}</p>
            <p className="text-xs text-gray-500">
              {((physicalCards / totalCards) * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
