"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { DataTableClientProps } from "@/types/props";
import { MenuItem, RowData } from "@/types/common";
import { GiftCardOrder } from "@/types/models";
import Badge from "@/components/ui/Badge";
import { formatNaira } from "@/lib/utils/format";
import {
  Banknote,
  CheckCircle,
  Clock,
  CreditCard,
  Wallet,
  XCircle,
} from "lucide-react";

export default function DataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<GiftCardOrder>) {
  const router = useRouter();
  const currentPage = initialPage;

  const columns = [
    { key: "orderReference", label: "Reference" },
    { key: "cardType", label: "Gift Card" },
    { key: "country", label: "Country" },
    { key: "denomination", label: "Amount" },
    { key: "cardTotal", label: "Total Price" },
    { key: "status", label: "Status" },
    { key: "paymentMethod", label: "Payment Method" },
    { key: "createdAt", label: "Date" },
  ];

  const rows: RowData[] = initialData.map((order) => {
    const statusIcon =
      order.status === "SUCCESS" ? (
        <CheckCircle size={14} />
      ) : order.status === "PENDING" ? (
        <Clock size={14} />
      ) : (
        <XCircle size={14} />
      );

    const statusColor =
      order.status === "SUCCESS"
        ? "green"
        : order.status === "PENDING"
        ? "yellow"
        : "red";

    const paymentIcon =
      order.paymentMethod === "WALLET" ? (
        <Wallet size={14} />
      ) : order.paymentMethod === "CARD" ? (
        <CreditCard size={14} />
      ) : (
        <Banknote size={14} />
      );

    return {
      id: order.id,
      orderReference: order.orderReference,
      cardType: order.cardType,
      country: order.country,
      denomination: order.denomination,
      cardTotal: formatNaira(order.cardTotal),

      status: (
        <Badge text={order.status} color={statusColor} icon={statusIcon} />
      ),

      paymentMethod: (
        <Badge text={order.paymentMethod} color="blue" icon={paymentIcon} />
      ),

      createdAt: new Date(order.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
  });

  const menuItems: MenuItem<RowData>[] = [
    {
      label: "View",
      onClick: (row) =>
        router.push(`/dashboard/giftcards/sell/orders/${row.id}`),
    },
  ];

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/giftcards/sell/orders?page=${page}`);
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
