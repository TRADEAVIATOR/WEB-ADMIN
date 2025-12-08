"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { MenuItem, RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import { Dispute } from "@/types/models";
import { updateDisputeStatusClient } from "@/lib/api/disputes";
import { HiCheckCircle, HiClock, HiXCircle } from "react-icons/hi2";
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
  const token = session?.accessToken ?? "";

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

  const rows: RowData[] = initialData.map((dispute) => {
    let statusColor: "green" | "yellow" | "red";
    let statusIcon: React.ReactNode = null;

    switch (dispute.status) {
      case "SUCCESS":
        statusColor = "green";
        statusIcon = <HiCheckCircle className="w-4 h-4" />;
        break;
      case "PENDING":
        statusColor = "yellow";
        statusIcon = <HiClock className="w-4 h-4" />;
        break;
      case "FAILED":
      case "CANCELLED":
        statusColor = "red";
        statusIcon = <HiXCircle className="w-4 h-4" />;
        break;
      default:
        statusColor = "yellow";
    }

    return {
      id: dispute.id,
      user: dispute.user?.fullname || "-",
      reason: dispute.narration || "-",
      status: (
        <Badge text={dispute.status} color={statusColor} icon={statusIcon} />
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
    };
  });

  const handleUpdateDisputeStatus = async (
    transactionId: string,
    status: string
  ) => {
    const toastId = toast.loading("Updating dispute status...");

    try {
      const res = await updateDisputeStatusClient(transactionId, status, token);
      if (!res.error) {
        toast.success("Dispute status updated successfully!", { id: toastId });
      } else {
        toast.error(res.message || "Failed to update dispute status.", {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred.", { id: toastId });
    }
  };

  const menuItems: MenuItem<RowData>[] = [
    {
      label: "View",
      onClick: (row) => router.push(`/dashboard/disputes/${row.id}`),
    },
    {
      label: "Update Status",
      color: "text-blue-600",
      onClick: (row) =>
        handleUpdateDisputeStatus(String(row.transactionId), "RESOLVED"),
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
