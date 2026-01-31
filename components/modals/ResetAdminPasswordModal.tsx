"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { handleApiError } from "@/lib/utils/errorHandler";
import { resetAdminPassword } from "@/lib/api/auth";

interface ResetAdminPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminId: string;
}

export default function ResetAdminPasswordModal({
  isOpen,
  onClose,
  adminId,
}: ResetAdminPasswordModalProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) return;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Resetting password...");

    try {
      const res = await resetAdminPassword(adminId, newPassword);

      if (!res?.error) {
        toast.success("Password reset successfully!", { id: toastId });
        setNewPassword("");
        setConfirmPassword("");
        onClose();
      } else {
        toast.error(res?.message || "Failed to reset password.", {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred.", { id: toastId });
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled =
    loading || newPassword.length < 6 || confirmPassword.length < 6;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reset Admin Password"
      desc="Set a new password for this admin. Minimum 6 characters.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="New Password"
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <FormField
          label="Confirm Password"
          type="password"
          placeholder="Re-enter new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          disabled={isSubmitDisabled}
          className="ml-auto block">
          Reset Password
        </Button>
      </form>
    </Modal>
  );
}
