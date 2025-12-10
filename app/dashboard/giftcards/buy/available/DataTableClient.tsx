"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import { GiftCardProduct } from "@/types/models";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import { FiRefreshCw } from "react-icons/fi";
import { syncGiftCardProductsClient } from "@/lib/api/giftcards";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { useSession } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function DataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<GiftCardProduct>) {
  const router = useRouter();
  const currentPage = initialPage;

  const { data: session } = useSession();
  const token = session?.accessToken;

  const columns = [
    { key: "imageUrl", label: "Image" },
    { key: "name", label: "Name" },
    { key: "country", label: "Country" },
    { key: "currency", label: "Currency" },
    { key: "denomination", label: "Denomination" },
    { key: "range", label: "Min–Max" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Created" },
  ];

  const rows: RowData[] = initialData.map((item) => ({
    id: item.id,

    imageUrl: (
      <div className="w-10 h-10 relative">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="rounded object-cover"
          sizes="40px"
        />
      </div>
    ),

    name: item.name,
    country: `${item.country} (${item.countryCode})`,

    currency: (
      <Badge
        text={item.currency}
        color="blue"
        icon={<HiOutlineCurrencyDollar className="w-3 h-3" />}
      />
    ),

    denomination: item.denomination,
    range: `${item.minAmount} - ${item.maxAmount}`,

    status: item.isActive ? (
      <Badge
        text="Active"
        color="green"
        icon={<span className="w-2 h-2 rounded-full bg-green-500" />}
      />
    ) : (
      <Badge
        text="Inactive"
        color="red"
        icon={<span className="w-2 h-2 rounded-full bg-red-500" />}
      />
    ),

    createdAt: new Date(item.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/giftcards/buy/available?page=${page}`);
  };

  const handleSyncGiftCards = async () => {
    const toastId = toast.loading("Syncing gift cards...");

    try {
      const res = await syncGiftCardProductsClient(token ?? "");
      if (!res.error) {
        toast.success("Gift cards synced successfully!", { id: toastId });
      } else {
        toast.error(res.message || "Failed to sync gift cards.", {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "An error occurred.",
        { id: toastId }
      );
    }
  };

  return (
    <>
      <PageHeader
        buttonIcon={<FiRefreshCw size={16} />}
        buttonText="Sync from Reloadly"
        buttonAction={handleSyncGiftCards}
      />
      <DataTable columns={columns} data={rows} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
