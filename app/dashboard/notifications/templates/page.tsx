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

  let content;

  if (!res || res.error) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch notification templates."
        showRefresh
      />
    );
  } else {
    const payload = res.data;

    if (!payload?.data || payload.data.length === 0) {
      content = (
        <ResultState type="empty" message="No notification templates found." />
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
        title="Notification Templates"
        description="Manage system and security notification templates. Create, edit, or delete templates as needed."
        buttonHref="/dashboard/notifications/templates/new"
        buttonText="Create Template"
        backHref="/dashboard/notifications"
        showBackButton
      />
      {content}
    </>
  );
}
