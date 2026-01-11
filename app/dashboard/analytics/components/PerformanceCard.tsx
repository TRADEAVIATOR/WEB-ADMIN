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
import VirtualCardChart from "./VirtualCardChart";
import DepositIcon from "@/assets/icons/deposit.svg";
import WithdrawalIcon from "@/assets/icons/withdrawal.svg";
import PeopleIcon from "@/assets/icons/people.svg";
import Image from "next/image";
import FormField from "@/components/ui/FormField";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils/format";

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

interface PerformanceCardProps {
  data?: {
    overview?: {
      totalBalance: number;
      totalUsers: number;
    };
    volumes?: {
      deposits: string;
      withdrawals: string;
    };
    charts?: {
      cryptoVolumeByMonth?: Array<{ month: string; value: string }>;
      cardsDistribution?: Array<{ count: number; percentage: string }>;
    };
  };
}

export default function PerformanceCard({ data }: PerformanceCardProps) {
  const { overview, volumes, charts } = data || {};
  const [selectedView, setSelectedView] = useState("All");

  const cryptoMonthlyData = charts?.cryptoVolumeByMonth || [];
  const labels = cryptoMonthlyData.map((d) => d.month);
  const values = cryptoMonthlyData.map((d) => parseFloat(d.value || "0"));

  const lineChartData = {
    labels,
    datasets: [
      {
        label: "Crypto Volume",
        data: values,
        borderColor: "#1671D9",
        backgroundColor: "rgba(22, 113, 217, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#1671D9",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ] as ChartDataset<"line", number[]>[],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: { color: "#6B7280", boxWidth: 12, boxHeight: 12 },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        callbacks: {
          label: function (context: any) {
            return `${formatCurrency(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#9CA3AF" },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#F3F4F6" },
        ticks: { color: "#9CA3AF" },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4 gap-4">
        <p className="text-sm font-medium text-gray-600">Performance</p>
        <FormField
          as="select"
          value={selectedView}
          onChange={(e) => setSelectedView(e.target.value)}
          options={[{ label: "All time", value: "All time" }]}
          className="w-40"
        />
      </div>

      <div className="mb-6">
        <p className="text-gray-500 text-sm">Total Balance</p>
        <p className="text-3xl font-bold text-gray-800">
          {formatCurrency(overview?.totalBalance)}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 border-r-0 lg:border-r-2 border-gray-100 lg:pr-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center gap-3">
              <Image src={DepositIcon} alt="Deposit" width={22} height={22} />
              <div>
                <p className="text-gray-500 text-sm">Total Deposit</p>
                <p className="font-bold text-lg text-gray-800">
                  {formatCurrency(volumes?.deposits)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Image
                src={WithdrawalIcon}
                alt="Withdrawal"
                width={22}
                height={22}
              />
              <div>
                <p className="text-gray-500 text-sm">Total Withdrawal</p>
                <p className="font-bold text-lg text-gray-800">
                  {formatCurrency(volumes?.withdrawals)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Image src={PeopleIcon} alt="Users" width={22} height={22} />
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="font-bold text-lg text-gray-800">
                  {overview?.totalUsers?.toLocaleString() || "0"}
                </p>
              </div>
            </div>
          </div>

          {values.length > 0 ? (
            <div className="w-full h-80">
              <Line data={lineChartData} options={options} />
            </div>
          ) : (
            <div className="w-full h-80 flex items-center justify-center bg-gray-50 rounded">
              <p className="text-sm text-gray-400">
                No crypto volume data available
              </p>
            </div>
          )}
        </div>

        <div className="lg:pl-8">
          <VirtualCardChart cardsData={charts?.cardsDistribution} />
        </div>
      </div>
    </div>
  );
}
