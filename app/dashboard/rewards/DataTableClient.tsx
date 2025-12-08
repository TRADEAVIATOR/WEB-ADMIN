"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import { formatNaira } from "@/lib/utils/format";
import { Reward } from "@/types/models";
import Badge from "@/components/ui/Badge";

export default function DataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<Reward>) {
  const router = useRouter();
  const currentPage = initialPage;

  const columns = [
    { key: "id", label: "ID" },
    { key: "user", label: "User" },
    { key: "status", label: "Status" },
    { key: "type", label: "Type" },
    { key: "rewardType", label: "Reward Type" },
    { key: "amount", label: "Amount" },
    { key: "narration", label: "Narration" },
    { key: "createdAt", label: "Created At" },
    { key: "redeemedAt", label: "Redeemed At" },
  ];

  const rows: RowData[] = initialData.map((reward) => ({
    id: reward.id,
    user: reward.user.fullname,
    status: (
      <Badge
        text={reward.status}
        color={
          reward.status === "SUCCESS"
            ? "green"
            : reward.status === "PENDING"
            ? "yellow"
            : "red"
        }
      />
    ),
    type: reward.type,
    rewardType: reward.rewardType,
    amount: formatNaira(reward.amount) || "₦0",
    narration: reward.narration || "-",
    createdAt: new Date(reward.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    redeemedAt: reward.redeemedAt
      ? new Date(reward.redeemedAt).toLocaleString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-",
  }));

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/rewards?page=${page}`);
  };

  return (
    <>
      <DataTable columns={columns} data={rows} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
