"use client";

import DataTable from "@/components/ui/Table";
import { formatCurrency, formatDateTime } from "@/lib/utils/format";
import { DataTableClientProps } from "@/types/props";
import { MenuItem, RowData } from "@/types/common";
import { deleteCryptoRateClient } from "@/lib/api/crypto";
import toast from "react-hot-toast";
import Image from "next/image";
import Badge from "@/components/ui/Badge";

interface CryptoRate {
  id: string;
  code: string;
  name: string;
  imageUrl: string;
  isActive: boolean;
  buyRate: string;
  createdAt: string;
  updatedAt: string;
  baseAsset: string;
}

export default function DataTableClient({
  initialData = [],
}: DataTableClientProps<CryptoRate>) {
  const columns = [
    { key: "image", label: "Image" },
    { key: "name", label: "Name" },
    { key: "code", label: "Code" },
    { key: "baseAsset", label: "Base Asset" },
    { key: "buyRate", label: "Buy Rate" },
    { key: "isActive", label: "Active" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
  ];

  const rows: RowData[] = initialData.map((rate) => ({
    id: rate.id,

    image: rate.imageUrl ? (
      <Image
        src={rate.imageUrl}
        alt={rate.name}
        width={40}
        height={40}
        className="rounded object-cover"
      />
    ) : (
      "N/A"
    ),

    name: rate.name,
    code: rate.code,
    baseAsset: rate.baseAsset,
    buyRate: formatCurrency(Number(rate.buyRate), {
      currency: "USD",
      locale: "en-US",
    }),
    isActive: (
      <Badge
        text={rate.isActive ? "Active" : "Inactive"}
        color={rate.isActive ? "green" : "red"}
      />
    ),
    createdAt: formatDateTime(rate.createdAt),

    updatedAt: formatDateTime(rate.updatedAt),
  }));

  const handleDeleteCrypto = async (code: string) => {
    const toastId = toast.loading("Deleting crypto pair...");

    try {
      const res = await deleteCryptoRateClient(code);
      if (!res.error) {
        toast.success("Crypto pair deleted successfully!", { id: toastId });
      } else {
        toast.error(res.message || "Failed to delete crypto pair.", {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred.", { id: toastId });
    }
  };

  const menuItems: MenuItem<RowData>[] = [
    {
      label: "Delete",
      color: "text-red-600",
      onClick: (row) => handleDeleteCrypto(String(row.code)),
    },
  ];

  return <DataTable columns={columns} data={rows} menuItems={menuItems} />;
}
