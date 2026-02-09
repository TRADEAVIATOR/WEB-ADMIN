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

  const response = await getEvents(page, 50);

  let content;

  if (!response || response.error) {
    content = <ResultState type="error" message="Unable to fetch events." />;
  } else {
    const { data, meta } = response.data;

    if (!data || !data) {
      content = (
        <ResultState
          type="error"
          message="Invalid server response. Please try again later."
        />
      );
    } else if (data.length === 0) {
      content = <ResultState type="empty" message="No events found." />;
    } else {
      content = (
        <DataTableClient
          initialData={data}
          initialPage={meta.page}
          totalPages={meta.totalPages}
        />
      );
    }
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
      {content}
    </>
  );
}
