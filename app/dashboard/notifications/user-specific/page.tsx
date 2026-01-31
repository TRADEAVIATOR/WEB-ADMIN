import PageHeader from "@/components/ui/PageHeader";
import ResultState from "@/components/ui/ResultState";
import { getUserSpecificNotifications } from "@/lib/api/notifications";
import DataTableClient from "./DataTableClient";

export const dynamic = "force-dynamic";

export default async function UserSpecificNotificationsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getUserSpecificNotifications(page, 50);

  let content;

  if (!res || res.error) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch user notifications."
        showRefresh
      />
    );
  } else {
    const payload = res.data;

    if (!payload || !payload.data || payload.data.length === 0) {
      content = (
        <ResultState
          type="empty"
          message="No user-specific notifications found."
        />
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
        title="User Notifications"
        description="View notifications sent to individual users across the platform"
        buttonText="Send Notification"
        buttonHref="/dashboard/notifications/user-specific/new"
        backHref="/dashboard/notifications"
        showBackButton
      />
      {content}
    </>
  );
}
