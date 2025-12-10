import ResultState from "@/components/ui/ResultState";
import { getAcceptedGiftCardById } from "@/lib/api/giftcards";
import AcceptedGiftcardDetails from "./AcceptedGiftcardDetails";
import { AcceptedGiftcard } from "@/types/models";

export const dynamic = "force-dynamic";

export default async function AcceptedGiftcardDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await getAcceptedGiftCardById(id);

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch accepted giftcard details."
      />
    );
  }

  const giftcard = res.data?.data as AcceptedGiftcard | undefined;

  if (!giftcard) {
    return (
      <ResultState
        type="error"
        message="Invalid server response. Please try again later."
      />
    );
  }

  return <AcceptedGiftcardDetails giftcard={giftcard} />;
}
