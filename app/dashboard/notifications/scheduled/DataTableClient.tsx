"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import Badge from "@/components/ui/Badge";
import { DataTableClientProps } from "@/types/props";
import { MenuItem, RowData } from "@/types/common";
import toast from "react-hot-toast";
import { cancelScheduledNotification } from "@/lib/api/notifications";
import { handleApiError } from "@/lib/utils/errorHandler";
import { ScheduledNotification } from "@/types/models";

export default function DataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<ScheduledNotification>) {
  const router = useRouter();

  const columns = [
    { key: "title", label: "Title" },
    { key: "type", label: "Type" },
    { key: "priority", label: "Priority" },
    { key: "status", label: "Status" },
    { key: "recurring", label: "Recurring" },
    { key: "scheduledFor", label: "Scheduled For" },
    { key: "createdAt", label: "Created At" },
  ];

  const formatDate = (value: string) =>
    new Date(value).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const rows: RowData[] = initialData.map((n) => ({
    id: n.id,
    title: n.title,
    type: <Badge text={n.type} color="blue" />,
    priority: <Badge text={n.priority} color="yellow" />,
    status: <Badge text={n.status} color="green" />,
    recurring: n.isRecurring ? "Yes" : "No",
    scheduledFor: formatDate(n.scheduledFor),
    createdAt: formatDate(n.createdAt),
  }));

  const handleCancelScheduledNotification = async (scheduleId: string) => {
    const toastId = toast.loading("Canceling scheduled notification...");

    try {
      await cancelScheduledNotification(scheduleId);

      toast.success("Scheduled notification canceled successfully!", {
        id: toastId,
      });

      router.refresh();
    } catch (error: any) {
      handleApiError(error);
    }
  };

  const menuItems: MenuItem<RowData>[] = [
    {
      label: "Edit",
      onClick: (row: any) =>
        router.push(`/dashboard/notifications/scheduled/${row.id}/edit`),
    },
    {
      label: "Cancel",
      color: "text-red-600",
      onClick: (row) => handleCancelScheduledNotification(String(row.id)),
    },
  ];

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/notifications/scheduled?page=${page}`);
  };

  return (
    <>
      <DataTable columns={columns} data={rows} menuItems={menuItems} />
      <Pagination
        currentPage={initialPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
