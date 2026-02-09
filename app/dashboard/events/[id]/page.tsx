import EventDetails from "./EventDetails";
import ResultState from "@/components/ui/ResultState";
import { getEvent } from "@/lib/api/events";

export const dynamic = "force-dynamic";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await getEvent(id);

  if (!response || response.error) {
    return (
      <ResultState type="error" message="Unable to fetch event details." />
    );
  }

  const { data } = response.data;

  if (!data) {
    return (
      <ResultState
        type="error"
        message="Invalid server response. Please try again later."
      />
    );
  }

  return <EventDetails event={data} />;
}
