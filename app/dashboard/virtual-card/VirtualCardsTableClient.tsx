"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import Badge from "@/components/ui/Badge";
import { RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import { formatCurrency } from "@/lib/utils/format";

type VirtualCard = {
  id: string;
  cardId: string;
  customer: string;
  type: string;
  brand: string;
  currency: string;
  maskedPan: string;
  expiryMonth: string;
  expiryYear: string;
  status: string;
  availableBalance: number;
  createdAt: string;
  user: {
    fullname: string;
    email: string;
    username: string;
  };
};

export default function VirtualCardsTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<VirtualCard>) {
  const router = useRouter();

  const columns = [
    { key: "user", label: "User" },
    { key: "brand", label: "Brand" },
    { key: "maskedPan", label: "Card" },
    { key: "status", label: "Status" },
    { key: "balance", label: "Balance" },
    { key: "createdAt", label: "Created" },
  ];

  const rows: RowData[] = initialData.map((card) => ({
    id: card.id,

    user: (
      <div>
        <div className="font-medium">{card.user.fullname}</div>
        <div className="text-xs text-gray-500">{card.user.email}</div>
      </div>
    ),

    brand: <Badge text={card.brand} color="blue" />,

    maskedPan: card.maskedPan,

    status: (
      <Badge
        text={card.status}
        color={card.status === "active" ? "green" : "gray"}
      />
    ),

    balance: formatCurrency(card.availableBalance),

    createdAt: new Date(card.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/virtual-cards?page=${page}`);
  };

  return (
    <>
      <DataTable columns={columns} data={rows} />
      <Pagination
        currentPage={initialPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
