import ActivityTable from "./components/ActivityTable";
import ChartCard from "./components/ChartCard";
import LeaderboardCard from "./components/LeaderboardCard";
import PieChartCard from "./components/PieChartCard";
import StatCard from "./components/StatCard";

export default function DashboardPage() {
  const stats = [
    { label: "Total Users", value: "202,078", change: "+5%" },
    { label: "User Balance", value: "$120,000", change: "+$120,000" },
    {
      label: "Overall Bills Payment",
      value: "₦22,078,000,000",
      change: "+$120,000",
    },
    { label: "Total Crypto Volume", value: "$78,000,000", change: "+$120,000" },
  ];

  const activities = [
    {
      id: 1,
      description: "$300 wallet topup from @rosheed",
      details: "Wallet top completed via bank deposit",
      time: "3 min ago",
    },
    {
      id: 2,
      description: "$300 wallet topup from @rosheed",
      details: "Wallet top completed via bank deposit",
      time: "3 min ago",
    },
    {
      id: 3,
      description: "$300 wallet topup from @rosheed",
      details: "Wallet top completed via bank deposit",
      time: "3 min ago",
    },
    {
      id: 4,
      description: "$300 wallet topup from @rosheed",
      details: "Wallet top completed via bank deposit",
      time: "3 min ago",
    },
    {
      id: 5,
      description: "$300 wallet topup from @rosheed",
      details: "Wallet top completed via bank deposit",
      time: "3 min ago",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#101928]">
          Welcome back, <span className="text-primary">Big Brain</span>
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Here’s what’s happening on{" "}
          <span className="font-medium text-secondary">TradeAviator</span> today
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            data={[5, 8, 12, 9, 15, 20]}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <ChartCard
          title="Total Transactions"
          type="line"
          className="lg:col-span-8"
        />
        <ActivityTable
          title="Recent Activities"
          data={activities}
          className="lg:col-span-4"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <LeaderboardCard title="Leaderboard" className="lg:col-span-8" />
        <PieChartCard
          title="Virtual Card Analytics"
          className="lg:col-span-4"
        />
      </div>
    </div>
  );
}
