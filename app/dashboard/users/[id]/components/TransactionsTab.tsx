"use client";

import ResultState from "@/components/ui/ResultState";
import DataTable from "@/components/ui/Table";
import { Customer } from "@/types/models";

export default function TransactionsTab({ customer }: { customer: Customer }) {
  if (!customer.transactions || customer.transactions.length === 0) {
    return <ResultState type="empty" message="No transactions found." />;
  }

  const columns = [
    { key: "id", label: "ID" },
    { key: "type", label: "Type" },
    { key: "category", label: "Category" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
    { key: "method", label: "Method" },
    { key: "timeframe", label: "Timeframe" },
  ];

  const data =
    customer.transactions?.map((tx) => ({
      id: tx.id,
      type: tx.type,
      category: tx.category,
      amount: `$${Number(tx.amount).toLocaleString()}`,
      status: tx.status.charAt(0) + tx.status.slice(1).toLowerCase(),
      method: tx.channel,
      timeframe: new Date(tx.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    })) || [];

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
