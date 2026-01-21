import EditScheduledNotificationClient from "./EditScheduledNotificationClient";
import { getScheduledNotification } from "@/lib/api/notifications";

export default async function EditScheduledNotificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scheduledNotification = await getScheduledNotification(id);

  return (
    <EditScheduledNotificationClient
      id={id}
      scheduledNotification={scheduledNotification.data.data}
    />
  );
}
