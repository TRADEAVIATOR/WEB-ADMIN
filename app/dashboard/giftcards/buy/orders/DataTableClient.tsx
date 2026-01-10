"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { DataTableClientProps } from "@/types/props";
import { MenuItem, RowData } from "@/types/common";
import Badge from "@/components/ui/Badge";
import {
  Banknote,
  CheckCircle,
  Clock,
  CreditCard,
  Wallet,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { retryGiftcardOrderClient } from "@/lib/api/giftcards";
import { handleApiError } from "@/lib/utils/errorHandler";
import { formatCurrency } from "@/lib/utils/format";

export default function DataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<any>) {
  const router = useRouter();
  const currentPage = initialPage;

  const columns = [
    { key: "id", label: "ID" },
    { key: "cardType", label: "Gift Card" },
    { key: "cardValue", label: "Value (USD)" },
    { key: "quantity", label: "Qty" },
    { key: "status", label: "Status" },
    { key: "channel", label: "Payment Method" },
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
      order.channel === "WALLET" ? (
        <Wallet size={14} />
      ) : order.channel === "CARD" ? (
        <CreditCard size={14} />
      ) : (
        <Banknote size={14} />
      );

    return {
      id: order.id,
      cardType: order.cardType,
      cardValue: formatCurrency(order.cardValue, {
        currency: "USD",
        locale: "en-US",
      }),
      quantity: order.quantity,
      status: (
        <Badge text={order.status} color={statusColor} icon={statusIcon} />
      ),
      channel: <Badge text={order.channel} color="blue" icon={paymentIcon} />,
      createdAt: new Date(order.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  });

  const handleRetryGiftcardOrder = async (orderId: string) => {
    const toastId = toast.loading("Retrying giftcard order...");
    try {
      const res = await retryGiftcardOrderClient(orderId);

      if (!res.error) {
        toast.success("Giftcard order retried successfully!", { id: toastId });
      } else {
        toast.error(res.message || "Failed to retry giftcard order.", {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.dismiss(toastId);
      handleApiError(error);
    }
  };

  const menuItems: MenuItem<RowData>[] = [
    {
      label: "View",
      onClick: (row) =>
        router.push(`/dashboard/giftcards/buy/orders/${row.id}`),
    },
    {
      label: "Retry",
      onClick: (row) => handleRetryGiftcardOrder(row.id as string),
    },
    {
      label: "Refund",
      onClick: (row) =>
        router.push(`/dashboard/giftcards/buy/orders/${row.id}`),
    },
  ];

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/giftcards/buy/orders?page=${page}`);
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
