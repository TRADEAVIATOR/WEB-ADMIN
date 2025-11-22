"use client";

import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/ui/Table";
import ResultState from "@/components/ui/ResultState";
import { getCustomers } from "@/lib/api/customers";
import { RowData } from "@/types/common";

interface Wallet {
  depositBalance: string;
  referralBalance: string;
  cashBackBalance: string;
}

interface Customer {
  id: string;
  fullname: string;
  username: string;
  phone: string;
  email: string;
  tier: string;
  createdAt: string;
  isVerified: boolean;
  isKycVerified: boolean;
  wallets: Wallet[];
}

interface DataTableClientProps {
  initialData?: Customer[];
}

interface MenuItem {
  label: string;
  href?: string;
  onClick?: (row: RowData) => void;
  color?: string;
}

export default function DataTableClient({ initialData }: DataTableClientProps) {
  const { data, error, isLoading, refetch } = useQuery<Customer[], Error>({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await getCustomers();
      if (res.error)
        throw new Error((res.error as string) || "Something went wrong");
      return res.data as Customer[];
    },
    initialData,
  });

  if (isLoading)
    return <ResultState type="info" message="Loading customers…" />;

  if (error)
    return (
      <ResultState
        type="error"
        message={
          error instanceof Error ? error.message : "Something went wrong"
        }
        onRetry={() => refetch()}
      />
    );

  if (!data || data.length === 0)
    return <ResultState type="empty" message="No customers available." />;

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

  const rows: RowData[] = data.map((customer) => ({
    id: customer.id,
    fullname: customer.fullname,
    username: customer.username,
    phone: customer.phone,
    email: customer.email,
    depositBalance: customer.wallets[0]?.depositBalance || "0",
    isVerified: customer.isVerified ? "Verified" : "Not Verified",
    isKycVerified: customer.isKycVerified ? "Verified" : "Pending",
    createdAt: new Date(customer.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  const menuItems: MenuItem[] = [
    { label: "View", href: "/dashboard/users/1" },
    { label: "Edit", onClick: (row) => alert(`Editing ${row.fullname}`) },
    {
      label: "Delete",
      color: "text-red-600",
      onClick: (row) => alert(`Deleting ${row.fullname}`),
    },
  ];

  return <DataTable columns={columns} data={rows} menuItems={menuItems} />;
}
