"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useModal } from "@/context/ModalContext";

interface ConfirmNewCryptoRateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmNewCryptoRateModal({
  isOpen,
  onClose,
}: ConfirmNewCryptoRateModalProps) {
  const selectedCrypto = "Bitcoin (BTC)";
  const selectedRate = "$1,4534";

  const { openModal } = useModal();

  const handleChange = (field: string) => {
    console.log(`Change ${field} clicked`);
    openModal("add-crypto-rate");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm New Crypto Rate"
      desc="Please review the details below before adding the new crypto rate."
      width="max-w-md">
      <div className="space-y-4 mt-4">
        <div className="flex justify-between items-center border border-gray-100 rounded-lg p-3 bg-gray-50">
          <div>
            <p className="text-sm text-gray-500">Crypto</p>
            <p className="font-medium text-gray-800">{selectedCrypto}</p>
          </div>
          <button
            onClick={() => handleChange("crypto")}
            className="text-primary text-sm font-medium hover:underline">
            Change
          </button>
        </div>

        <div className="flex justify-between items-center border border-gray-100 rounded-lg p-3 bg-gray-50">
          <div>
            <p className="text-sm text-gray-500">Rate</p>
            <p className="font-medium text-gray-800">{selectedRate}</p>
          </div>
          <button
            onClick={() => handleChange("rate")}
            className="text-primary text-sm font-medium hover:underline">
            Change
          </button>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={() => openModal("add-crypto-rate")}>
          Back
        </Button>
        <Button variant="primary" onClick={onClose}>
          Add Rate
        </Button>
      </div>
    </Modal>
  );
}
