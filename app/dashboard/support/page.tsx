import PageHeader from "@/components/ui/PageHeader";
import ResultState from "@/components/ui/ResultState";
import { getSupportConversations } from "@/lib/api/support";
import DataTableClient from "./DataTableClient";

export const dynamic = "force-dynamic";

export default async function AdminSupportPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getSupportConversations(page, 50);

  let content;

  if (!res || res.error) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch support conversations."
      />
    );
  } else {
    const payload = res.data;

    if (!payload) {
      content = (
        <ResultState
          type="error"
          message="Invalid server response. Please try again later."
        />
      );
    } else if (!payload.results || payload.results.length === 0) {
      content = (
        <ResultState type="empty" message="No support conversations found." />
      );
    } else {
      content = (
        <DataTableClient
          initialData={payload.results}
          initialPage={payload.pagination.currentPage}
          totalPages={payload.pagination.totalPages}
        />
      );
    }
  }

  return (
    <>
      <PageHeader
        title="Admin Support"
        description="Manage and respond to customer support conversations"
      />
      {content}
    </>
  );
}
