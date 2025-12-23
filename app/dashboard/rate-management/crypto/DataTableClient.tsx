"use client";

import DataTable from "@/components/ui/Table";
import { formatCurrency } from "@/lib/utils/format";
import { DataTableClientProps } from "@/types/props";
import { MenuItem, RowData } from "@/types/common";
import { deleteCryptoRateClient } from "@/lib/api/crypto";
import toast from "react-hot-toast";

interface CryptoRate {
  id: string;
  baseAsset: string;
  quoteAsset: string;
  rate: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export default function DataTableClient({
  initialData = [],
}: DataTableClientProps<CryptoRate>) {
  const columns = [
    { key: "id", label: "ID" },
    { key: "baseAsset", label: "Base Asset" },
    { key: "pair", label: "Pair" },
    { key: "rate", label: "Rate" },
    { key: "provider", label: "Provider" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
  ];

  const rows: RowData[] = initialData.map((rate) => ({
    id: rate.id,

    baseAsset: rate.baseAsset,

    pair: `${rate.baseAsset}/${rate.quoteAsset}`,

    rate: formatCurrency(rate.rate),

    provider: rate.provider || "-",

    createdAt: new Date(rate.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),

    updatedAt: new Date(rate.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  const handleDeleteCrypto = async (baseAsset: string) => {
    const toastId = toast.loading("Deleting crypto pair...");

    try {
      const res = await deleteCryptoRateClient(baseAsset);
      if (!res.error) {
        toast.success("Crypto pair deleted successfully!", { id: toastId });
      } else {
        toast.error(res.message || "Failed to delete crypto pair.", {
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

  const menuItems: MenuItem<RowData>[] = [
    {
      label: "Delete",
      color: "text-red-600",
      onClick: (row) => handleDeleteCrypto(String(row.baseAsset)),
    },
  ];

  return <DataTable columns={columns} data={rows} menuItems={menuItems} />;
}
