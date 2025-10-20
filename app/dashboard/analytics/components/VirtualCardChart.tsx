"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function VirtualCardChart() {
  const data = {
    labels: ["Mastercard", "Visa"],
    datasets: [
      {
        data: [400, 901],
        backgroundColor: ["#FF6A00", "#00A3FF"],
        cutout: "75%",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="font-semibold text-gray-700 mb-4">Virtual Card</h2>
      <div className="flex justify-center my-6">
        <div className="w-40 h-40">
          <Doughnut
            data={data}
            options={{ plugins: { legend: { display: true } } }}
          />
        </div>
      </div>
      <p className="text-center font-semibold">₦1,000,000,000</p>
    </div>
  );
}
