"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import { RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import { handleApiError } from "@/lib/utils/errorHandler";
import { Event } from "@/types/models";
import toast from "react-hot-toast";
import { deleteEvent } from "@/lib/api/events";

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

  const rows: RowData[] = initialData.map((event) => {
    const description = event.description ?? "";

    return {
      id: event.id,
      title: event.title,
      description:
        description.length > 50
          ? description.substring(0, 50) + "..."
          : description,
      date: new Date(event.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      location: event.location,
      tickets: event.ticketTiers.length,
    };
  });

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/events?page=${page}`);
  };

  const handleDeleteEvent = async (eventId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event? This action cannot be undone.",
    );
    if (!confirmed) return;

    const toastId = toast.loading("Deleting event...");

    try {
      const res = await deleteEvent(eventId);

      if (!res?.error) {
        toast.success("Event deleted successfully!", { id: toastId });
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to delete event.", { id: toastId });
      }
    } catch (error) {
      toast.error("An unexpected error occurred.", { id: toastId });
      handleApiError(error);
    }
  };

  const menuItems = [
    {
      label: "View",
      onClick: (row: any) => router.push(`/dashboard/events/${row.id}`),
    },
    {
      label: "Edit",
      onClick: (row: any) => router.push(`/dashboard/events/${row.id}/edit`),
    },
    {
      label: "Delete",
      onClick: (row: any) => handleDeleteEvent(row.id),
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
