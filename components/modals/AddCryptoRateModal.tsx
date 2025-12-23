"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import FormField from "@/components/ui/FormField";
import { useModal } from "@/context/ModalContext";
import Button from "@/components/ui/Button";

interface AddCryptoRateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCryptoRateModal({
  isOpen,
  onClose,
}: AddCryptoRateModalProps) {
  const [formData, setFormData] = useState({
    baseAsset: "BTC",
    valueNGN: "",
  });

  const { openModal } = useModal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Crypto Rate"
      desc="Create new crypto rate">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Select Crypto"
          as="select"
          name="baseAsset"
          onChange={handleChange}
          value={formData.baseAsset}
          options={[
            { value: "BTC", label: "BTC" },
            { value: "USDT", label: "USDT" },
            { value: "ETH", label: "ETH" },
            { value: "USDC", label: "USDC" },
          ]}
        />

        <FormField
          label="Set Rate"
          type="number"
          placeholder="Enter rate (e.g. 1500)"
          value={formData.valueNGN}
          onChange={handleChange}
          name="valueNGN"
        />

        <Button
          type="submit"
          className="ml-auto block"
          onClick={() => openModal("confirm-new-crypto-rate", formData)}>
          Proceed
        </Button>
      </form>
    </Modal>
  );
}
