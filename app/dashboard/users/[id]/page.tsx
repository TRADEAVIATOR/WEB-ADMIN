"use client";

import DetailLayout from "@/components/layout/DetailLayout";
import PersonalDetailsTab from "./components/PersonalDetailsTab";
import BankingDetailsTab from "./components/BankingDetailsTab";
import UserDetailsHeader from "./components/UserDetailsHeader";
import TransactionsTab from "./components/TransactionsTab";
import StatisticsTab from "./components/StatisticsTab";

export default function UserDetailsPage() {
  const tabs = [
    {
      key: "personal",
      label: "Personal Details",
      content: <PersonalDetailsTab />,
    },
    {
      key: "banking",
      label: "Banking Details",
      content: <BankingDetailsTab />,
    },
    {
      key: "transactions",
      label: "Transactions",
      content: <TransactionsTab />,
    },
    {
      key: "statistics",
      label: "Statistics",
      content: <StatisticsTab />,
    },
  ];

  return (
    <DetailLayout
      header={
        <UserDetailsHeader
          kycStatus="Successful"
          name="Imran Rosheed"
          userId="#TA-231001"
        />
      }
      tabs={tabs}
    />
  );
}
