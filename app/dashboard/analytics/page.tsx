import TrendCharts from "./components/TrendCharts";
import PerformanceCard from "./components/PerformanceCard";
import VirtualCardChart from "./components/VirtualCardChart";
import StatCard from "./components/StatCard";

export default async function AnalyticsPage() {
  const miniCards = [
    {
      label: "Overall Crypto Volume",
      value: "₦1,000,000",
      change: "+10%",
      data: [5, 10, 5, 20, 8, 15, 10],
      color: "#00A3FF",
      period: "All time",
    },
    {
      label: "Overall Bills Payment",
      value: "₦1,000,000",
      change: "+5%",
      data: [15, 20, 10, 30, 25, 40, 35],
      color: "#8B5CF6",
      period: "All time",
    },
    {
      label: "Giftcards",
      value: "₦1,000,000",
      change: "+15%",
      data: [10, 15, 12, 18, 22, 17, 19],
      color: "#22C55E",
      period: "All time",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceCard />
        </div>
        <VirtualCardChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {miniCards.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <TrendCharts />
    </div>
  );
}
