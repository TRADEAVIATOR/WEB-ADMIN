"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Badge from "@/components/ui/Badge";
import ResultState from "@/components/ui/ResultState";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { formatCurrency } from "@/lib/utils/format";
import { Customer } from "@/types/models";

export default function TransactionsTab({ customer }: { customer: Customer }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page") || 1);

  if (!customer.transactions || customer.transactions.length === 0) {
    return <ResultState type="empty" message="No transactions found." />;
  }

  const totalPages = Math.ceil(Number(customer.totalTransactions) / 50);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "type", label: "Type" },
    { key: "category", label: "Category" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
    { key: "method", label: "Method" },
    { key: "timeframe", label: "Timeframe" },
  ];

  const data = customer.transactions.map((tx) => {
    const typeColor =
      tx.type === "CREDIT" ? "green" : tx.type === "DEBIT" ? "red" : "gray";

    return {
      id: tx.id,
      type: <Badge text={tx.type} color={typeColor} />,
      category: <Badge text={tx.category} color="blue" />,
      amount: formatCurrency(Number(tx.amount) || 0),
      status: <Badge text={tx.status} color="green" />,
      method: tx.channel,
      timeframe: new Date(tx.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  });

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={data} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
