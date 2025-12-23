"use client";

import DataTable from "@/components/ui/Table";

export default function TransactionsTab({
  customerId,
}: {
  customerId: string;
}) {
  const columns = [
    { key: "id", label: "ID" },
    { key: "user", label: "User" },
    { key: "type", label: "Type" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
    { key: "method", label: "Method" },
    { key: "timeframe", label: "Timeframe" },
  ];

  const data = [
    {
      id: customerId,
      user: "Imran Rosheed",
      type: "Crypto",
      amount: "$12,000",
      status: "Successful",
      method: "Auto settlement",
      timeframe: "Sep 7, 2025 - 12:24PM",
    },
    {
      id: "#TA-231002",
      user: "Seiyefa Amakiri",
      type: "Giftcard",
      amount: "$8,500",
      status: "Pending",
      method: "Auto settlement",
      timeframe: "Sep 8, 2025 - 10:00AM",
    },
    {
      id: "#TA-231003",
      user: "David Samson",
      type: "Bills",
      amount: "$10,200",
      status: "Failed",
      method: "Withdrawal",
      timeframe: "Sep 9, 2025 - 09:15AM",
    },
    {
      id: "#TA-231004",
      user: "Adeola Olanrewaju",
      type: "Crypto",
      amount: "$5,600",
      status: "Successful",
      method: "Auto settlement",
      timeframe: "Sep 10, 2025 - 03:40PM",
    },
    {
      id: "#TA-231005",
      user: "Lydia Ogunleye",
      type: "Crypto",
      amount: "$9,000",
      status: "Pending",
      method: "Auto settlement",
      timeframe: "Sep 11, 2025 - 08:10AM",
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
