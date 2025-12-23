"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import Badge from "@/components/ui/Badge";
import { RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";

type BroadcastNotification = {
  id: string;
  title: string;
  type: string;
  priority: string;
  targetAudience: string;
  totalSent: number;
  totalRead: number;
  createdAt: string;
};

export default function DataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<BroadcastNotification>) {
  const router = useRouter();

  const columns = [
    { key: "title", label: "Title" },
    { key: "type", label: "Type" },
    { key: "priority", label: "Priority" },
    { key: "audience", label: "Audience" },
    { key: "sent", label: "Sent" },
    { key: "read", label: "Read" },
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
    audience: <Badge text={n.targetAudience} color="gray" />,
    sent: n.totalSent,
    read: n.totalRead,
    createdAt: formatDate(n.createdAt),
  }));

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/notifications/broadcasts?page=${page}`);
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
