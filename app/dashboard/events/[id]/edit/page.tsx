import { getEvent } from "@/lib/api/events";
import EditEventClient from "./EditEventClient";
import ResultState from "@/components/ui/ResultState";
import { EventFormValues } from "@/types/forms";

export const dynamic = "force-dynamic";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await getEvent(id);
  const event = res?.data?.event;

  if (!res || res.error) {
    return (
      <ResultState type="error" message="Unable to fetch event details." />
    );
  }

  const initialValues: EventFormValues = {
    title: event.title,
    description: event.description || "",
    location: event.location,
    eventImages: event.eventImages,
    date: event.date.split("T")[0],
    time: event.date.split("T")[1]?.slice(0, 5) || "",
    ticketTiers: event.ticketTiers.map((t: any) => ({
      name: t.name,
      quantity: t.quantity,
      currency: t.currency,
      price: t.price,
    })),
  };

  return <EditEventClient initialValues={initialValues} eventId={id} />;
}
