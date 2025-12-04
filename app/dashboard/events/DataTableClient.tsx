"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import { Event } from "@/types/models";

export default function EventsDataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<Event>) {
  const router = useRouter();
  const currentPage = initialPage;

  const columns = [
    { key: "title", label: "Event Title" },
    { key: "description", label: "Description" },
    { key: "date", label: "Date" },
    { key: "location", label: "Location" },
    { key: "tickets", label: "Ticket Tiers" },
  ];

  const rows: RowData[] = initialData.map((event) => ({
    id: event.id,
    title: event.title,
    description:
      event.description.length > 50
        ? event.description.substring(0, 50) + "..."
        : event.description,
    date: new Date(event.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    location: event.location,
    tickets: event.ticketTiers.length,
  }));

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/events?page=${page}`);
  };

  const menuItems = [
    {
      label: "View",
      onClick: (row: any) => router.push(`/dashboard/events/${row.id}`),
    },
  ];

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
