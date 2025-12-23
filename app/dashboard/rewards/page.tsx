import PageHeader from "@/components/ui/PageHeader";
import DataTableClient from "./DataTableClient";
import { getRewards } from "@/lib/api/rewards";
import ResultState from "@/components/ui/ResultState";
import { RewardsResponse } from "@/types/api";

export const dynamic = "force-dynamic";

export default async function RewardsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getRewards(page);

  if (!res || res.error) {
    return <ResultState type="error" message="Unable to fetch rewards." />;
  }

  const payload = res.data as RewardsResponse | undefined;

  if (!payload) {
    return (
      <ResultState
        type="error"
        message="Invalid server response. Please try again later."
      />
    );
  }

  if (!payload || payload.results.length === 0) {
    return (
      <>
        <ResultState type="empty" message="No rewards found." />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Rewards"
        description="Manage user rewards and their details"
      />
      <DataTableClient
        initialData={payload.results}
        initialPage={payload.pagination.currentPage}
        totalPages={payload.pagination.totalPages}
      />
    </>
  );
}
