import ResultState from "@/components/ui/ResultState";
import StatCard from "./components/StatCard";
import { Activity, DashboardGrowth, DashboardMetrics } from "@/types/models";
import { getDashboardMetrics, getDashboardGrowth } from "@/lib/api/dashboard";
import {
  getAllCryptoPairRates,
  getMarketInsights,
  getNgnRate,
} from "@/lib/api/crypto";
import { calculateChange, extractSparklineData } from "@/lib/utils/dashboard";
import ChartCard from "./components/ChartCard";
import ActivityTable from "./components/ActivityTable";
import PieChartCard from "./components/PieChartCard";
import ActionRequiredCard from "./components/ActionRequiredCard";
import { formatCurrency } from "@/lib/utils/format";
import CryptoTicker from "./components/CryptoTicker";
import MarketInsightsCard from "./components/MarketInsightsCard";
import { auth } from "@/lib/auth/session";
import DashboardHeader from "./components/DashboardHeader";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  const userName = session?.user.name || "User";

  const results = await Promise.allSettled([
    getDashboardMetrics(),
    getDashboardGrowth(),
    getAllCryptoPairRates(),
    getMarketInsights(),
    getNgnRate(),
  ]);

  const metricsRes =
    results[0].status === "fulfilled" ? results[0].value : null;
  const growthRes = results[1].status === "fulfilled" ? results[1].value : null;

  if (!metricsRes || !growthRes || metricsRes.error || growthRes.error) {
    return (
      <ResultState
        type="error"
        message="Unable to load dashboard data. Please try again."
        showRefresh
      />
    );
  }

  const metrics: DashboardMetrics = metricsRes.data.data;
  const growth: DashboardGrowth = growthRes.data.data;

  const cryptoRes = results[2].status === "fulfilled" ? results[2].value : null;

  const cryptoData =
    cryptoRes && "data" in cryptoRes && Array.isArray(cryptoRes.data)
      ? cryptoRes.data
      : [];

  const marketInsightsRes =
    results[3].status === "fulfilled" ? results[3].value : null;

  const marketInsights =
    marketInsightsRes &&
    marketInsightsRes.error === null &&
    marketInsightsRes.data &&
    Array.isArray(marketInsightsRes.data.data)
      ? marketInsightsRes.data.data
      : [];

  const ngnRateRes =
    results[4].status === "fulfilled" ? results[4].value : null;

  const ngnRate =
    ngnRateRes &&
    ngnRateRes.error === null &&
    typeof ngnRateRes.data === "number"
      ? ngnRateRes.data
      : null;

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
    {
      label: "Total Gift Card Volume",
      value: formatCurrency(metrics.overview.totalGiftcardVolume, {
        currency: "NGN",
        locale: "en-NG",
      }),
      change: metrics.actionRequired.giftcardRequests || 0,
      data: extractSparklineData(growth.charts.cardsDistribution),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <DashboardHeader
          userName={userName}
          ngnRate={ngnRate}
          isSuperAdmin={session?.user.role === "superAdmin"}
        />

        <CryptoTicker cryptos={cryptoData} ngnRate={ngnRate} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} className="lg:col-span-1" />
        ))}

        <ActionRequiredCard
          giftcards={metrics.actionRequired.giftcardRequests}
          pending={metrics.actionRequired.pendingTransactions}
          className="lg:col-span-2"
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
        {marketInsights.length > 0 ? (
          <MarketInsightsCard
            title="Market Insights"
            data={marketInsights}
            className="lg:col-span-8"
          />
        ) : (
          <ResultState
            type="empty"
            title="Market Insights Unavailable"
            message="Crypto market data is temporarily unavailable."
            className="lg:col-span-8"
          />
        )}

        <PieChartCard
          title="Virtual Card Analytics"
          data={growth.charts.cardsDistribution}
          className="lg:col-span-4"
        />
      </div>
    </div>
  );
}
