"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import { Ticket } from "@/types/models";
import Badge from "@/components/ui/Badge";

export default function DataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<Ticket>) {
  const router = useRouter();
  const currentPage = initialPage;

  const columns = [
    { key: "tierName", label: "Tier" },
    { key: "price", label: "Price" },
    { key: "remainingQuantity", label: "Remaining" },
    { key: "soldQuantity", label: "Sold" },
    { key: "revenue", label: "Revenue" },
    { key: "eventTitle", label: "Event" },
    { key: "eventDate", label: "Event Date" },
    { key: "eventLocation", label: "Event Location" },
  ];

  const rows: RowData[] = initialData.map((ticket) => ({
    id: ticket.tierId,
    tierName: <Badge text={ticket.tierName} color="blue" />,
    price: `${ticket.currency} ${ticket.price}`,
    remainingQuantity: ticket.remainingQuantity,
    soldQuantity: ticket.soldQuantity,
    revenue: `${ticket.currency} ${ticket.revenue}`,
    eventTitle: ticket.eventTitle,
    eventDate: new Date(ticket.eventDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    eventLocation: ticket.eventLocation,
  }));

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/tickets?page=${page}`);
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
