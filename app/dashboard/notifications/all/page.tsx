import PageHeader from "@/components/ui/PageHeader";
import ResultState from "@/components/ui/ResultState";
import { getNotifications } from "@/lib/api/notifications";
import DataTableClient from "./DataTableClient";

export const dynamic = "force-dynamic";

export default async function NotificationsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getNotifications(page, 50);

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch notifications."
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
        title="Notifications"
        description="View all system, transaction, promo, and user notifications."
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
