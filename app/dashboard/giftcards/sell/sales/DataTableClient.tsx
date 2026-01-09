"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { DataTableClientProps } from "@/types/props";
import { MenuItem, RowData } from "@/types/common";
import { GiftCardSale } from "@/types/models";
import { formatCurrency } from "@/lib/utils/format";

export default function DataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<GiftCardSale>) {
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
    { key: "paymentMethod", label: "Payment" },
    { key: "createdAt", label: "Date" },
  ];

  const rows: RowData[] = initialData.map((sale) => ({
    id: sale.id,
    cardImages: sale.cardImages[0] ? (
      <Image
        src={sale.cardImages[0]}
        alt={sale.cardType}
        width={40}
        height={40}
        className="rounded object-cover"
      />
    ) : (
      "N/A"
    ),
    cardType: sale.cardType,
    country: `${sale.country}`,
    cardRange: sale.cardRange,
    cardValue: `${sale.cardCurrency} ${sale.cardValue}`,
    quantity: sale.quantity,
    totalCardValue: `${sale.cardCurrency} ${sale.totalCardValue}`,
    payoutAmount: `${formatCurrency(sale.payoutAmount)}`,
    status: sale.status,
    paymentMethod: sale.paymentMethod,
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
