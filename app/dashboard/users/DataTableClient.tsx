"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";
import Pagination from "@/components/ui/Pagination";
import { toggleCustomerStatusClient } from "@/lib/api/customers";
import { RowData, MenuItem } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import { formatCurrency } from "@/lib/utils/format";
import { handleApiError } from "@/lib/utils/errorHandler";
import { Customer } from "@/types/models";
import Badge from "@/components/ui/Badge";
import toast from "react-hot-toast";

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
    depositBalance: formatCurrency(customer.wallets[0]?.depositBalance) || "0",
    isVerified: customer.isVerified ? (
      <Badge text="Verified" color="green" icon={<HiCheckCircle size={14} />} />
    ) : (
      <Badge text="Not Verified" color="red" icon={<HiXCircle size={14} />} />
    ),
    isKycVerified: customer.isKycVerified ? (
      <Badge text="Verified" color="green" icon={<HiCheckCircle size={14} />} />
    ) : (
      <Badge text="Pending" color="yellow" icon={<HiXCircle size={14} />} />
    ),
    createdAt: new Date(customer.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  const handleToggleCustomerStatus = async (customerId: string) => {
    const toastId = toast.loading("Updating customer status...");

    try {
      const res = await toggleCustomerStatusClient(customerId);
      if (!res.error) {
        toast.success("Customer status updated successfully!", { id: toastId });
      } else {
        toast.error(res.message || "Failed to update customer status.", {
          id: toastId,
        });
      }
    } catch (error: any) {
      handleApiError(error);
    }
  };

  const menuItems: MenuItem<RowData>[] = [
    {
      label: "View",
      onClick: (row) => router.push(`/dashboard/users/${row.id}`),
    },
    {
      label: "Toggle Active",
      color: "text-red-600",
      onClick: (row) => handleToggleCustomerStatus(String(row.id)),
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
