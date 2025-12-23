"use client";

import DetailLayout from "@/components/layout/DetailLayout";
import CardDetailsTab from "./components/CardDetailsTab";
import CardTransactionsTab from "./components/CardTransactionsTab";
import VirtualCardHeader from "./components/VirtualCardHeader";

export default function VirtualCardDetailsPage() {
  const tabs = [
    {
      key: "details",
      label: "Card Details",
      content: <CardDetailsTab />,
    },
    {
      key: "transactions",
      label: "Transactions",
      content: <CardTransactionsTab />,
    },
  ];

  return (
    <DetailLayout
      header={
        <VirtualCardHeader
          cardNumber="**** **** **** 5817"
          expiry="01/25"
          cardType="Mastercard"
        />
      }
      tabs={tabs}
    />
  );
}
