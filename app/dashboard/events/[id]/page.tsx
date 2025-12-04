import EventDetails from "./EventDetails";
import ResultState from "@/components/ui/ResultState";
import { getEvent } from "@/lib/api/events";
import { Event } from "@/types/models";

export const dynamic = "force-dynamic";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await getEvent(id);

  if (!res || res.error) {
    return (
      <ResultState type="error" message="Unable to fetch event details." />
    );
  }

  const event = res.data?.event as Event | undefined;

  if (!event) {
    return (
      <ResultState
        type="error"
        message="Invalid server response. Please try again later."
      />
    );
  }

  return <EventDetails event={event} />;
}
