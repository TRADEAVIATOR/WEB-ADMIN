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
  ChartOptions,
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
  Filler,
);

interface PerformanceCardProps {
  data?: {
    overview?: {
      totalBalance: number;
      totalUsers: number;
      virtualCardBalance: string;
      totalCryptoBalance: string;
    };
    volumes?: {
      deposits: string;
      withdrawals: string;
      bills: string;
      giftcards: string;
    };
    charts?: {
      cryptoVolumeByMonth?: Array<{ month: string; value: string }>;
      cardsDistribution?: Array<{ count: number; percentage: string }>;
      transactionsByType?: Array<{
        type: string;
        count: number;
        percentage: string;
      }>;
    };
  };
}

export default function PerformanceCard({ data }: PerformanceCardProps) {
  const { overview, volumes, charts } = data || {};
  const [selectedView, setSelectedView] = useState("All");

  const cryptoMonthlyData = charts?.cryptoVolumeByMonth || [];
  const paddedData =
    cryptoMonthlyData.length < 2
      ? [{ month: "Jan", value: "0" }, ...cryptoMonthlyData]
      : cryptoMonthlyData;

  const labels = paddedData.map((d) => d.month);
  const cryptoValues = paddedData.map((d) => parseFloat(d.value || "0"));

  const totalDeposits = parseFloat(volumes?.deposits || "0");
  const totalWithdrawals = parseFloat(volumes?.withdrawals || "0");
  const totalGiftcards = parseFloat(volumes?.giftcards || "0");

  const monthCount = labels.length;
  const depositsPerMonth = labels.map(() => totalDeposits / monthCount);
  const withdrawalsPerMonth = labels.map(() => totalWithdrawals / monthCount);
  const giftcardsPerMonth = labels.map(() => totalGiftcards / monthCount);

  const lineChartData = {
    labels,
    datasets: [
      {
        label: "Crypto Volume",
        data: cryptoValues,
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
      {
        label: "Deposits",
        data: depositsPerMonth,
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Withdrawals",
        data: withdrawalsPerMonth,
        borderColor: "#EF4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#EF4444",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Giftcards",
        data: giftcardsPerMonth,
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#F59E0B",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ] as ChartDataset<"line", number[]>[],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#6B7280",
          boxWidth: 12,
          boxHeight: 12,
          padding: 15,
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 12,
        titleFont: {
          size: 13,
          weight: "bold",
        },
        bodyFont: {
          size: 12,
          weight: "normal",
        },
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || "";
            return `${label}: ${formatCurrency(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#F3F4F6",
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 11,
          },
          callback: function (value: any) {
            if (value >= 1000000) {
              return "₦" + (value / 1000000).toFixed(1) + "M";
            } else if (value >= 1000) {
              return "₦" + (value / 1000).toFixed(1) + "K";
            }
            return "₦" + value;
          },
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
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

          {labels.length > 0 ? (
            <div className="w-full h-80">
              <Line data={lineChartData} options={options} />
            </div>
          ) : (
            <div className="w-full h-80 flex items-center justify-center bg-gray-50 rounded">
              <p className="text-sm text-gray-400">No data available</p>
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
