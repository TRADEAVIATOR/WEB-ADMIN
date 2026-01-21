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

  const res = await getCustomer(id);

  if (res.error) {
    const message =
      typeof res.error === "string" ? res.error : "Failed to fetch customer.";
    return <ResultState type="error" message={message} />;
  }

  const customer = res.data?.customer;

  if (!customer) {
    return <ResultState type="empty" message="Customer not found." />;
  }

  const statsRes = await getCustomerStats(customer.id);
  const customerStats = statsRes.error ? null : statsRes.data.data;

  const tabs = [
    {
      key: "personal",
      label: "Personal Details",
      content: <PersonalDetailsTab customer={customer} />,
    },
    {
      key: "banking",
      label: "Banking Details",
      content: <BankingDetailsTab customer={customer} />,
    },
    {
      key: "transactions",
      label: "Transactions",
      content: <TransactionsTab customer={customer} />,
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
          userId={customer.id}
          kycStatus={customer.isKycVerified ? "Successful" : "Pending"}
          profilePicture={customer.profilePicture}
          name={customer.fullname}
        />
      }
      tabs={tabs}
    />
  );
}
