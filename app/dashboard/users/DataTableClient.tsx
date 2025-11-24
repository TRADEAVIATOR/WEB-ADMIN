"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { toggleCustomerStatus } from "@/lib/api/customers";
import { RowData, MenuItem } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import { formatNaira } from "@/lib/utils/format";
import { Customer } from "@/types/models";

export default function DataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<Customer>) {
  const router = useRouter();
  const currentPage = initialPage;

  const columns = [
    { key: "fullname", label: "Full Name" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone Number" },
    { key: "depositBalance", label: "Deposit Balance" },
    { key: "isVerified", label: "Verified" },
    { key: "isKycVerified", label: "KYC Status" },
    { key: "createdAt", label: "Date Joined" },
  ];

  const rows: RowData[] = initialData.map((customer) => ({
    id: customer.id,
    fullname: customer.fullname,
    username: customer.username,
    phone: customer.phone,
    email: customer.email,
    depositBalance: formatNaira(customer.wallets[0]?.depositBalance) || "0",
    isVerified: customer.isVerified ? "Verified" : "Not Verified",
    isKycVerified: customer.isKycVerified ? "Verified" : "Pending",
    createdAt: new Date(customer.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  const menuItems: MenuItem<RowData>[] = [
    {
      label: "View",
      onClick: (row) => router.push(`/dashboard/users/${row.id}`),
    },
    {
      label: "Toggle Active",
      color: "text-red-600",
      onClick: (row) => toggleCustomerStatus(String(row.id)),
    },
  ];

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/users?page=${page}`);
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
