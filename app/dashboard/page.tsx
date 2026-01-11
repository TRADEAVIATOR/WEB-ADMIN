import ResultState from "@/components/ui/ResultState";
import StatCard from "./components/StatCard";
import { Activity, DashboardGrowth, DashboardMetrics } from "@/types/models";
import { getDashboardMetrics, getDashboardGrowth } from "@/lib/api/dashboard";
import { getAllCryptoPairRates } from "@/lib/api/crypto";
import { calculateChange, extractSparklineData } from "@/lib/utils/dashboard";
import ChartCard from "./components/ChartCard";
import ActivityTable from "./components/ActivityTable";
import LeaderboardCard from "./components/LeaderboardCard";
import PieChartCard from "./components/PieChartCard";
import ActionRequiredCard from "./components/ActionRequiredCard";
import { formatCurrency } from "@/lib/utils/format";
import CryptoTicker from "./components/CryptoTicker";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const results = await Promise.allSettled([
    getDashboardMetrics(),
    getDashboardGrowth(),
    getAllCryptoPairRates(),
  ]);

  const hasError = results.some(
    (r) => r.status === "rejected" || r.value?.error
  );

  if (hasError) {
    return (
      <ResultState
        type="error"
        message="Unable to load dashboard data. Please try again."
        showRefresh
      />
    );
  }

  const metricsRes =
    results[0].status === "fulfilled" ? results[0].value : null;
  const growthRes = results[1].status === "fulfilled" ? results[1].value : null;
  const cryptoRes = results[2].status === "fulfilled" ? results[2].value : [];

  if (!metricsRes || !growthRes) {
    return (
      <ResultState
        type="error"
        message="Unable to load dashboard data. Please try again."
      />
    );
  }

  const metrics: DashboardMetrics = metricsRes.data.data;
  const growth: DashboardGrowth = growthRes.data.data;

  const statCards = [
    {
      label: "Total Users",
      value: metrics.overview.totalUsers.toLocaleString(),
      change: metrics.overview.totalUsersToday,
      data: extractSparklineData(growth.charts.transactionsByType),
    },
    {
      label: "Total Balance",
      value: formatCurrency(metrics.overview.totalBalance),
      change: calculateChange(growth.charts.cryptoVolumeByMonth, "balance"),
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
  ];

  const cryptoData = cryptoRes && "data" in cryptoRes ? cryptoRes.data : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-6">
        <div className="flex flex-col gap-1 md:max-w-md whitespace-nowrap">
          <h1 className="text-2xl md:text-3xl font-semibold text-secondary">
            Welcome back, <span className="text-primary">Big Brain</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Here’s what’s happening today on{" "}
            <span className="font-medium text-secondary">TradeAviator</span>
          </p>
        </div>

        <div className="flex-1 md:flex-none md:ml-auto min-w-0">
          <CryptoTicker cryptos={cryptoData} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
        <ActionRequiredCard
          giftcards={metrics.actionRequired.giftcardRequests}
          pending={metrics.actionRequired.pendingTransactions}
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
          data={metrics.recentActivities as Activity[]}
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
