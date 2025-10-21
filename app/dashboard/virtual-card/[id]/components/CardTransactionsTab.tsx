"use client";

import DataTable from "@/components/ui/Table";

export default function CardTransactionsTab() {
  const columns = [
    { key: "id", label: "ID" },
    { key: "user", label: "User" },
    { key: "type", label: "Type" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
  ];

  const data = [
    {
      id: "#TA-231001",
      user: "Imran Rosheed",
      type: "Crypto",
      amount: "$12,000",
      status: "Successful",
      date: "Sep 7, 2025 - 12:24PM",
    },
    {
      id: "#TA-231002",
      user: "Seiyefa Amakiri",
      type: "Giftcard",
      amount: "$8,500",
      status: "Pending",
      date: "Sep 8, 2025 - 10:00AM",
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
