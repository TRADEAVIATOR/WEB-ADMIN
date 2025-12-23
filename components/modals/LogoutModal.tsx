"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";
import { logoutAdmin } from "@/lib/api/auth";
import { toast } from "react-hot-toast";
import { useState } from "react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      onClose();
      await logoutAdmin();
      await signOut({ callbackUrl: "/" });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error("Unable to logout. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Logout"
      desc="Are you sure you want to logout? You will need to log in again after this activity.">
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          Back
        </Button>
        <Button variant="primary" onClick={handleLogout} isLoading={isLoading}>
          Logout
        </Button>
      </div>
    </Modal>
  );
}
