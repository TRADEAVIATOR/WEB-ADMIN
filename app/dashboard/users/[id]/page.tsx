import DetailLayout from "@/components/layout/DetailLayout";
import UserDetailsHeader from "./components/UserDetailsHeader";
import PersonalDetailsTab from "./components/PersonalDetailsTab";
import BankingDetailsTab from "./components/BankingDetailsTab";
import TransactionsTab from "./components/TransactionsTab";
import StatisticsTab from "./components/StatisticsTab";
import { getCustomer, getCustomerStats } from "@/lib/api/customers";
import ResultState from "@/components/ui/ResultState";

export const dynamic = "force-dynamic";

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return <ResultState type="error" message="Invalid user ID." showRefresh />;
  }

  const response = await getCustomer(id);

  if (response.error) {
    const message =
      typeof response.error === "string"
        ? response.error
        : "Failed to fetch customer.";
    return <ResultState type="error" message={message} />;
  }

  const { data } = response.data;

  if (!data) {
    return <ResultState type="empty" message="Customer not found." />;
  }

  const statsRes = await getCustomerStats(data.id);
  const customerStats = statsRes.error ? null : statsRes.data.data;

  const tabs = [
    {
      key: "personal",
      label: "Personal Details",
      content: <PersonalDetailsTab customer={data} />,
    },
    {
      key: "banking",
      label: "Banking Details",
      content: <BankingDetailsTab customer={data} />,
    },
    {
      key: "transactions",
      label: "Transactions",
      content: <TransactionsTab customer={data} />,
    },
    {
      key: "statistics",
      label: "Statistics",
      content: <StatisticsTab customerStats={customerStats} />,
    },
  ];

  return (
    <DetailLayout
      header={
        <UserDetailsHeader
          userId={data.id}
          kycStatus={data.isKycVerified ? "Successful" : "Pending"}
          profilePicture={data.profilePicture}
          name={data.fullname}
        />
      }
      tabs={tabs}
    />
  );
}
