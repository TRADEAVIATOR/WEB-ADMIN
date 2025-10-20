"use client";

import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useModal } from "@/context/ModalContext";
import { useState } from "react";

interface AddGiftcardRateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddGiftcardRateModal({
  isOpen,
  onClose,
}: AddGiftcardRateModalProps) {
  const [formData, setFormData] = useState({
    brand: "",
    currency: "",
    rate: "",
    type: "",
  });

  const { openModal } = useModal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Giftcard Rate:", formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Giftcard Rate"
      desc="Create new giftcard rate">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Giftcard Brand"
          name="brand"
          placeholder="Enter giftcard brand"
          value={formData.brand}
          onChange={handleChange}
        />
        <Input
          label="Currency"
          name="currency"
          placeholder="Enter currency"
          value={formData.currency}
          onChange={handleChange}
        />
        <Input
          label="Set Rate"
          name="rate"
          type="number"
          placeholder="Enter rate"
          value={formData.rate}
          onChange={handleChange}
        />
        <Input
          label="Giftcard Type"
          name="type"
          placeholder="Enter giftcard type"
          value={formData.type}
          onChange={handleChange}
        />

        <Button
          type="submit"
          className="ml-auto block"
          onClick={() => openModal('confirm-new-giftcard-rate')}>
          Proceed
        </Button>
      </form>
    </Modal>
  );
}
