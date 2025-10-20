"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface AddAdministratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAdministratorModal({
  isOpen,
  onClose,
}: AddAdministratorModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Admin data:", formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Administrator"
      desc="Enter details">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter full name"
        />
        <Input
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
        />
        <Input
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Enter role (e.g., Admin, Manager)"
        />

        <Button type="submit" className="ml-auto block">
          Proceed
        </Button>
      </form>
    </Modal>
  );
}
