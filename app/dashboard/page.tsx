import ResultState from "@/components/ui/ResultState";
import StatCard from "./components/StatCard";
import ChartCard from "./components/ChartCard";
import ActivityTable from "./components/ActivityTable";
import { getDashboardMetrics, getDashboardGrowth } from "@/lib/api/dashboard";
import { calculateChange, extractSparklineData } from "@/lib/utils/dashboard";
import LeaderboardCard from "./components/LeaderboardCard";
import PieChartCard from "./components/PieChartCard";
import ActionRequiredCard from "./components/ActionRequiredCard";
import { Activity, DashboardGrowth, DashboardMetrics } from "@/types/models";
import { formatCurrency } from "@/lib/utils/format";
import { getDisputes } from "@/lib/api/disputes";
import { getGiftCardSales } from "@/lib/api/giftcards";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [metricsRes, growthRes, disputesRes, giftcardsRes] = await Promise.all([
    getDashboardMetrics(),
    getDashboardGrowth(),
    getDisputes(1, 100),
    getGiftCardSales(1, 100),
  ]);

  if (
    metricsRes.error ||
    growthRes.error ||
    disputesRes?.error ||
    giftcardsRes?.error
  ) {
    return <ResultState type="error" message="Unable to load dashboard." />;
  }

  const metrics: DashboardMetrics = metricsRes.data.data;
  const growth: DashboardGrowth = growthRes.data.data;

  const pendingDisputes =
    disputesRes.data?.data.transactions?.filter((tx: any) =>
      tx.disputes?.some((d: any) => d.status !== "RESOLVED")
    ) ?? [];

  const pendingGiftcardSales =
    giftcardsRes.data.results?.filter(
      (sale: any) => sale.status === "SUBMITTED"
    ) ?? [];

  const statCards = [
    {
      label: "Total Users",
      value: metrics.overview.totalUsers.toLocaleString(),
      change: calculateChange(growth.charts.transactionsByType, "users"),
      data: extractSparklineData(growth.charts.transactionsByType),
    },
    {
      label: "User Balance",
      value: formatCurrency(metrics.overview.normalWalletBalance),
      change: calculateChange(growth.charts.cryptoVolumeByMonth, "balance"),
      data: extractSparklineData(growth.charts.cryptoVolumeByMonth),
    },
    {
      label: "Total Crypto Volume",
      value: formatCurrency(metrics.overview.totalCryptoVolume),
      change: calculateChange(growth.charts.cryptoDistribution, "crypto"),
      data: extractSparklineData(growth.charts.cryptoDistribution),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-semibold text-secondary">
          Welcome back, <span className="text-primary">Big Brain</span>
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Here’s what’s happening today on{" "}
          <span className="font-medium text-secondary">TradeAviator</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
        <ActionRequiredCard
          giftcards={pendingGiftcardSales.length}
          pending={pendingDisputes.length}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <ChartCard
          title="Total Transactions"
          data={growth.charts.transactionsByType}
          className="lg:col-span-8"
        />
        <ActivityTable
          title="Recent Activities"
          data={metrics.recentActivities.slice(0, 7) as Activity[]}
          className="lg:col-span-4"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <LeaderboardCard title="Leaderboard" className="lg:col-span-8" />
        <PieChartCard
          title="Virtual Card Analytics"
          data={growth.charts.cardsDistribution}
          className="lg:col-span-4"
        />
      </div>
    </div>
  );
}
