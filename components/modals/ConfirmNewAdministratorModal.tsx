"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useModal } from "@/context/ModalContext";

interface ConfirmNewAdministratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmNewAdministratorModal({
  isOpen,
  onClose,
}: ConfirmNewAdministratorModalProps) {
  const { openModal } = useModal();

  const handleChange = (field: string) => {
    console.log(`Change ${field} clicked`);
    openModal("add-new-administrator");
  };

  const administrator = {
    name: "John Doe",
    username: "john_doe",
    email: "john.doe@example.com",
    role: "Super Admin",
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
            <p className="font-medium text-gray-800">{administrator.name}</p>
          </div>
          <button
            onClick={() => handleChange("name")}
            className="text-primary text-sm font-medium hover:underline">
            Change
          </button>
        </div>

        <div className="flex justify-between items-center border border-gray-100 rounded-lg p-3 bg-gray-50">
          <div>
            <p className="text-sm text-gray-500">Administrator Username</p>
            <p className="font-medium text-gray-800">
              {administrator.username}
            </p>
          </div>
          <button
            onClick={() => handleChange("username")}
            className="text-primary text-sm font-medium hover:underline">
            Change
          </button>
        </div>

        <div className="flex justify-between items-center border border-gray-100 rounded-lg p-3 bg-gray-50">
          <div>
            <p className="text-sm text-gray-500">Administrator Email</p>
            <p className="font-medium text-gray-800">{administrator.email}</p>
          </div>
          <button
            onClick={() => handleChange("email")}
            className="text-primary text-sm font-medium hover:underline">
            Change
          </button>
        </div>

        <div className="flex justify-between items-center border border-gray-100 rounded-lg p-3 bg-gray-50">
          <div>
            <p className="text-sm text-gray-500">Administrator Role</p>
            <p className="font-medium text-gray-800">{administrator.role}</p>
          </div>
          <button
            onClick={() => handleChange("role")}
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
        <Button variant="primary">Add Administrator</Button>
      </div>
    </Modal>
  );
}
