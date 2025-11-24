"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface GiftcardApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove?: () => void;
}

export default function GiftcardApprovalModal({
  isOpen,
  onClose,
  onApprove,
}: GiftcardApprovalModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Approve Giftcard"
      desc="Are you sure you want to approve this giftcard and authorize payment? This action is permanent and cannot be undone.">
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={onClose}>
          Back
        </Button>

        <Button variant="primary" onClick={onApprove}>
          Approve
        </Button>
      </div>
    </Modal>
  );
}
