"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface AddCryptoRateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCryptoRateModal({
  isOpen,
  onClose,
}: AddCryptoRateModalProps) {
  const [crypto, setCrypto] = useState("");
  const [rate, setRate] = useState("");

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
        <Input
          label="Select Crypto"
          type="text"
          placeholder="Enter crypto name (e.g. Bitcoin)"
          value={crypto}
          onChange={(e) => setCrypto(e.target.value)}
        />

        <Input
          label="Set Rate"
          type="number"
          placeholder="Enter rate (e.g. 1500)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />

        <Button type="submit" className="ml-auto block">
          Proceed
        </Button>
      </form>
    </Modal>
  );
}
