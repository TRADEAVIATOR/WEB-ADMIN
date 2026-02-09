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

  const res = await getRewards(page, 50);

  let content;

  if (!res || res.error) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch rewards."
        showRefresh
      />
    );
  } else {
    const payload = res.data as RewardsResponse | undefined;

    if (!payload) {
      content = (
        <ResultState
          type="error"
          message="Invalid server response. Please try again later."
        />
      );
    } else if (!payload.data || payload.data.length === 0) {
      content = <ResultState type="empty" message="No rewards found." />;
    } else {
      content = (
        <DataTableClient
          initialData={payload.data}
          initialPage={payload.meta.page}
          totalPages={payload.meta.totalPages}
        />
      );
    }
  }

  return (
    <>
      <PageHeader
        title="Rewards"
        description="Manage user rewards and their details"
      />
      {content}
    </>
  );
}
