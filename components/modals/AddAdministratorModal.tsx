"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/context/ModalContext";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";

interface AddAdministratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAdministratorModal({
  isOpen,
  onClose,
}: AddAdministratorModalProps) {
  const { openModal } = useModal();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Administrator"
      desc="Enter details">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter full name"
        />

        <FormField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
        />

        <FormField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
        />

        <Button
          type="submit"
          className="ml-auto block"
          onClick={() => openModal("confirm-new-administrator", formData)}>
          Proceed
        </Button>
      </form>
    </Modal>
  );
}
