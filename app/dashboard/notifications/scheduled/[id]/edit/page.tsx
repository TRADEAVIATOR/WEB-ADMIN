import EditScheduledNotificationClient from "./EditScheduledNotificationClient";

export default async function EditScheduledNotificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditScheduledNotificationClient id={id} />;
}
