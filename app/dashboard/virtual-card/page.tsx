import PageHeader from "@/components/ui/PageHeader";
import ResultState from "@/components/ui/ResultState";
import VirtualCardsTableClient from "./VirtualCardsTableClient";
import { getVirtualCards } from "@/lib/api/virtual-cards";

export const dynamic = "force-dynamic";

export default async function VirtualCardsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getVirtualCards(page, 50);

  let content;

  if (!res || res.error) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch virtual cards."
        showRefresh
      />
    );
  } else {
    const payload = res.data;

    if (!payload?.data || payload.data.length === 0) {
      content = <ResultState type="empty" message="No virtual cards found." />;
    } else {
      content = (
        <VirtualCardsTableClient
          initialData={payload.data}
          initialPage={1}
          totalPages={Math.ceil((payload.meta?.total ?? 0) / 50)}
        />
      );
    }
  }

  return (
    <>
      <PageHeader
        title="Virtual Cards"
        description="Manage issued virtual cards and user wallets"
      />
      {content}
    </>
  );
}
