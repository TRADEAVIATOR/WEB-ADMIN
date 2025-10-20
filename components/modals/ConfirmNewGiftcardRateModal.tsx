"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useModal } from "@/context/ModalContext";

interface ConfirmNewGiftcardRateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmNewGiftcardRateModal({
  isOpen,
  onClose,
}: ConfirmNewGiftcardRateModalProps) {
  const giftcardBrand = "Amazon";
  const currency = "USD";
  const rate = "$450";
  const giftcardType = "Physical";

  const { openModal } = useModal();

  const handleChange = (field: string) => {
    console.log(`Change ${field} clicked`);
    openModal("add-giftcard-rate");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm New Giftcard Rate"
      desc="Please review the details below before adding the new giftcard rate."
      width="max-w-md">
      <div className="space-y-4 mt-4">
        <div className="flex justify-between items-center border border-gray-100 rounded-lg p-3 bg-gray-50">
          <div>
            <p className="text-sm text-gray-500">Giftcard Brand</p>
            <p className="font-medium text-gray-800">{giftcardBrand}</p>
          </div>
          <button
            onClick={() => handleChange("giftcardBrand")}
            className="text-primary text-sm font-medium hover:underline">
            Change
          </button>
        </div>

        <div className="flex justify-between items-center border border-gray-100 rounded-lg p-3 bg-gray-50">
          <div>
            <p className="text-sm text-gray-500">Currency</p>
            <p className="font-medium text-gray-800">{currency}</p>
          </div>
          <button
            onClick={() => handleChange("currency")}
            className="text-primary text-sm font-medium hover:underline">
            Change
          </button>
        </div>

        <div className="flex justify-between items-center border border-gray-100 rounded-lg p-3 bg-gray-50">
          <div>
            <p className="text-sm text-gray-500">Rate</p>
            <p className="font-medium text-gray-800">{rate}</p>
          </div>
          <button
            onClick={() => handleChange("rate")}
            className="text-primary text-sm font-medium hover:underline">
            Change
          </button>
        </div>

        <div className="flex justify-between items-center border border-gray-100 rounded-lg p-3 bg-gray-50">
          <div>
            <p className="text-sm text-gray-500">Giftcard Type</p>
            <p className="font-medium text-gray-800">{giftcardType}</p>
          </div>
          <button
            onClick={() => handleChange("giftcardType")}
            className="text-primary text-sm font-medium hover:underline">
            Change
          </button>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button
          variant="outline"
          onClick={() => openModal("add-giftcard-rate")}>
          Back
        </Button>
        <Button variant="primary" onClick={onClose}>
          Add Rate
        </Button>
      </div>
    </Modal>
  );
}
