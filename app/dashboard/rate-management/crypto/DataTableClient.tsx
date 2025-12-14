"use client";

import DataTable from "@/components/ui/Table";
import { formatCurrency } from "@/lib/utils/format";
import { DataTableClientProps } from "@/types/props";
import { RowData } from "@/types/common";

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
    { key: "pair", label: "Pair" },
    { key: "rate", label: "Rate" },
    { key: "provider", label: "Provider" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
  ];

  const rows: RowData[] = initialData.map((rate) => ({
    id: rate.id,

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

  return <DataTable columns={columns} data={rows} />;
}
