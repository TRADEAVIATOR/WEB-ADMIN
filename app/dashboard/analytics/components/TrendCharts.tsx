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

interface TrendChartsProps {
  data?: {
    overview?: {
      totalUsers: number;
    };
    charts?: {
      cryptoVolumeByMonth?: Array<{ month: string; value: string }>;
      transactionsByType?: Array<{
        type: string;
        count: number;
        percentage: string;
      }>;
      virtualCardSpendingLast7Days?: Array<any>;
    };
  };
}

export default function TrendCharts({ data }: TrendChartsProps) {
  const { overview, charts } = data || {};

  const cryptoData = charts?.cryptoVolumeByMonth || [];
  const giftcardTransactions = charts?.transactionsByType?.find(
    (t) => t.type === "GIFTCARDS"
  );

  const hasCryptoData = cryptoData.length > 0;
  const months = cryptoData.map((item) => item.month.toUpperCase());
  const cryptoValues = cryptoData.map((item) => parseFloat(item.value));

  const giftcardCount = giftcardTransactions?.count || 0;
  const hasGiftcardData = giftcardCount > 0;

  const lineChartData = {
    labels: months,
    datasets: [
      ...(hasGiftcardData
        ? [
            {
              label: "Giftcard",
              data: months.map(() => giftcardCount),
              borderColor: "#A479FF",
              backgroundColor: "#A479FF",
              tension: 0.4,
              fill: false,
              pointRadius: 4,
              pointHoverRadius: 5,
            },
          ]
        : []),
      ...(hasCryptoData
        ? [
            {
              label: "Crypto",
              data: cryptoValues,
              borderColor: "#00C159",
              backgroundColor: "#00C159",
              tension: 0.4,
              fill: false,
              pointRadius: 4,
              pointHoverRadius: 5,
            },
          ]
        : []),
    ],
  };

  const totalUsers = overview?.totalUsers || 0;
  const userGrowthData =
    totalUsers > 0
      ? Array.from({ length: 7 }, (_, i) =>
          Math.floor(totalUsers * (0.85 + i * 0.02))
        )
      : [];

  const virtualCardData = (charts?.virtualCardSpendingLast7Days || []).filter(
    (item: any) => item.day && item.day !== "Invalid Date"
  );

  const hasVirtualCardData = virtualCardData.length > 0;

  const barChartData = {
    labels: virtualCardData.map((item: any) => item.day?.toUpperCase()),
    datasets: [
      {
        label: "Card Spending",
        data: virtualCardData.map((item: any) =>
          parseFloat(item.amount || "0")
        ),
        backgroundColor: "#FE7F32",
        borderRadius: 6,
        barThickness: 18,
      },
    ],
  };

  const hasLineChartData = hasCryptoData || hasGiftcardData;

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
        {hasCryptoData && (
          <div className="flex items-center text-green-500 text-sm font-medium gap-1 mb-4">
            <FiTrendingUp /> +5%
          </div>
        )}
        {hasLineChartData ? (
          <Line
            data={lineChartData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  display: true,
                  position: "bottom" as const,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400">
            <p className="text-sm">No transaction data available</p>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-1">
          <h2 className="font-semibold text-gray-700">User Growth</h2>
          <p className="text-lg font-bold text-gray-800">
            {totalUsers.toLocaleString()}
          </p>
        </div>

        <div className="flex justify-between items-center text-sm mb-4">
          <p className="text-gray-500">Last 7 days</p>
          {totalUsers > 0 && (
            <div className="flex items-center text-green-500 font-medium gap-1">
              <FiTrendingUp /> +5%
            </div>
          )}
        </div>

        {userGrowthData.length > 0 ? (
          <div className="w-full h-24">
            <Sparklines
              data={userGrowthData}
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
        ) : (
          <div className="h-24 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-sm text-gray-400">No user data available</p>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-medium text-gray-600">
            Virtual Card Spending
          </p>
          <FormField
            as="select"
            options={[{ label: "All time", value: "All time" }]}
            className="w-40"
          />
        </div>
        {hasVirtualCardData ? (
          <Bar
            data={barChartData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  display: true,
                  position: "bottom" as const,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400">
            <p className="text-sm">No spending data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
