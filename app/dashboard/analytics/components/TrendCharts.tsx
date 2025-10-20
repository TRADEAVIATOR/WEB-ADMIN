"use client";

import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

export default function TrendCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-700 mb-4">
          Crypto and Giftcard
        </h2>
        <Line
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "Giftcard",
                data: [200, 300, 250, 350, 400, 650],
                borderColor: "#22C55E",
                fill: false,
              },
              {
                label: "Crypto",
                data: [100, 150, 200, 250, 300, 700],
                borderColor: "#8B5CF6",
                fill: false,
              },
            ],
          }}
          options={{
            plugins: { legend: { display: true, position: "bottom" } },
          }}
        />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-700 mb-4">User Growth</h2>
        <Line
          data={{
            labels: ["M", "T", "W", "T", "F", "S", "S"],
            datasets: [
              {
                label: "Users",
                data: [200, 400, 800, 1000, 700, 1200, 1000],
                borderColor: "#FF6A00",
                backgroundColor: "rgba(255,106,0,0.1)",
                tension: 0.4,
                fill: true,
              },
            ],
          }}
          options={{ plugins: { legend: { display: false } } }}
        />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-700 mb-4">
          Virtual Card Spending
        </h2>
        <Bar
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr"],
            datasets: [
              {
                label: "Visa",
                data: [70000, 85000, 60000, 90000],
                backgroundColor: "#00A3FF",
              },
              {
                label: "Mastercard",
                data: [90000, 95000, 88000, 97000],
                backgroundColor: "#FF6A00",
              },
            ],
          }}
          options={{
            plugins: { legend: { display: true, position: "bottom" } },
          }}
        />
      </div>
    </div>
  );
}
