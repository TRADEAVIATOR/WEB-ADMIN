"use client";

import Modal from "../ui/Modal";
import FormField from "../ui/FormField";
import Button from "../ui/Button";

interface GiftcardRejectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReject?: () => void;
}

export default function GiftcardRejectionModal({
  isOpen,
  onClose,
  onReject,
}: GiftcardRejectionModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reject Giftcard"
      desc="Are you sure you want to reject this giftcard? This action will notify the user, and cannot be undone.">
      <FormField
        label="Reason for Rejection (Optional)"
        placeholder="Enter your reason for rejecting this giftcard"
      />

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={onClose}>
          Back
        </Button>

        <Button variant="danger" onClick={onReject}>
          Reject
        </Button>
      </div>
    </Modal>
  );
}
