"use client";

import { useRouter } from "next/navigation";
import DetailItem from "@/components/shared/DetailItem";
import { GiftCardOrder } from "@/types/models";
import { ChevronLeft } from "lucide-react";
import { formatCurrency, formatDateTime } from "@/lib/utils/format";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  refundGiftcardOrderClient,
  retryGiftcardOrderClient,
} from "@/lib/api/giftcards";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { handleApiError } from "@/lib/utils/errorHandler";

export default function OrderDetails({ order }: { order: GiftCardOrder }) {
  const router = useRouter();
  const [refundReason, setRefundReason] = useState("");
  const [loading, setLoading] = useState(false);

  const createdAt = new Date(order.createdAt).toLocaleString();
  const updatedAt = new Date(order.updatedAt).toLocaleString();

  const user = order.user ?? { fullname: "-", email: "-", phone: "-" };

  const handleRetry = async () => {
    const toastId = toast.loading("Retrying giftcard order...");
    try {
      const res = await retryGiftcardOrderClient(order.id);

      if (!res.error) {
        toast.success("Giftcard order retried successfully!", { id: toastId });
      } else {
        toast.error(res.message || "Failed to retry giftcard order", {
          id: toastId,
        });
      }
    } catch (error: unknown) {
      toast.error(
        (error as any)?.message ||
          "An unexpected error occurred while retrying",
        { id: toastId }
      );

      handleApiError(error);
    }
  };

  const handleRefund = async () => {
    if (!refundReason) return toast.error("Please provide a reason for refund");

    const toastId = toast.loading("Processing refund...");
    setLoading(true);
    try {
      const res = await refundGiftcardOrderClient(order.id, refundReason);
      if (!res.error) {
        toast.success("Giftcard order refunded successfully!", { id: toastId });
        setRefundReason("");
      } else {
        toast.error(res.message || "Failed to refund order", { id: toastId });
      }
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      <button
        onClick={() => router.back()}
        className="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium mb-6 transition">
        <ChevronLeft size={18} />
        <span>Back</span>
      </button>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Order ID" value={order.id} />
            <DetailItem label="Order Reference" value={order.orderReference} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Status" value={order.status} />
            <DetailItem label="Payment Method" value={order.paymentMethod} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Card Type" value={order.cardType} />
            <DetailItem label="Country" value={order.country} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Denomination" value={order.denomination} />
            <DetailItem label="Quantity" value={String(order.quantity)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Rate" value={order.rate} />
            <DetailItem
              label="Card Total"
              value={formatCurrency(order.cardTotal)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Fee" value={formatCurrency(order.fee)} />
            <DetailItem
              label="Naira Value"
              value={formatCurrency(order.nairaValue)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="User Name" value={user.fullname} />
            <DetailItem label="Email" value={user.email} />
          </div>

          {user.phone && (
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
              <DetailItem label="Phone" value={user.phone} />
            </div>
          )}

          {order.transaction && (
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
              <DetailItem label="Transaction ID" value={order.transaction.id} />
              <DetailItem
                label="Transaction Amount"
                value={formatCurrency(order.transaction.amount)}
              />
            </div>
          )}

          {order.failureReason && (
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
              <DetailItem label="Failure Reason" value={order.failureReason} />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
            <DetailItem label="Created At" value={formatDateTime(createdAt)} />
            <DetailItem label="Updated At" value={formatDateTime(updatedAt)} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <Button
            onClick={handleRetry}
            disabled={loading}
            className="sm:col-span-1 w-full">
            Retry Order
          </Button>

          <div className="sm:col-span-2 flex flex-col sm:flex-row gap-2 items-end">
            <FormField
              label="Refund Reason"
              placeholder="Enter reason for refund"
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleRefund}
              disabled={loading}
              className="sm:w-auto w-full">
              {loading ? "Processing..." : "Refund Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
