"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import Badge from "@/components/ui/Badge";
import { MenuItem, RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import {
  deleteAdminNotification,
  markNotificationAsRead,
} from "@/lib/api/notifications";
import toast from "react-hot-toast";
import { handleApiError } from "@/lib/utils/errorHandler";

type AdminNotification = {
  id: string;
  type: string;
  priority: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export default function DataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<AdminNotification>) {
  const router = useRouter();

  const columns = [
    { key: "title", label: "Title" },
    { key: "type", label: "Type" },
    { key: "priority", label: "Priority" },
    { key: "message", label: "Message" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Date" },
  ];

  const rows: RowData[] = initialData.map((notification) => ({
    id: notification.id,
    title: notification.title,

    type: <Badge text={notification.type} color="blue" />,

    priority: <Badge text={notification.priority} color="orange" />,

    message: notification.message,

    status: (
      <Badge text={notification.isRead ? "Read" : "Unread"} color="gray" />
    ),

    createdAt: new Date(notification.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/admin-notifications?page=${page}`);
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);

      toast.success("Notification marked as read");
      router.refresh();
    } catch (error: any) {
      handleApiError(error);
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      await deleteAdminNotification(notificationId);

      toast.success("Notification deleted");
      router.refresh();
    } catch (error: any) {
      handleApiError(error);
    }
  };

  const menuItems: MenuItem<RowData>[] = [
    {
      label: "Mark as Read",
      onClick: (row) => handleMarkAsRead(String(row.id)),
    },
    {
      label: "Delete",
      color: "text-red-600",
      onClick: (row) => handleDeleteNotification(String(row.id)),
    },
  ];

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
