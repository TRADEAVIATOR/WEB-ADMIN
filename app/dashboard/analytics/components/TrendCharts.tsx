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

  const months = cryptoData.map((item) => item.month.toUpperCase());
  const cryptoValues = cryptoData.map((item) => parseFloat(item.value));

  const giftcardCount = giftcardTransactions?.count || 0;
  const giftcardValues = months.map((_, i) => giftcardCount * (i + 1) * 1000);

  const lineChartData = {
    labels:
      months.length > 0 ? months : ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
    datasets: [
      {
        label: "Giftcard",
        data:
          giftcardValues.length > 0
            ? giftcardValues
            : [200, 400, 350, 450, 600, 800],
        borderColor: "#A479FF",
        backgroundColor: "#A479FF",
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 5,
      },
      {
        label: "Crypto",
        data:
          cryptoValues.length > 0
            ? cryptoValues
            : [150, 250, 300, 400, 550, 1000],
        borderColor: "#00C159",
        backgroundColor: "#00C159",
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 5,
      },
    ],
  };

  const totalUsers = overview?.totalUsers || 0;
  const userGrowthData = Array.from({ length: 7 }, (_, i) =>
    Math.floor(totalUsers * (0.85 + i * 0.02))
  );

  const virtualCardData = charts?.virtualCardSpendingLast7Days || [];

  const barChartData = {
    labels:
      virtualCardData.length > 0
        ? virtualCardData.map((item: any) => item.day?.toUpperCase())
        : ["JAN", "FEB", "MAR", "APR"],
    datasets: [
      {
        label: "Visa",
        data:
          virtualCardData.length > 0
            ? virtualCardData.map((item: any) => parseFloat(item.visa || "0"))
            : [70000, 85000, 60000, 90000],
        backgroundColor: "#FE7F32",
        borderRadius: 6,
        barThickness: 18,
      },
      {
        label: "Mastercard",
        data:
          virtualCardData.length > 0
            ? virtualCardData.map((item: any) =>
                parseFloat(item.mastercard || "0")
              )
            : [90000, 95000, 88000, 97000],
        backgroundColor: "#532000",
        borderRadius: 6,
        barThickness: 18,
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
          <div className="flex items-center text-green-500 font-medium gap-1">
            <FiTrendingUp /> +5%
          </div>
        </div>

        <div className="w-full h-24">
          <Sparklines data={userGrowthData} width={300} height={90} margin={5}>
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
        {virtualCardData.length > 0 || true ? (
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
