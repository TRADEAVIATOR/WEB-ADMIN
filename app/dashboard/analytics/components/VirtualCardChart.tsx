"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function VirtualCardChart() {
  const data = {
    labels: ["Mastercard", "Visa"],
    datasets: [
      {
        label: "",
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
    <>
      <h2 className="font-semibold text-gray-700 mb-4">Virtual Card</h2>
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">Total card payment</p>
        <p className="text-2xl font-bold text-gray-800">₦1,000,000,000</p>
      </div>
      <div className="h-72 flex items-center justify-center">
        <Pie data={data} options={options} />
      </div>
    </>
  );
}
