"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface VirtualCardChartProps {
  cardsData?: Array<{ count: number; percentage: string }>;
}

export default function VirtualCardChart({ cardsData }: VirtualCardChartProps) {
  const hasCardData =
    cardsData && cardsData.length > 0 && cardsData[0]?.count > 0;
  const totalCards = hasCardData ? cardsData[0].count : 0;
  const totalAmount = totalCards * 84000;

  const data = {
    labels: ["Mastercard", "Visa"],
    datasets: [
      {
        label: "Cards",
        data: [Math.floor(totalCards * 0.75), Math.ceil(totalCards * 0.25)],
        backgroundColor: ["#FE7F32", "#532000"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 14,
          boxHeight: 14,
          color: "#374151",
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage =
              total > 0 ? ((value / total) * 100).toFixed(1) : "0";
            return `${label}: ${value} cards (${percentage}%)`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <h2 className="font-semibold text-gray-700 mb-4">Virtual Card</h2>
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">Total cards created</p>
        <p className="text-2xl font-bold text-gray-800">
          {totalCards.toLocaleString()}
        </p>
        {totalCards > 0 && (
          <p className="text-xs text-gray-400 mt-1">
            Est. value: ₦{totalAmount.toLocaleString()}
          </p>
        )}
      </div>
      <div className="h-72 flex items-center justify-center">
        {hasCardData ? (
          <Pie data={data} options={options} />
        ) : (
          <div className="text-center text-gray-400">
            <p className="text-sm">No card data available</p>
          </div>
        )}
      </div>
    </>
  );
}
