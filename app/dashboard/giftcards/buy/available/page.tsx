import ResultState from "@/components/ui/ResultState";
import { getGiftCards } from "@/lib/api/giftcards";
import DataTableClient from "./DataTableClient";

export const dynamic = "force-dynamic";

export default async function GiftCardsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getGiftCards(page, 50);

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch available gift cards."
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

  if (!payload.data || payload.data.length === 0) {
    return (
      <ResultState type="empty" message="No available gift cards found." />
    );
  }

  return (
    <>
      <DataTableClient
        initialData={payload.data}
        initialPage={payload.meta.page}
        totalPages={payload.meta.totalPages}
      />
    </>
  );
}
