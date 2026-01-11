"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { handleApiError } from "@/lib/utils/errorHandler";
import { useModal } from "@/context/ModalContext";
import { setCryptoRateClient } from "@/lib/api/crypto";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ConfirmNewCryptoRateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmNewCryptoRateModal({
  isOpen,
  onClose,
}: ConfirmNewCryptoRateModalProps) {
  const router = useRouter();
  const { openModal, modalData } = useModal();
  const [loading, setLoading] = useState(false);

  const data = modalData as {
    baseAsset: string;
    valueNGN: string;
  };

  if (!data || !data.baseAsset || !data.valueNGN) {
    toast.error(
      "Missing required fields. Please complete the crypto rate form."
    );
    openModal("add-crypto-rate");
    return null;
  }

  const handleChange = (field: string) => {
    console.log(`Change ${field} clicked`);
    openModal("add-crypto-rate");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      await setCryptoRateClient({
        valueNGN: Number(data.valueNGN),
        baseAsset: data.baseAsset,
      });

      toast.success("Crypto rate set successfully!");

      router.refresh();

      onClose();
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
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
            <p className="font-medium text-gray-800">{data.baseAsset}</p>
          </div>
          <button
            onClick={() => handleChange("baseAsset")}
            className="text-primary text-sm font-medium hover:underline">
            Change
          </button>
        </div>

        <div className="flex justify-between items-center border border-gray-100 rounded-lg p-3 bg-gray-50">
          <div>
            <p className="text-sm text-gray-500">Rate</p>
            <p className="font-medium text-gray-800">{data.valueNGN}</p>
          </div>
          <button
            onClick={() => handleChange("valueNGN")}
            className="text-primary text-sm font-medium hover:underline">
            Change
          </button>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={() => openModal("add-crypto-rate")}>
          Back
        </Button>
        <Button
          variant="primary"
          isLoading={loading}
          onClick={handleSubmit}
          disabled={loading}>
          {loading ? "Saving..." : "Save Rate"}
        </Button>
      </div>
    </Modal>
  );
}
