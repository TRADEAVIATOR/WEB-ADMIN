import PageHeader from "@/components/ui/PageHeader";
import { getBroadcastNotifications } from "@/lib/api/notifications";
import ResultState from "@/components/ui/ResultState";
import DataTableClient from "./DataTableClient";

export const dynamic = "force-dynamic";

export default async function BroadcastNotificationsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getBroadcastNotifications(page, 50);

  let content;

  if (!res || res.error) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch broadcast notifications."
      />
    );
  } else {
    const payload = res.data;

    if (!payload?.data || payload.data.length === 0) {
      content = (
        <ResultState type="empty" message="No broadcast notifications found." />
      );
    } else {
      content = (
        <DataTableClient
          initialData={payload.data}
          initialPage={payload.meta.page}
          totalPages={payload.meta.totalPages}
        />
      );
    }
  }

  return (
    <>
      <PageHeader
        title="Broadcast Notifications"
        description="Send notifications to multiple users at once"
        buttonText="Create Notification"
        buttonHref="/dashboard/notifications/broadcast/new"
        backHref="/dashboard/notifications"
        showBackButton
      />
      {content}
    </>
  );
}
