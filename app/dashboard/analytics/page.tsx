import TrendCharts from "./components/TrendCharts";
import PerformanceCard from "./components/PerformanceCard";
import StatCard from "./components/StatCard";
import ResultState from "@/components/ui/ResultState";
import CryptoVolumeIcon from "@/assets/icons/crypto-volume.svg";
import BillsPaymentIcon from "@/assets/icons/bills-payment.svg";
import GiftcardsIcon from "@/assets/icons/giftcards.svg";
import { getDashboardGrowth } from "@/lib/api/dashboard";
import { formatCurrency } from "@/lib/utils/format";

export default async function AnalyticsPage() {
  const dashboardData = await getDashboardGrowth();

  const hasError =
    !dashboardData || dashboardData.error || !dashboardData.data?.data;

  if (hasError) {
    return (
      <ResultState
        type="error"
        message="Unable to load dashboard data. Please try again."
        showRefresh
      />
    );
  }

  const { overview, volumes, charts } = dashboardData.data.data;

  const cryptoMonthlyData = charts?.cryptoVolumeByMonth || [];
  const cryptoValues = cryptoMonthlyData.map((item: any) =>
    parseFloat(item.value || 0)
  );

  let cryptoChange = "0";
  if (cryptoValues.length >= 2) {
    const lastValue = cryptoValues[cryptoValues.length - 1];
    const previousValue = cryptoValues[cryptoValues.length - 2];
    if (previousValue !== 0) {
      cryptoChange = (
        ((lastValue - previousValue) / previousValue) *
        100
      ).toFixed(1);
    }
  }

  const billsTransactions =
    charts?.transactionsByType
      ?.filter(
        (t: any) =>
          t.type && ["DATA", "ELECTRICITY", "CABLE", "AIRTIME"].includes(t.type)
      )
      .reduce((acc: number, curr: any) => acc + (curr.count || 0), 0) || 0;

  const miniCards = [
    {
      label: "Overall Crypto Volume",
      value: formatCurrency(overview?.totalCryptoBalance, {
        currency: "USD",
        locale: "en-US",
      }),
      subChange:
        cryptoMonthlyData.length > 0
          ? `${cryptoMonthlyData.length} months data`
          : "No data",
      change: `${parseFloat(cryptoChange) >= 0 ? "+" : ""}${cryptoChange}%`,
      data: cryptoValues.length > 0 ? cryptoValues : [],
      color: "#00A3FF",
      icon: CryptoVolumeIcon,
      hasData: cryptoValues.length > 0,
    },
    {
      label: "Overall Bills Payment",
      value: formatCurrency(volumes?.bills),
      subChange:
        billsTransactions > 0
          ? `${billsTransactions} Transactions`
          : "No transactions",
      change: billsTransactions > 0 ? "+5%" : "0%",
      data: [],
      color: "#8B5CF6",
      icon: BillsPaymentIcon,
      hasData: false,
    },
    {
      label: "Giftcards",
      value: formatCurrency(volumes?.giftcards),
      subChange: `${overview?.totalUsers || 0} Users`,
      change: parseFloat(volumes?.giftcards || "0") > 0 ? "+15%" : "0%",
      data: [],
      color: "#22C55E",
      icon: GiftcardsIcon,
      hasData: false,
    },
  ];

  return (
    <div className="space-y-8">
      <PerformanceCard data={dashboardData.data.data} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {miniCards.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
      <TrendCharts data={dashboardData.data.data} />
    </div>
  );
}
