import PageHeader from "@/components/ui/PageHeader";
import ResultState from "@/components/ui/ResultState";
import DataTableClient from "./DataTableClient";
import { getEvents } from "@/lib/api/events";
import { FiPlus } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function EventsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getEvents(page, 50);

  if (!res || res.error) {
    return <ResultState type="error" message="Unable to fetch events." />;
  }

  const payload = res.data;

  if (!payload || !payload.results) {
    return (
      <ResultState
        type="error"
        message="Invalid server response. Please try again later."
      />
    );
  }

  if (payload.results.length === 0) {
    return <ResultState type="empty" message="No events found." />;
  }

  return (
    <>
      <PageHeader
        title="Events"
        description="Create and manage events for your platform"
        buttonIcon={<FiPlus size={16} />}
        buttonText="Add New Event"
        buttonHref="/dashboard/events/add"
      />

      <DataTableClient
        initialData={payload.results}
        initialPage={payload.pagination.currentPage}
        totalPages={payload.pagination.totalPages}
      />
    </>
  );
}
