"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { MenuItem, RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import { AcceptedGiftCard } from "@/types/models";
import Badge from "@/components/ui/Badge";

export default function AcceptedGiftCardsTable({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<AcceptedGiftCard>) {
  const router = useRouter();
  const currentPage = initialPage;

  const columns = [
    { key: "image", label: "Logo" },
    { key: "cardName", label: "Card Name" },
    { key: "cardType", label: "Card Type" },
    { key: "country", label: "Country" },
    { key: "currency", label: "Currency" },
    { key: "range", label: "Value Range" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Created" },
  ];

  const rows: RowData[] = initialData.map((item) => ({
    id: item.id,
    image: (
      <Image
        src={item.imageUrl}
        alt={item.cardName}
        width={40}
        height={40}
        className="rounded object-cover"
      />
    ),
    cardName: item.cardName,
    cardType: item.cardType,
    country: `${item.country} (${item.countryCode})`,
    currency: item.currency,
    range: `${item.minValue} - ${item.maxValue}`,
    status: item.isActive ? (
      <Badge text="Active" color="green" />
    ) : (
      <Badge text="Inactive" color="red" />
    ),
    createdAt: new Date(item.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  const menuItems: MenuItem<RowData>[] = [
    {
      label: "View",
      onClick: (row) =>
        router.push(`/dashboard/giftcards/sell/accepted/${row.id}`),
    },
    {
      label: "Edit",
      onClick: (row) =>
        router.push(`/dashboard/giftcards/sell/accepted/${row.id}/edit`),
    },
  ];

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/giftcards/sell/accepted?page=${page}`);
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
