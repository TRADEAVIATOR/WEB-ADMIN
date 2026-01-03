"use client";

import {
  processGiftCardPayout,
  rejectGiftCardSales,
  reviewGiftCardSale,
} from "@/lib/api/giftcards";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { handleApiError } from "@/lib/utils/errorHandler";

type GiftCardActionsProps = {
  saleId: string;
  onActionComplete?: () => void;
};

export default function GiftCardActions({
  saleId,
  onActionComplete,
}: GiftCardActionsProps) {
  const [reviewLoading, setReviewLoading] = useState(false);
  const [payoutLoading, setPayoutLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleReview = async () => {
    setReviewLoading(true);
    try {
      const res = await reviewGiftCardSale(saleId);
      toast.success(res.message || "Sale reviewed successfully");
      onActionComplete?.();
    } catch (err: any) {
      handleApiError(err);
    } finally {
      setReviewLoading(false);
    }
  };

  const handlePayout = async () => {
    setPayoutLoading(true);
    try {
      const res = await processGiftCardPayout([saleId]);
      toast.success(res.message || "Payout processed successfully");
      onActionComplete?.();
    } catch (err: any) {
      handleApiError(err);
    } finally {
      setPayoutLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error("Please enter a rejection reason");
      return;
    }

    setRejectLoading(true);
    try {
      const res = await rejectGiftCardSales([saleId], rejectionReason);
      toast.success(res.message || "Sale rejected successfully");
      setRejectionReason("");
      setShowRejectInput(false);
      onActionComplete?.();
    } catch (err: any) {
      handleApiError(err);
    } finally {
      setRejectLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
        <Button
          variant="primary"
          isLoading={reviewLoading}
          onClick={handleReview}>
          Review
        </Button>

        <Button
          variant="secondary"
          isLoading={payoutLoading}
          onClick={handlePayout}>
          Process Payout
        </Button>

        <Button
          variant="danger"
          isLoading={rejectLoading}
          onClick={() => setShowRejectInput(true)}>
          Reject
        </Button>
      </div>

      {showRejectInput && (
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-end mt-2 w-full">
          <FormField
            label="Rejection Reason"
            required
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="w-full sm:flex-1"
          />

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant="danger"
              size="sm"
              isLoading={rejectLoading}
              onClick={handleReject}>
              Submit
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowRejectInput(false);
                setRejectionReason("");
              }}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
