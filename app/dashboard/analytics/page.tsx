import TrendCharts from "./components/TrendCharts";
import PerformanceCard from "./components/PerformanceCard";
import StatCard from "./components/StatCard";
import CryptoVolumeIcon from "@/assets/icons/crypto-volume.svg";
import BillsPaymentIcon from "@/assets/icons/bills-payment.svg";
import GiftcardsIcon from "@/assets/icons/giftcards.svg";
import { getDashboardGrowth } from "@/lib/api/dashboard";

export default async function AnalyticsPage() {
  const dashboardData = await getDashboardGrowth();

  const { overview, volumes, charts } = dashboardData?.data || {};

  const cryptoMonthlyData = charts?.cryptoVolumeByMonth || [];
  const cryptoValues = cryptoMonthlyData.map((item: any) =>
    parseFloat(item.value || 0)
  );
  const cryptoChange =
    cryptoValues.length >= 2
      ? (
          ((cryptoValues[cryptoValues.length - 1] -
            cryptoValues[cryptoValues.length - 2]) /
            cryptoValues[cryptoValues.length - 2]) *
          100
        ).toFixed(1)
      : "0";

  const billsTransactions =
    charts?.transactionsByType
      ?.filter((t: any) =>
        ["DATA", "ELECTRICITY", "CABLE", "AIRTIME"].includes(t.type)
      )
      .reduce((acc: number, curr: any) => acc + curr.count, 0) || 0;

  const miniCards = [
    {
      label: "Overall Crypto Volume",
      value: `₦${parseFloat(
        overview?.totalCryptoBalance || "0"
      ).toLocaleString()}`,
      subChange: `${cryptoMonthlyData.length} months data`,
      change: `${parseFloat(cryptoChange) >= 0 ? "+" : ""}${cryptoChange}%`,
      data: cryptoValues.length > 0 ? cryptoValues : [0, 0, 0, 0, 0],
      color: "#00A3FF",
      icon: CryptoVolumeIcon,
    },
    {
      label: "Overall Bills Payment",
      value: `₦${parseFloat(volumes?.bills || "0").toLocaleString()}`,
      subChange: `${billsTransactions} Transactions`,
      change: "+5%",
      data: [10, 18, 14, 25, 20, 28, 22, 30, 27],
      color: "#8B5CF6",
      icon: BillsPaymentIcon,
    },
    {
      label: "Giftcards",
      value: `₦${parseFloat(volumes?.giftcards || "0").toLocaleString()}`,
      subChange: `${overview?.totalUsers || 0} Users`,
      change: "+15%",
      data: [8, 15, 12, 20, 17, 25, 22, 18, 24],
      color: "#22C55E",
      icon: GiftcardsIcon,
    },
  ];

  return (
    <div className="space-y-8">
      <PerformanceCard data={dashboardData?.data} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {miniCards.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
      <TrendCharts data={dashboardData?.data} />
    </div>
  );
}
