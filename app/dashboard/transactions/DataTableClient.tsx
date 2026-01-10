"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { MenuItem, RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import { formatCurrency, formatDateTime } from "@/lib/utils/format";
import PageHeader from "@/components/ui/PageHeader";
import { Transaction } from "@/types/models";
import Badge from "@/components/ui/Badge";
import { TransactionCategory } from "@/types/enums";

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
    { key: "createdAt", label: "Date" },
  ];

  const categoryColorMap: Record<
    TransactionCategory,
    "green" | "yellow" | "red" | "blue"
  > = {
    DEPOSIT: "green",
    OUTWARDS: "yellow",
    WITHDRAWAL: "red",
    TRANSFER: "blue",
    REVERSAL: "red",
    GIFTCARDS: "blue",
    CRYPTO: "yellow",
    DATA: "blue",
    AIRTIME: "blue",
    CABLE: "blue",
    SPORTS: "blue",
    ELECTRICITY: "yellow",
    EVENTS: "green",
    EDUCATION: "green",
    CASHBACK: "green",
    REFERRAL_BONUS: "green",
    CARD_CREATION: "blue",
    VOUCHER: "blue",
    CARD_FUNDING: "green",
    P2P: "blue",
  };

  const rows: RowData[] = initialData.map((tx) => ({
    id: tx.id,
    userId: tx.userId,
    category: (
      <Badge
        text={tx.category}
        color={categoryColorMap[tx.category as TransactionCategory] || "gray"}
      />
    ),
    type: (
      <Badge text={tx.type} color={tx.type === "CREDIT" ? "green" : "red"} />
    ),
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
    amount:
      tx.category?.toUpperCase() === "CRYPTO"
        ? formatCurrency(tx.amount, { currency: "USD", locale: "en-US" })
        : formatCurrency(tx.amount, { currency: tx.currency }),
    currency: tx.currency.toUpperCase(),
    recipient: tx.recipient || "-",
    createdAt: formatDateTime(tx.createdAt),
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
        title="Transactions"
        description="View and manage all user transactions"
        filterFields={[
          {
            label: "Transaction Status",
            name: "status",
            type: "checkbox",
            options: [
              { label: "Successful", value: "SUCCESS" },
              { label: "Failed", value: "FAILED" },
              { label: "Pending", value: "PENDING" },
            ],
          },
        ]}
      />

      <DataTable
        columns={columns}
        data={rows}
        menuItems={menuItems}
        modalKey={"view-transaction-details"}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
