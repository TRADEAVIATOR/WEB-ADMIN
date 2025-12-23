import TrendCharts from "./components/TrendCharts";
import PerformanceCard from "./components/PerformanceCard";
import StatCard from "./components/StatCard";
import CryptoVolumeIcon from "@/assets/icons/crypto-volume.svg";
import BillsPaymentIcon from "@/assets/icons/bills-payment.svg";
import GiftcardsIcon from "@/assets/icons/giftcards.svg";

export default async function AnalyticsPage() {
  const miniCards = [
    {
      label: "Overall Crypto Volume",
      value: "₦1,000,000",
      subChange: "+₦120,000",
      change: "+10%",
      data: [5, 12, 8, 20, 10, 18, 25, 15, 22],
      color: "#00A3FF",
      icon: CryptoVolumeIcon,
    },
    {
      label: "Overall Bills Payment",
      value: "₦1,000,000",
      subChange: "+120 Transactions",
      change: "+5%",
      data: [10, 18, 14, 25, 20, 28, 22, 30, 27],
      color: "#8B5CF6",
      icon: BillsPaymentIcon,
    },
    {
      label: "Giftcards",
      value: "₦1,000,000",
      subChange: "+120 Users",
      change: "+15%",
      data: [8, 15, 12, 20, 17, 25, 22, 18, 24],
      color: "#22C55E",
      icon: GiftcardsIcon,
    },
  ];

  return (
    <div className="space-y-8">
      <PerformanceCard />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {miniCards.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
      <TrendCharts />
    </div>
  );
}
