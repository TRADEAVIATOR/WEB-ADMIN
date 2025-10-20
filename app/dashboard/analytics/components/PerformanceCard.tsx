"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export default function PerformanceCard() {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [50, 70, 65, 90, 75, 100, 80, 110, 95, 105, 120, 100],
        borderColor: "#FF6A00",
        backgroundColor: "rgba(255,106,0,0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="font-semibold text-gray-700 mb-2">Performance</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-gray-500 text-sm">Total Balance</p>
          <p className="font-bold text-lg">₦1,000,000,000</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Total Deposit</p>
          <p className="font-bold text-lg text-green-500">₦1,000,000,000</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Total Withdrawal</p>
          <p className="font-bold text-lg text-red-500">₦1,000,000,000</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Total Users</p>
          <p className="font-bold text-lg text-orange-500">200,000</p>
        </div>
      </div>
      <Line
        data={data}
        options={{
          plugins: { legend: { display: false } },
          scales: { x: { display: true }, y: { display: false } },
        }}
      />
    </div>
  );
}
