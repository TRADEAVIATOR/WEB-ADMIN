import PageHeader from "@/components/ui/PageHeader";
import ResultState from "@/components/ui/ResultState";
import DataTableClient from "./DataTableClient";
import { getAllAdminNotifications } from "@/lib/api/notifications";

export const dynamic = "force-dynamic";

export default async function AdminNotificationsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getAllAdminNotifications(page, 50);

  let content;

  if (!res || res.error) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch admin notifications."
        showRefresh
      />
    );
  } else {
    const payload = res.data;

    if (!payload?.data || payload.data.length === 0) {
      content = <ResultState type="empty" message="No notifications found." />;
    } else {
      content = (
        <DataTableClient
          initialData={payload.data}
          initialPage={payload.pagination.page}
          totalPages={payload.pagination.totalPages}
        />
      );
    }
  }

  return (
    <>
      <PageHeader
        title="Admin Notifications"
        description="System alerts, activities, and important updates"
      />
      {content}
    </>
  );
}
