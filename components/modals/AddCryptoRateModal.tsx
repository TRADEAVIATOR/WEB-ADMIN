"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { useModal } from "@/context/ModalContext";

interface AddCryptoRateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCryptoRateModal({
  isOpen,
  onClose,
}: AddCryptoRateModalProps) {
  const [crypto, setCrypto] = useState("BTC");
  const [rate, setRate] = useState("");

  const { openModal } = useModal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ crypto, rate });
    onClose();
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
          value={crypto}
          onChange={(e) => setCrypto(e.target.value)}
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
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />

        <Button
          type="submit"
          className="ml-auto block"
          onClick={() => openModal("confirm-new-crypto-rate")}>
          Proceed
        </Button>
      </form>
    </Modal>
  );
}
