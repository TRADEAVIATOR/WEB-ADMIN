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
  isRead: boolean;
  createdAt: string;
  user: {
    fullname: string;
    email: string;
  };
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
    { key: "user", label: "User" },
    { key: "message", label: "Message" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Date" },
  ];

  const rows: RowData[] = initialData.map((notification) => ({
    id: notification.id,

    title: notification.title,

    type: <Badge text={notification.type} color="blue" />,

    user: (
      <div className="flex flex-col">
        <span className="font-medium">{notification.user.fullname}</span>
        <span className="text-xs text-gray-500">{notification.user.email}</span>
      </div>
    ),

    message: (
      <span className="line-clamp-2 max-w-xs">{notification.message}</span>
    ),

    status: (
      <Badge
        text={notification.isRead ? "Read" : "Unread"}
        color={notification.isRead ? "green" : "gray"}
      />
    ),

    createdAt: new Date(notification.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

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
