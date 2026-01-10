"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { RowData } from "@/types/common";
import Badge from "@/components/ui/Badge";

type Admin = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  isAdmin: boolean;
  isSuper: boolean;
};

type DataTableClientProps = {
  initialData: Admin[];
  initialPage: number;
  totalPages: number;
};

export default function DataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps) {
  const router = useRouter();

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "createdAt", label: "Date Added" },
  ];

  const rows: RowData[] = initialData.map((admin) => ({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: (
      <Badge
        text={admin.isSuper ? "Super Admin" : "Admin"}
        color={admin.isSuper ? "purple" : "blue"}
      />
    ),
    createdAt: new Date(admin.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/admins?page=${page}`);
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
