import ResultState from "@/components/ui/ResultState";
import PromoCodeDetails from "./PromoCodeDetails";
import { getPromoCode, getPromoCodeStats } from "@/lib/api/promocodes";

export const dynamic = "force-dynamic";

export default async function PromoCodeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [promoRes, statsRes] = await Promise.all([
    getPromoCode(id),
    getPromoCodeStats(id),
  ]);

  if (!promoRes || promoRes.error || !statsRes || statsRes.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch promo code details."
        showRefresh
      />
    );
  }

  const promo = promoRes.data?.data;
  const stats = statsRes.data?.data?.stats;

  if (!promo || !stats) {
    return (
      <ResultState
        type="error"
        message="Invalid server response. Please try again later."
      />
    );
  }

  return <PromoCodeDetails promo={promo} stats={stats} />;
}
