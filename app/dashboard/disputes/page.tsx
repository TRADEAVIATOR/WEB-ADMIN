import PageHeader from "@/components/ui/PageHeader";
import ResultState from "@/components/ui/ResultState";
import DataTableClient from "./DataTableClient";
import { getDisputes } from "@/lib/api/disputes";

export const dynamic = "force-dynamic";

export default async function DisputesPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getDisputes(page, 50);

  let content;

  if (!res || res.error) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch disputes."
        showRefresh
      />
    );
  } else {
    const payload = res.data?.data;

    if (!payload || !payload.transactions) {
      content = (
        <ResultState
          type="error"
          message="Invalid server response. Please try again later."
        />
      );
    } else if (payload.transactions.length === 0) {
      content = <ResultState type="empty" message="No disputes found." />;
    } else {
      content = (
        <DataTableClient
          initialData={payload.transactions}
          initialPage={payload.pagination.currentPage}
          totalPages={payload.pagination.totalPages}
        />
      );
    }
  }

  return (
    <>
      <PageHeader
        title="Disputes"
        description="View and manage all user disputes"
      />
      {content}
    </>
  );
}
