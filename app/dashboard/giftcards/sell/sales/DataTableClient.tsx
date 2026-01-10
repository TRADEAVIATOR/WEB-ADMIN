"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { DataTableClientProps } from "@/types/props";
import { MenuItem, RowData } from "@/types/common";
import { formatCurrency } from "@/lib/utils/format";
import Badge from "@/components/ui/Badge";

export default function DataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<any>) {
  const router = useRouter();
  const currentPage = initialPage;

  const columns = [
    { key: "cardImages", label: "Image" },
    { key: "cardType", label: "Giftcard" },
    { key: "country", label: "Country" },
    { key: "cardRange", label: "Range" },
    { key: "cardValue", label: "Value" },
    { key: "quantity", label: "Qty" },
    { key: "totalCardValue", label: "Total Value" },
    { key: "payoutAmount", label: "Payout" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Date" },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "SUCCESS":
        return "green";
      case "FAILED":
        return "red";
      case "PENDING":
        return "yellow";
      case "ACTIVE":
        return "blue";
      default:
        return "gray";
    }
  };

  const rows: RowData[] = initialData.map((sale) => ({
    id: sale.id,
    cardImages: sale.images?.[0] ? (
      <Image
        src={sale.images[0]}
        alt={sale.cardType}
        width={40}
        height={40}
        className="rounded object-cover"
      />
    ) : (
      "N/A"
    ),
    cardType: sale.cardType,
    country: sale.country,
    cardRange: sale.cardRange,
    cardValue: formatCurrency(sale.cardValue, {
      currency: "USD",
      locale: "en-US",
    }),
    totalCardValue: formatCurrency(sale.cardValue * sale.quantity, {
      currency: "USD",
      locale: "en-US",
    }),
    payoutAmount: `${formatCurrency(sale.payoutAmount)}`,
    status: <Badge text={sale.status} color={getStatusColor(sale.status)} />,
    createdAt: new Date(sale.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  const menuItems: MenuItem<RowData>[] = [
    {
      label: "View",
      onClick: (row) =>
        router.push(`/dashboard/giftcards/sell/sales/${row.id}`),
    },
  ];

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/giftcards/sell/sales?page=${page}`);
  };

  return (
    <>
      <DataTable columns={columns} data={rows} menuItems={menuItems} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
