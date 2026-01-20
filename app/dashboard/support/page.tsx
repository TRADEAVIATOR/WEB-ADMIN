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

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch support conversations."
      />
    );
  }

  const payload = res.data;

  if (!payload) {
    return (
      <ResultState
        type="error"
        message="Invalid server response. Please try again later."
      />
    );
  }

  if (!payload.results || payload.results.length === 0) {
    return (
      <ResultState type="empty" message="No support conversations found." />
    );
  }

  return (
    <>
      <PageHeader
        title="Admin Support"
        description="Manage and respond to customer support conversations"
      />

      <DataTableClient
        initialData={payload.results}
        initialPage={payload.pagination.currentPage}
        totalPages={payload.pagination.totalPages}
      />
    </>
  );
}
