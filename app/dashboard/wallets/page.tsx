import PageHeader from "@/components/ui/PageHeader";
import ResultState from "@/components/ui/ResultState";
import { getWallets } from "@/lib/api/wallets";
import AdminWalletActions from "./AdminWalletActions";
import { formatCurrency } from "@/lib/utils/format";

export const dynamic = "force-dynamic";

export default async function WalletsPage() {
  const res = await getWallets();

  let content;

  if (!res || res.error) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch wallets."
        showRefresh
      />
    );
  } else {
    const payload = res.data?.data?.data;

    if (!payload) {
      content = (
        <ResultState
          type="error"
          message="Invalid server response. Please try again later."
        />
      );
    } else {
      content = (
        <>
          <section className="mb-12 p-6 bg-white rounded-lg shadow-md">
            <PageHeader
              title="GiftBills Wallet"
              description="View GiftBills account balance and earnings"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <StatCard
                title="Balance"
                value={formatCurrency(payload.balance)}
                color="blue"
              />
              <StatCard
                title="Earnings"
                value={formatCurrency(payload.earning)}
                color="green"
              />
              <StatCard
                title="Cashback"
                value={formatCurrency(payload.cashback)}
                color="orange"
              />
              <StatCard title="Points" value={payload.point} color="purple" />
              <StatCard
                title="SMS Units"
                value={payload.sms_units}
                color="teal"
              />
              <StatCard
                title="MTN CG"
                value={formatCurrency(payload.mtn_cg)}
                color="yellow"
              />
              <StatCard
                title="MTN SME"
                value={formatCurrency(payload.mtn_sme)}
                color="red"
              />
              <StatCard
                title="Airtel CG"
                value={formatCurrency(payload.airtel_cg)}
                color="indigo"
              />
            </div>
          </section>

          <hr className="my-12 border-gray-300" />

          <section className="p-6 bg-gray-50 rounded-lg shadow-md">
            <PageHeader
              title="Admin Wallet Actions"
              description="Manage system wallets and perform administrative actions"
            />
            <AdminWalletActions />
          </section>
        </>
      );
    }
  }

  return <>{content}</>;
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color?: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-800",
    green: "bg-green-50 text-green-800",
    orange: "bg-orange-50 text-orange-800",
    purple: "bg-purple-50 text-purple-800",
    teal: "bg-teal-50 text-teal-800",
    yellow: "bg-yellow-50 text-yellow-800",
    red: "bg-red-50 text-red-800",
    indigo: "bg-indigo-50 text-indigo-800",
    gray: "bg-gray-50 text-gray-800",
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-sm flex flex-col items-center justify-center ${colorMap[color || "gray"]}`}>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}
