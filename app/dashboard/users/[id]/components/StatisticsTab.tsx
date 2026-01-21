"use client";

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

interface StatisticsTabProps {
  customerStats: {
    totalVolume: string;
    statusCounts: Record<string, number>;
    categoryStats: { category: string; totalAmount: string; count: number }[];
    periodStats: { last30Days: { volume: string; count: number } };
  };
}

export default function StatisticsTab({ customerStats }: StatisticsTabProps) {
  if (!customerStats) return <div>No statistics available</div>;

  const { totalVolume, statusCounts, categoryStats, periodStats } =
    customerStats;

  const categoryLabels = categoryStats.map((c) => c.category);
  const categoryAmounts = categoryStats.map((c) => parseFloat(c.totalAmount));
  const categoryBarData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Total Amount",
        data: categoryAmounts,
        backgroundColor: categoryLabels.map(
          (_, i) =>
            `rgba(${50 + i * 20}, ${100 + i * 15}, ${200 - i * 10}, 0.7)`,
        ),
      },
    ],
  };

  const statusLabels = Object.keys(statusCounts);
  const statusValues = Object.values(statusCounts);
  const statusPieData = {
    labels: statusLabels,
    datasets: [
      {
        data: statusValues,
        backgroundColor: ["#4ade80", "#f87171", "#fbbf24", "#60a5fa"],
      },
    ],
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Total Volume</h3>
        <p className="text-2xl font-bold text-gray-800">
          {parseFloat(totalVolume).toLocaleString()}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">
          Transaction Status Counts
        </h3>
        <div className="flex flex-wrap gap-4 mb-4">
          {statusLabels.map((status) => (
            <div
              key={status}
              className="px-3 py-1 rounded text-white font-medium"
              style={{
                backgroundColor:
                  status === "SUCCESS"
                    ? "#4ade80"
                    : status === "FAILED"
                      ? "#f87171"
                      : status === "REVERSED"
                        ? "#fbbf24"
                        : "#60a5fa",
              }}>
              {status}: {statusCounts[status]}
            </div>
          ))}
        </div>
        <Pie data={statusPieData} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Category Stats</h3>
        <Bar data={categoryBarData} />
        <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {categoryStats.map((cat) => (
            <li
              key={cat.category}
              className="bg-gray-100 px-3 py-1 rounded text-sm flex justify-between">
              <span>{cat.category}</span>
              <span>{parseFloat(cat.totalAmount).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Last 30 Days</h3>
        <p className="text-gray-700">
          Volume: {parseFloat(periodStats.last30Days.volume).toLocaleString()} |
          Count: {periodStats.last30Days.count}
        </p>
      </div>
    </div>
  );
}
