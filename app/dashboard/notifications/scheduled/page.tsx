import PageHeader from "@/components/ui/PageHeader";
import ResultState from "@/components/ui/ResultState";
import { getScheduledNotifications } from "@/lib/api/notifications";
import DataTableClient from "./DataTableClient";

export const dynamic = "force-dynamic";

export default async function ScheduledNotificationsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getScheduledNotifications(page, 50);

  let content;

  if (!res || res.error) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch scheduled notifications."
        showRefresh
      />
    );
  } else {
    const payload = res.data;

    if (!payload?.data || payload.data.length === 0) {
      content = (
        <ResultState type="empty" message="No scheduled notifications found." />
      );
    } else {
      content = (
        <DataTableClient
          initialData={payload.data}
          initialPage={payload.pagination.currentPage}
          totalPages={payload.pagination.totalPages}
        />
      );
    }
  }

  return (
    <>
      <PageHeader
        title="Scheduled Notifications"
        description="Manage all scheduled notifications and broadcasts"
        buttonText="Create Notification"
        buttonHref="/dashboard/notifications/scheduled/new"
        backHref="/dashboard/notifications"
        showBackButton
      />
      {content}
    </>
  );
}
