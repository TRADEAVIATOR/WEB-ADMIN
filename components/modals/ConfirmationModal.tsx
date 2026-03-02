"use client";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: "primary" | "danger" | "success" | "secondary";
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  description = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  variant = "primary",
}: ConfirmationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={isLoading ? () => {} : onClose}
      title={title}
      desc={description}
      width="max-w-sm">
      <div className="flex gap-3 mt-6">
        <Button
          type="button"
          variant="outline"
          rounded="lg"
          onClick={onClose}
          disabled={isLoading}
          className="flex-1">
          {cancelText}
        </Button>

        <Button
          type="button"
          variant={variant}
          rounded="lg"
          onClick={onConfirm}
          isLoading={isLoading}
          className="flex-1">
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
