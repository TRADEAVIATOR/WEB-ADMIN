"use client";

import { useRouter } from "next/navigation";
import { RowData } from "@/types/common";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { DataTableClientProps } from "@/types/props";
import { formatDateTime } from "@/lib/utils/format";
import Badge from "@/components/ui/Badge";

interface Voucher {
  id: string;
  code: string;
  userId: string;
  type: string;
  value: string;
  currency: string;
  isRedeemed: boolean;
  redeemedAt?: string | null;
  createdAt: string;
  expiresAt?: string | null;
  user: {
    id: string;
    fullname: string;
    email: string;
    phone?: string;
  };
}

export default function VoucherDataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<Voucher>) {
  const router = useRouter();

  const columns = [
    { key: "code", label: "Code" },
    { key: "user", label: "User" },
    { key: "email", label: "Email" },
    { key: "type", label: "Type" },
    { key: "value", label: "Value" },
    { key: "currency", label: "Currency" },
    { key: "isRedeemed", label: "Redeemed" },
    { key: "redeemedAt", label: "Redeemed At" },
    { key: "createdAt", label: "Created At" },
    { key: "expiresAt", label: "Expires At" },
  ];

  const rows: RowData[] = initialData.map((voucher) => ({
    id: voucher.id,
    code: voucher.code,
    user: voucher.user?.fullname || "-",
    email: voucher.user?.email || "-",
    type: voucher.type,
    value: voucher.value,
    currency: voucher.currency,
    isRedeemed: (
      <Badge
        text={voucher.isRedeemed ? "Yes" : "No"}
        color={voucher.isRedeemed ? "green" : "red"}
      />
    ),
    redeemedAt: voucher.redeemedAt ? formatDateTime(voucher.redeemedAt) : "-",
    createdAt: formatDateTime(voucher.createdAt),
    expiresAt: voucher.expiresAt ? formatDateTime(voucher.expiresAt) : "-",
  }));

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/voucher?page=${page}`);
  };

  return (
    <>
      <DataTable columns={columns} data={rows} />
      {totalPages > 1 && (
        <Pagination
          currentPage={initialPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
