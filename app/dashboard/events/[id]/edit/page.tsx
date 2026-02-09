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

  const response = await getEvent(id);

  if (!response || response.error) {
    return (
      <ResultState type="error" message="Unable to fetch event details." />
    );
  }

  const { data } = response.data;

  const initialValues: EventFormValues = {
    title: data.title,
    description: data.description || "",
    location: data.location,
    eventImages: data.eventImages,
    date: data.date.split("T")[0],
    time: data.date.split("T")[1]?.slice(0, 5) || "",
    ticketTiers: data.ticketTiers.map((t: any) => ({
      name: t.name,
      quantity: t.quantity,
      currency: t.currency,
      price: t.price,
    })),
  };

  return <EditEventClient initialValues={initialValues} eventId={id} />;
}
