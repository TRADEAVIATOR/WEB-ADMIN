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

  const res = await getAllAdminNotifications(page);

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch admin notifications."
        showRefresh
      />
    );
  }

  const payload = res.data;

  if (!payload?.data || payload.data.length === 0) {
    return <ResultState type="empty" message="No notifications found." />;
  }

  return (
    <>
      <PageHeader
        title="Admin Notifications"
        description="System alerts, activities, and important updates"
      />
      <DataTableClient
        initialData={payload.data}
        initialPage={payload.pagination.page}
        totalPages={payload.pagination.totalPages}
      />
    </>
  );
}
