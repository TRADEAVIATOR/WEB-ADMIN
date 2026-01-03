import ResultState from "@/components/ui/ResultState";
import StatCard from "./components/StatCard";
import { Activity, DashboardGrowth, DashboardMetrics } from "@/types/models";
import { getDashboardMetrics, getDashboardGrowth } from "@/lib/api/dashboard";
import { calculateChange, extractSparklineData } from "@/lib/utils/dashboard";
import ChartCard from "./components/ChartCard";
import ActivityTable from "./components/ActivityTable";
import LeaderboardCard from "./components/LeaderboardCard";
import PieChartCard from "./components/PieChartCard";
import ActionRequiredCard from "./components/ActionRequiredCard";
import { formatCurrency } from "@/lib/utils/format";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const results = await Promise.allSettled([
    getDashboardMetrics(),
    getDashboardGrowth(),
  ]);

  const [metricsRes, growthRes] = results.map((r) =>
    r.status === "fulfilled" ? r.value : null
  );

  const metrics: DashboardMetrics | null = metricsRes?.error
    ? null
    : metricsRes?.data?.data ?? null;

  const growth: DashboardGrowth | null = growthRes?.error
    ? null
    : growthRes?.data?.data ?? null;

  const statCards =
    metrics && growth
      ? [
          {
            label: "Total Users",
            value: metrics.overview.totalUsers.toLocaleString(),
            change: metrics.overview.totalUsersToday,
            data: extractSparklineData(growth.charts.transactionsByType),
          },
          {
            label: "Total Balance",
            value: formatCurrency(metrics.overview.totalBalance),
            change: calculateChange(
              growth.charts.cryptoVolumeByMonth,
              "balance"
            ),
            data: extractSparklineData(growth.charts.cryptoVolumeByMonth),
          },
          {
            label: "Total Crypto Volume",
            value: formatCurrency(metrics.overview.totalCryptoVolume, {
              currency: "USD",
              locale: "en-US",
            }),
            change: calculateChange(growth.charts.cryptoDistribution, "crypto"),
            data: extractSparklineData(growth.charts.cryptoDistribution),
          },
        ]
      : [];

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

      {metrics && growth ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
          <ActionRequiredCard
            giftcards={metrics.actionRequired.giftcardRequests}
            pending={metrics.actionRequired.pendingTransactions}
          />
        </div>
      ) : (
        <ResultState type="error" message="Unable to load metrics." />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {growth ? (
          <ChartCard
            title="Total Transactions"
            data={growth.charts.transactionsByType}
            className="lg:col-span-8"
          />
        ) : (
          <div className="lg:col-span-8">
            <ResultState type="error" message="Unable to load chart." />
          </div>
        )}

        {metrics ? (
          <ActivityTable
            title="Recent Activities"
            data={metrics.recentActivities as Activity[]}
            className="lg:col-span-4"
          />
        ) : (
          <div className="lg:col-span-4">
            <ResultState type="error" message="Unable to load activities." />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <LeaderboardCard title="Leaderboard" className="lg:col-span-8" />

        {growth ? (
          <PieChartCard
            title="Virtual Card Analytics"
            data={growth.charts.cardsDistribution}
            className="lg:col-span-4"
          />
        ) : (
          <div className="lg:col-span-4">
            <ResultState
              type="error"
              message="Unable to load card analytics."
            />
          </div>
        )}
      </div>
    </div>
  );
}
