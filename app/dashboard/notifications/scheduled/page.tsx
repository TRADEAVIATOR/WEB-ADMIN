import PageHeader from "@/components/ui/PageHeader";
import ResultState from "@/components/ui/ResultState";
import { getScheduledNotifications } from "@/lib/api/notifications";
import DataTableClient from "./DataTableClient";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ScheduledNotificationsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getScheduledNotifications(page);

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch scheduled notifications."
        showRefresh
      />
    );
  }

  const payload = res.data;

  if (!payload?.data || payload.data.length === 0) {
    return (
      <ResultState type="empty" message="No scheduled notifications found." />
    );
  }

  return (
    <>
      <PageHeader
        title="Scheduled Notifications"
        description="Manage all scheduled notifications and broadcasts"
        showBackButton
        buttonText="Create Notification"
        buttonHref="/dashboard/notifications/scheduled/new"
      />

      <Link href="/dashboard/notifications/scheduled/recurring-patterns">
        <Button
          size="sm"
          className="flex items-center gap-2 text-white text-sm px-5 py-2.5 rounded-full mb-4">
          Recurring Patterns
        </Button>
      </Link>

      <DataTableClient
        initialData={payload.data}
        initialPage={payload.pagination.currentPage}
        totalPages={payload.pagination.totalPages}
      />
    </>
  );
}
