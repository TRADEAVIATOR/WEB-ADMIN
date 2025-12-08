"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { MenuItem, RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import { Dispute } from "@/types/models";
import { updateDisputeStatusClient } from "@/lib/api/disputes";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Badge from "@/components/ui/Badge";

export default function DataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<Dispute>) {
  const router = useRouter();
  const { data: session } = useSession();

  const currentPage = initialPage;

  const columns = [
    { key: "id", label: "ID" },
    { key: "user", label: "User" },
    { key: "reason", label: "Reason" },
    { key: "status", label: "Status" },
    { key: "transactionId", label: "Transaction ID" },
    { key: "amount", label: "Amount" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
  ];

  const rows: RowData[] = initialData.map((dispute) => ({
    id: dispute.id,
    user: dispute.user?.fullname || "-",
    reason: dispute.narration || "-",
    status: (
      <Badge
        text={dispute.status}
        color={
          dispute.status === "SUCCESS"
            ? "green"
            : dispute.status === "PENDING"
            ? "yellow"
            : "red"
        }
      />
    ),
    transactionId: dispute.transaction?.id || dispute.transactionId || "-",
    amount: dispute.transaction?.amount
      ? `₦${Number(dispute.transaction.amount).toLocaleString()}`
      : "-",
    createdAt: dispute.createdAt
      ? new Date(dispute.createdAt).toLocaleString()
      : "-",
    updatedAt: dispute.updatedAt
      ? new Date(dispute.updatedAt).toLocaleString()
      : "-",
  }));

  const menuItems: MenuItem<RowData>[] = [
    {
      label: "View",
      onClick: (row) => router.push(`/dashboard/disputes/${row.id}`),
    },
    {
      label: "Update Status",
      color: "text-blue-600",
      onClick: async (row) => {
        const token = session?.accessToken;

        if (!token) {
          toast.error("You are not authenticated.");
          return;
        }

        try {
          await updateDisputeStatusClient(
            String(row.transactionId),
            "RESOLVED",
            token
          );
          toast.success("Dispute status updated successfully!");
        } catch (err: any) {
          toast.error(
            err.response?.data?.message || "Failed to update dispute status."
          );
        }
      },
    },
  ];

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/disputes?page=${page}`);
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
