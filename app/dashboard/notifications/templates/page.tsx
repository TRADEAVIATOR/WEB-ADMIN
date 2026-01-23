import PageHeader from "@/components/ui/PageHeader";
import { getNotificationTemplates } from "@/lib/api/notifications";
import ResultState from "@/components/ui/ResultState";
import DataTableClient from "./DataTableClient";

export const dynamic = "force-dynamic";

export default async function NotificationTemplatesPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getNotificationTemplates(page, 50);

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch notification templates."
        showRefresh
      />
    );
  }

  const payload = res.data;

  if (!payload?.data || payload.data.length === 0) {
    return (
      <ResultState type="empty" message="No notification templates found." />
    );
  }

  return (
    <>
      <PageHeader
        title="Notification Templates"
        description="Manage system and security notification templates. Create, edit, or delete templates as needed."
        buttonHref="/dashboard/notifications/templates/new"
        buttonText="Create Template"
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
