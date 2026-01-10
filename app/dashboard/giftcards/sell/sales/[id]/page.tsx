import ResultState from "@/components/ui/ResultState";
import { getGiftCardSaleById } from "@/lib/api/giftcards";
import { GiftCardSale } from "@/types/models";
import SalesDetails from "./SalesDetails";

export const dynamic = "force-dynamic";

export default async function SalesDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await getGiftCardSaleById(id);

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch sale details."
        showRefresh
      />
    );
  }

  const sale = res.data?.data as GiftCardSale | undefined;

  if (!sale) {
    return (
      <ResultState
        type="error"
        message="Invalid server response. Please try again later."
      />
    );
  }

  return <SalesDetails sale={sale} />;
}
