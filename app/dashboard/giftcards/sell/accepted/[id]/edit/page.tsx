import { getAcceptedGiftCardById } from "@/lib/api/giftcards";
import EditAcceptedGiftcardClient from "./EditAcceptedGiftcardClient";
import ResultState from "@/components/ui/ResultState";

export const dynamic = "force-dynamic";

export default async function EditAcceptedGiftcardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await getAcceptedGiftCardById(id);
  const data = res?.data?.data;

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch accepted giftcard details."
      />
    );
  }

  return <EditAcceptedGiftcardClient initialValues={data} id={id} />;
}
