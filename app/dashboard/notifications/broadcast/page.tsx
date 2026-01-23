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

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch broadcast notifications."
      />
    );
  }

  const payload = res.data;

  if (!payload?.data || payload.data.length === 0) {
    return (
      <ResultState type="empty" message="No broadcast notifications found." />
    );
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
      <DataTableClient
        initialData={payload.data}
        initialPage={payload.pagination.currentPage}
        totalPages={payload.pagination.totalPages}
      />
    </>
  );
}
