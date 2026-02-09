"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import Badge from "@/components/ui/Badge";
import { RowData } from "@/types/common";

interface UserNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  totalSent: number;
  totalRead: number;
  createdAt: string;
}

interface Props {
  initialData: UserNotification[];
  initialPage: number;
  totalPages: number;
}

export default function DataTableClient({
  initialData,
  initialPage,
  totalPages,
}: Props) {
  const router = useRouter();

  const columns = [
    { key: "title", label: "Title" },
    { key: "type", label: "Type" },
    { key: "priority", label: "Priority" },
    { key: "totalSent", label: "Sent" },
    { key: "totalRead", label: "Read" },
    { key: "message", label: "Message" },
    { key: "createdAt", label: "Date" },
  ];

  const rows: RowData[] = initialData.map((notification) => {
    const priority = notification.priority ?? "low";

    return {
      id: notification.id,
      title: notification.title,
      type: <Badge text={notification.type} color="blue" />,

      priority: (
        <Badge
          text={priority.toUpperCase()}
          color={
            priority === "high"
              ? "red"
              : priority === "medium"
                ? "orange"
                : "green"
          }
        />
      ),

      totalSent: notification.totalSent ?? 0,
      totalRead: notification.totalRead ?? 0,

      message: (
        <span className="line-clamp-2 max-w-xs">{notification.message}</span>
      ),

      createdAt: new Date(notification.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
  });

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/notifications/user-specific?page=${page}`);
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
