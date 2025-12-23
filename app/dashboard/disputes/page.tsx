import PageHeader from "@/components/ui/PageHeader";
import ResultState from "@/components/ui/ResultState";
import DataTableClient from "./DataTableClient";
import { getDisputes } from "@/lib/api/disputes";
import { DisputesResponse } from "@/types/api";

export const dynamic = "force-dynamic";

export default async function DisputesPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getDisputes(page);

  if (!res || res.error) {
    return <ResultState type="error" message="Unable to fetch disputes." />;
  }

  const payload = res.data?.data as DisputesResponse | undefined;

  if (!payload || !payload.transactions) {
    return (
      <ResultState
        type="error"
        message="Invalid server response. Please try again later."
      />
    );
  }

  if (payload.transactions.length === 0) {
    return <ResultState type="empty" message="No disputes found." />;
  }

  return (
    <>
      <PageHeader
        title="Disputes"
        description="View and manage all user disputes"
      />
      <DataTableClient
        initialData={payload.transactions}
        initialPage={payload.pagination.currentPage}
        totalPages={payload.pagination.totalPages}
      />
    </>
  );
}
