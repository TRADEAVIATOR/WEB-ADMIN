"use client";

import {
  HiClock,
  HiCheckCircle,
  HiXCircle,
  HiInformationCircle,
} from "react-icons/hi2";
import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import { formatCurrency, formatDateTime } from "@/lib/utils/format";
import { Reward } from "@/types/models";
import Badge, { colorClasses } from "@/components/ui/Badge";
import { FaBan } from "react-icons/fa";

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

  const getRewardStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return { color: "yellow", icon: <HiClock className="w-4 h-4" /> };
      case "ACTIVE":
        return {
          color: "blue",
          icon: <HiInformationCircle className="w-4 h-4" />,
        };
      case "REDEEMED":
        return { color: "green", icon: <HiCheckCircle className="w-4 h-4" /> };
      case "EXPIRED":
        return { color: "red", icon: <HiXCircle className="w-4 h-4" /> };
      case "CANCELLED":
        return { color: "red", icon: <FaBan className="w-4 h-4" /> };
      default:
        return { color: "yellow", icon: null };
    }
  };

  const getRewardTypeBadge = (type: string) => {
    switch (type) {
      case "CASHBACK":
        return { color: "green" };
      case "VOUCHER":
        return { color: "blue" };
      case "REFERRAL_BONUS":
        return { color: "purple" };
      case "PROMOTIONAL":
        return { color: "yellow" };
      case "CONTEST_WIN":
        return { color: "pink" };
      default:
        return { color: "gray" };
    }
  };

  const getTypeBadge = (type: string) => {
    return {
      color: type === "CREDIT" ? "green" : "red",
    };
  };

  const rows: RowData[] = initialData.map((reward) => {
    const statusMeta = getRewardStatusBadge(reward.status);
    const rewardTypeMeta = getRewardTypeBadge(reward.rewardType);
    const typeMeta = getTypeBadge(reward.type);

    return {
      id: reward.id,
      user: reward.user.fullname,

      status: (
        <Badge
          text={reward.status}
          color={statusMeta.color as keyof typeof colorClasses}
          icon={statusMeta.icon}
        />
      ),

      type: (
        <Badge
          text={reward.type}
          color={typeMeta.color as keyof typeof colorClasses}
        />
      ),

      rewardType: (
        <Badge
          text={reward.rewardType}
          color={rewardTypeMeta.color as keyof typeof colorClasses}
        />
      ),

      amount: formatCurrency(reward.amount),
      narration: reward.narration || "-",

      createdAt: formatDateTime(reward.createdAt),

      redeemedAt: formatDateTime(reward.redeemedAt),
    };
  });

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
