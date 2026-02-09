"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { MenuItem, RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import { Dispute } from "@/types/models";
import { updateDisputeStatusClient } from "@/lib/api/disputes";
import {
  HiCheckCircle,
  HiClock,
  HiInformationCircle,
  HiXCircle,
} from "react-icons/hi2";
import toast from "react-hot-toast";
import Badge from "@/components/ui/Badge";
import { handleApiError } from "@/lib/utils/errorHandler";

export default function DataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<Dispute>) {
  const router = useRouter();

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

  const rows: RowData[] = initialData.flatMap((item) => {
    return item.disputes.map((d) => {
      let statusColor: "green" | "yellow" | "red" | "blue" = "yellow";
      let statusIcon: React.ReactNode = null;

      switch (d.status) {
        case "RESOLVED":
          statusColor = "green";
          statusIcon = <HiCheckCircle className="w-4 h-4" />;
          break;

        case "PENDING":
          statusColor = "yellow";
          statusIcon = <HiClock className="w-4 h-4" />;
          break;

        case "IN_REVIEW":
          statusColor = "blue";
          statusIcon = <HiInformationCircle className="w-4 h-4" />;
          break;

        case "REJECTED":
          statusColor = "red";
          statusIcon = <HiXCircle className="w-4 h-4" />;
          break;

        default:
          statusColor = "yellow";
          statusIcon = <HiClock className="w-4 h-4" />;
          break;
      }

      return {
        id: item.id,
        user: item.user?.fullname || "-",
        reason: d.reason || "-",
        status: <Badge text={d.status} color={statusColor} icon={statusIcon} />,
        transactionId: item.id,
        amount: item.amount ? `₦${Number(item.amount).toLocaleString()}` : "-",
        createdAt: item.createdAt
          ? new Date(item.createdAt).toLocaleString()
          : "-",
        updatedAt: item.updatedAt
          ? new Date(item.updatedAt).toLocaleString()
          : "-",
      };
    });
  });

  const DISPUTE_STATUS_OPTIONS = [
    { key: "IN_REVIEW", label: "Mark as In Review", color: "text-blue-600" },
    { key: "RESOLVED", label: "Mark as Resolved", color: "text-green-600" },
    { key: "REJECTED", label: "Reject Dispute", color: "text-red-600" },
  ];

  const handleUpdateDisputeStatus = async (
    transactionId: string,
    status: string,
  ) => {
    const toastId = toast.loading("Updating dispute status...");

    try {
      const res = await updateDisputeStatusClient(transactionId, status);
      if (!res.error) {
        toast.success("Dispute status updated successfully!", { id: toastId });
      } else {
        toast.error(res.message || "Failed to update dispute status.", {
          id: toastId,
        });
      }
    } catch (error: any) {
      handleApiError(error);
    }
  };

  const menuItems: MenuItem<RowData>[] = [
    {
      label: "View",
      onClick: (row) => router.push(`/dashboard/disputes/${row.id}`),
    },
    ...DISPUTE_STATUS_OPTIONS.map((opt) => ({
      label: opt.label,
      color: opt.color,
      onClick: (row) =>
        handleUpdateDisputeStatus(String(row.transactionId), opt.key),
    })),
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
