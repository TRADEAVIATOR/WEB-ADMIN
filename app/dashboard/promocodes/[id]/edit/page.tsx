import { getPromoCode } from "@/lib/api/promocodes";
import EditPromoCodeClient from "./EditPromoCodeClient";
import ResultState from "@/components/ui/ResultState";

export const dynamic = "force-dynamic";

export default async function EditPromoCodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await getPromoCode(id);
  const promo = res?.data.data;

  if (!res || res.error || !promo) {
    return (
      <ResultState type="error" message="Unable to fetch promo code details." />
    );
  }

  return <EditPromoCodeClient id={id} initialValues={promo} />;
}
