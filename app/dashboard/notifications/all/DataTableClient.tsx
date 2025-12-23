"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import Badge from "@/components/ui/Badge";
import { RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";

export default function DataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<any>) {
  const router = useRouter();

  const columns = [
    { key: "user", label: "User" },
    { key: "title", label: "Title" },
    { key: "type", label: "Type" },
    { key: "isRead", label: "Read" },
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

  const rows: RowData[] = initialData.map((n: any) => ({
    id: n.id,
    user: (
      <div className="break-words">
        <p className="font-medium">{n.user?.fullname}</p>
        <p className="text-xs text-gray-500">{n.user?.email}</p>
      </div>
    ),
    title: (
      <div className="break-words max-w-[200px] sm:max-w-xs">
        <p className="font-medium">{n.title}</p>
        <p className="text-xs text-gray-500">{n.message}</p>
      </div>
    ),
    type: <Badge text={n.type} color="blue" />,
    isRead: (
      <Badge
        text={n.isRead ? "Read" : "Unread"}
        color={n.isRead ? "green" : "yellow"}
      />
    ),
    createdAt: formatDate(n.createdAt),
  }));

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/notifications/all?page=${page}`);
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
