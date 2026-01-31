"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { handleApiError } from "@/lib/utils/errorHandler";
import { useModal } from "@/context/ModalContext";
import { createAdminUserClient } from "@/lib/api/auth";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ConfirmNewAdministratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmNewAdministratorModal({
  isOpen,
  onClose,
}: ConfirmNewAdministratorModalProps) {
  const router = useRouter();

  const { openModal, modalData } = useModal();
  const [loading, setLoading] = useState(false);

  const data = modalData as {
    name: string;
    email: string;
    password: string;
  };

  if (!data || !data.name || !data.email || !data.password) {
    toast.error("Missing administrator details. Please fill the form again.");
    openModal("add-new-administrator");
    return null;
  }

  const handleChange = (field: string) => {
    console.log(`Change ${field} clicked`);
    openModal("add-new-administrator");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      await createAdminUserClient({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("Administrator created successfully!");
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
      title="Confirm New Administrator"
      desc="Please review the administrator details before adding. You can go back to make changes if necessary."
      width="max-w-md">
      <div className="space-y-4 mt-4">
        <div className="flex justify-between items-center border border-gray-100 rounded-lg p-3 bg-gray-50">
          <div>
            <p className="text-sm text-gray-500">Administrator Name</p>
            <p className="font-medium text-gray-800">{data.name}</p>
          </div>
          <button
            onClick={() => handleChange("name")}
            className="text-primary text-sm font-medium hover:underline">
            Change
          </button>
        </div>

        <div className="flex justify-between items-center border border-gray-100 rounded-lg p-3 bg-gray-50">
          <div>
            <p className="text-sm text-gray-500">Administrator Email</p>
            <p className="font-medium text-gray-800">{data.email}</p>
          </div>
          <button
            onClick={() => handleChange("email")}
            className="text-primary text-sm font-medium hover:underline">
            Change
          </button>
        </div>

        <div className="flex justify-between items-center border border-gray-100 rounded-lg p-3 bg-gray-50">
          <div>
            <p className="text-sm text-gray-500">Administrator Password</p>
            <p className="font-medium text-gray-800">{data.password}</p>
          </div>
          <button
            onClick={() => handleChange("password")}
            className="text-primary text-sm font-medium hover:underline">
            Change
          </button>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button
          variant="outline"
          onClick={() => openModal("add-new-administrator")}>
          Back
        </Button>
        <Button
          variant="primary"
          disabled={loading}
          isLoading={loading}
          onClick={handleSubmit}>
          {loading ? "Creating..." : "Create Administrator"}
        </Button>
      </div>
    </Modal>
  );
}
