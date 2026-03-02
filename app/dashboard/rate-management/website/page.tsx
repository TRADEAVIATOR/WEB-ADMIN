import CryptoRatesManager from "./components/CryptoRatesManager";
import GiftCardRatesManager from "./components/GiftCardRatesManager";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = { title: "Rate Management – TradeAviator Admin" };

export default function RatesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Rate Management"
        description="Manage crypto and gift card rates in real time"
        enableSearch={false}
      />

      <StatsBar />

      <CryptoRatesManager />
      <GiftCardRatesManager />
    </div>
  );
}

function StatsBar() {
  const stats = [
    { label: "Crypto Assets", value: "8", color: "text-primary" },
    { label: "Gift Card Types", value: "12+", color: "text-secondary" },
    { label: "Last Updated", value: "Just now", color: "text-green-600" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl bg-white border border-gray-100 shadow-sm p-4">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
            {s.label}
          </p>
          <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
        </div>
      ))}
    </div>
  );
}
