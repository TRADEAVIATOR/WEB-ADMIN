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
import { FiTrendingUp } from "react-icons/fi";
import { Sparklines, SparklinesLine } from "react-sparklines";
import FormField from "@/components/ui/FormField";

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
  const data = {
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
    datasets: [
      {
        label: "Giftcard",
        data: [200, 400, 350, 450, 600, 800],
        borderColor: "#A479FF",
        backgroundColor: "#A479FF",
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 5,
      },
      {
        label: "Crypto",
        data: [150, 250, 300, 400, 550, 1000],
        borderColor: "#00C159",
        backgroundColor: "#00C159",
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 5,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-600">
            Crypto and Giftcard
          </p>
          <FormField
            as="select"
            options={[{ label: "All time", value: "All time" }]}
            className="w-40"
          />
        </div>
        <div className="flex items-center text-green-500 text-sm font-medium gap-1 mb-4">
          <FiTrendingUp /> +5%
        </div>
        <Line data={data} />
      </div>

      <div className="bg-white p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-1">
          <h2 className="font-semibold text-gray-700">User Growth</h2>
          <p className="text-lg font-bold text-gray-800">1,000,000</p>
        </div>

        <div className="flex justify-between items-center text-sm mb-4">
          <p className="text-gray-500">Last 7 days</p>
          <div className="flex items-center text-green-500 font-medium gap-1">
            <FiTrendingUp /> +5%
          </div>
        </div>

        <div className="w-full h-24">
          <Sparklines
            data={[200, 400, 800, 1000, 700, 1200, 1000]}
            width={300}
            height={90}
            margin={5}>
            <SparklinesLine
              color="#FE7F32"
              style={{
                fill: "#FFF6F1",
                fillOpacity: 1,
                strokeWidth: 2,
                strokeLinejoin: "round",
                strokeLinecap: "round",
              }}
            />
          </Sparklines>

          <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
            {["M", "T", "W", "T", "F", "S", "S"].map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-600">
            Virtual Card Spending
          </p>
          <FormField
            as="select"
            options={[{ label: "All time", value: "All time" }]}
            className="w-40"
          />
        </div>
        <Bar
          data={{
            labels: ["JAN", "FEB", "MAR", "APR"],
            datasets: [
              {
                label: "Visa",
                data: [70000, 85000, 60000, 90000],
                backgroundColor: "#FE7F32",
                borderRadius: 6,
                barThickness: 18,
              },
              {
                label: "Mastercard",
                data: [90000, 95000, 88000, 97000],
                backgroundColor: "#532000",
                borderRadius: 6,
                barThickness: 18,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
