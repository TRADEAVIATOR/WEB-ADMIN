"use client";

import {
  processGiftCardPayout,
  rejectGiftCardSales,
  reviewGiftCardSale,
} from "@/lib/api/giftcards";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import SelectField, { SelectOption } from "@/components/ui/SelectField";
import { handleApiError } from "@/lib/utils/errorHandler";

type GiftCardActionsProps = {
  saleId: string;
  onActionComplete?: () => void;
};

const rejectionOptions: SelectOption[] = [
  { label: "Gift card already used", value: "GIFT_CARD_USED" },
  { label: "No offer available at the moment", value: "NO_OFFER_AVAILABLE" },
];

export default function GiftCardActions({
  saleId,
  onActionComplete,
}: GiftCardActionsProps) {
  const [reviewLoading, setReviewLoading] = useState(false);
  const [payoutLoading, setPayoutLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectionReason, setRejectionReason] = useState<SelectOption | null>(
    null
  );

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
      const res = await processGiftCardPayout(saleId);
      toast.success(res.message || "Payout processed successfully");
      onActionComplete?.();
    } catch (err: any) {
      handleApiError(err);
    } finally {
      setPayoutLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason) {
      toast.error("Please select a rejection reason");
      return;
    }

    setRejectLoading(true);
    try {
      const res = await rejectGiftCardSales(saleId, rejectionReason.label);
      toast.success(res.message || "Sale rejected successfully");
      setRejectionReason(null);
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
      <div className="flex flex-wrap justify-between gap-2">
        <Button
          variant="primary"
          isLoading={reviewLoading}
          onClick={handleReview}>
          Review
        </Button>

        <Button
          variant="success"
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
        <div className="flex flex-col sm:flex-row gap-3 items-end w-full">
          <SelectField
            id="rejectionReason"
            label="Rejection Reason"
            required
            options={rejectionOptions}
            value={rejectionReason}
            onChange={(val) => setRejectionReason(val as SelectOption)}
            className="w-full sm:flex-1"
          />

          <div className="flex gap-2">
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
                setRejectionReason(null);
              }}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
