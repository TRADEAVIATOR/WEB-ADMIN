"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { MenuItem, RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import { formatNaira } from "@/lib/utils/format";
import PageHeader from "@/components/ui/PageHeader";
import { Transaction } from "@/types/models";
import Badge from "@/components/ui/Badge";

export default function DataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<Transaction>) {
  const router = useRouter();
  const currentPage = initialPage;

  const columns = [
    { key: "id", label: "Transaction ID" },
    { key: "userId", label: "User ID" },
    { key: "category", label: "Category" },
    { key: "type", label: "Type" },
    { key: "status", label: "Status" },
    { key: "amount", label: "Amount" },
    { key: "currency", label: "Currency" },
    { key: "recipient", label: "Recipient" },
    { key: "accountNo", label: "Account Number" },
    { key: "meterNo", label: "Meter No." },
    { key: "createdAt", label: "Date" },
  ];

  const rows: RowData[] = initialData.map((tx) => ({
    id: tx.id,
    userId: tx.userId,
    category: tx.category,
    type: tx.type,
    status: (
      <Badge
        text={tx.status}
        color={
          tx.status === "SUCCESS"
            ? "green"
            : tx.status === "PENDING"
            ? "yellow"
            : "red"
        }
      />
    ),
    amount: formatNaira(tx.amount),
    currency: tx.currency.toUpperCase(),
    recipient: tx.recipient || "-",
    accountNo: tx.accountNo || "-",
    meterNo: tx.meterNo || "-",
    createdAt: new Date(tx.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  const menuItems: MenuItem<RowData>[] = [
    {
      label: "View",
      onClick: (row) => router.push(`/dashboard/transactions/${row.id}`),
    },
  ];

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/transactions?page=${page}`);
  };

  return (
    <>
      <PageHeader
        filterFields={[
          {
            label: "Transaction Status",
            name: "status",
            type: "checkbox",
            options: [
              { label: "Successful", value: "successful" },
              { label: "Failed", value: "failed" },
              { label: "Pending", value: "pending" },
            ],
          },
        ]}
      />
      <DataTable columns={columns} data={rows} menuItems={menuItems} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
