import ResultState from "@/components/ui/ResultState";
import { getGiftCardOrderById } from "@/lib/api/giftcards";
import OrderDetails from "./OrderDetails";
import { GiftCardOrder } from "@/types/models";

export const dynamic = "force-dynamic";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getGiftCardOrderById(id);

  if (!res || res.error) {
    return (
      <ResultState type="error" message="Unable to fetch order details." />
    );
  }

  const order = res.data?.data as GiftCardOrder | undefined;

  if (!order) {
    return (
      <ResultState
        type="error"
        message="Invalid server response. Please try again."
      />
    );
  }

  return <OrderDetails order={order} />;
}
