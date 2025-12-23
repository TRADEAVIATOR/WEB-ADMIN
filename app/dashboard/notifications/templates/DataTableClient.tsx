"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { deleteNotificationTemplateClient } from "@/lib/api/notifications";
import { handleApiError } from "@/lib/utils/errorHandler";
import Badge from "@/components/ui/Badge";
import { MenuItem, RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import { NotificationTemplate } from "@/types/models";
import toast from "react-hot-toast";

export default function DataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<NotificationTemplate>) {
  const router = useRouter();

  const columns = [
    { key: "name", label: "Template Name" },
    { key: "title", label: "Title" },
    { key: "type", label: "Type" },
    { key: "priority", label: "Priority" },
    { key: "variables", label: "Variables" },
    { key: "status", label: "Status" },
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

  const rows: RowData[] = initialData.map((t) => ({
    id: t.id,
    name: t.name,
    title: t.title,
    type: <Badge text={t.type} color="blue" />,
    priority: <Badge text={t.priority} color="yellow" />,
    variables: t.variables?.length ? t.variables.join(", ") : "—",
    status: (
      <Badge
        text={t.isActive ? "Active" : "Inactive"}
        color={t.isActive ? "green" : "gray"}
      />
    ),
    createdAt: formatDate(t.createdAt),
  }));

  const handleDeleteNotificationTemplate = async (templateId: string) => {
    const toastId = toast.loading("Deleting notification template...");

    try {
      await deleteNotificationTemplateClient(templateId);

      toast.success("Notification template deleted successfully!", {
        id: toastId,
      });

      router.refresh();
    } catch (error: any) {
      handleApiError(error);
    }
  };

  const menuItems: MenuItem<RowData>[] = [
    {
      label: "View",
      onClick: (row) =>
        router.push(`/dashboard/notifications/templates/${row.id}`),
    },
    {
      label: "Edit",
      onClick: (row: any) =>
        router.push(`/dashboard/notifications/templates/${row.id}/edit`),
    },
    {
      label: "Delete",
      color: "text-red-600",
      onClick: (row) => handleDeleteNotificationTemplate(String(row.id)),
    },
  ];

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/notifications/templates?page=${page}`);
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
