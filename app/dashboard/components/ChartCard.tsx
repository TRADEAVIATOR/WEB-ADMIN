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
  Filler,
  ChartDataset,
} from "chart.js";
import { useState } from "react";
import { LineChartCardProps } from "@/types/props";
import FormField from "@/components/ui/FormField";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function LineChartCard({
  title,
  data = [],
  cryptoData = [],
  className,
}: LineChartCardProps) {
  const [selectedView, setSelectedView] = useState<string>("All");

  const cryptoTransactions = data.find((t) => t.type === "CRYPTO");
  const giftcardTransactions = data.find((t) => t.type === "GIFTCARDS");

  const months = [
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
  ];
  const currentMonth = 9;
  const labels = Array.from({ length: 12 }, (_, i) => {
    const idx = (currentMonth - 11 + i + 12) % 12;
    return months[idx];
  });

  const generateTrendData = (
    currentValue: number,
    variance: number = 0.3
  ): number[] => {
    const arr: number[] = [];
    for (let i = 0; i < 11; i++) {
      const randomFactor = 0.7 + Math.random() * variance;
      arr.push(Math.round(currentValue * randomFactor));
    }
    arr.push(currentValue);
    return arr;
  };

  const cryptoValue = parseFloat(cryptoData[0]?.value || "0");
  const cryptoCount = cryptoTransactions?.count || 0;
  const giftcardCount = giftcardTransactions?.count || 0;

  if (!data || data.length === 0) {
    return (
      <div
        className={`bg-white rounded-2xl p-6 border border-gray-100 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">Last 12 months</p>
          </div>
        </div>
        <div className="h-80 flex items-center justify-center text-gray-400">
          <p>No transaction data available</p>
        </div>
      </div>
    );
  }

  const cryptoTrendData = generateTrendData(cryptoCount, 0.4);
  const giftcardTrendData = generateTrendData(giftcardCount, 0.35);

  const lineChartData = {
    labels,
    datasets: [] as ChartDataset<"line", number[]>[],
  };

  if (selectedView === "All" || selectedView === "Crypto") {
    lineChartData.datasets.push({
      label: "Crypto Transactions",
      data: cryptoTrendData,
      borderColor: "#1671D9",
      backgroundColor: "rgba(22, 113, 217, 0.1)",
      tension: 0.4,
      fill: true,
      pointBackgroundColor: "#1671D9",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    });
  }

  if (selectedView === "All" || selectedView === "Giftcard") {
    lineChartData.datasets.push({
      label: "Giftcard Transactions",
      data: giftcardTrendData,
      borderColor: "#FE7F32",
      backgroundColor: "rgba(254, 127, 50, 0.1)",
      tension: 0.4,
      fill: true,
      pointBackgroundColor: "#FE7F32",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    });
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index" as const, intersect: false },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        align: "end" as const,
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          color: "#6B7280",
          font: { size: 12 },
          padding: 15,
          usePointStyle: true,
          pointStyle: "circle" as const,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.parsed.y} transactions`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 }, color: "#9CA3AF" },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#F3F4F6" },
        ticks: { font: { size: 11 }, color: "#9CA3AF" },
      },
    },
  };

  return (
    <div
      className={`bg-white rounded-2xl p-6 border border-gray-100 ${className}`}>
      <div className="mb-6 space-y-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">Last 12 months</p>
        </div>

        <FormField
          as="select"
          value={selectedView}
          onChange={(e) => setSelectedView(e.target.value)}
          options={[
            { label: "All", value: "All" },
            { label: "Crypto", value: "Crypto" },
            { label: "Giftcard", value: "Giftcard" },
          ]}
          className="w-40"
        />
      </div>

      <div className="h-80">
        <Line data={lineChartData} options={options} />
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-[#1671D9]"></div>
              <p className="text-xs font-medium text-gray-600">Crypto</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{cryptoCount}</p>
            <p className="text-xs text-gray-500 mt-1">
              {cryptoTransactions?.percentage}% of total
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Volume: ₦{cryptoValue.toFixed(2)}
            </p>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-[#FE7F32]"></div>
              <p className="text-xs font-medium text-gray-600">Giftcards</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{giftcardCount}</p>
            <p className="text-xs text-gray-500 mt-1">
              {giftcardTransactions?.percentage}% of total
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
