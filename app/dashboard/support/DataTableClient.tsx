"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import Badge from "@/components/ui/Badge";
import { SupportConversation } from "@/types/models";
import { MenuItem, RowData } from "@/types/common";
import { formatDateTime } from "@/lib/utils/format";

type Props = {
  initialData: SupportConversation[];
  initialPage: number;
  totalPages: number;
};

export default function DataTableClient({
  initialData,
  initialPage,
  totalPages,
}: Props) {
  const router = useRouter();

  const columns = [
    { key: "subject", label: "Subject" },
    { key: "user", label: "Customer" },
    { key: "category", label: "Category" },
    { key: "priority", label: "Priority" },
    { key: "status", label: "Status" },
    { key: "lastMessage", label: "Last Message" },
    { key: "createdAt", label: "Created At" },
  ];

  const rows: RowData[] = initialData.map((conv) => ({
    id: conv.id,
    subject: conv.subject,
    user: conv.user.fullname,
    category: conv.category,
    priority: (
      <Badge
        text={conv.priority}
        color={
          conv.priority === "HIGH"
            ? "red"
            : conv.priority === "MEDIUM"
            ? "yellow"
            : "green"
        }
      />
    ),
    status: (
      <Badge
        text={conv.status}
        color={conv.status === "OPEN" ? "blue" : "green"}
      />
    ),
    lastMessage: formatDateTime(conv.lastMessageAt),

    createdAt: formatDateTime(conv.createdAt),
  }));

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/admin-support?page=${page}`);
  };

  const menuItems: MenuItem<RowData>[] = [
    {
      label: "View",
      onClick: (row) => router.push(`/dashboard/support/${row.id}`),
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
