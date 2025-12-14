"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { updateDashboardTaglineClient } from "@/lib/api/dashboard";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface EditTaglineModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTagline?: string;
}

export default function EditTaglineModal({
  isOpen,
  onClose,
  initialTagline = "",
}: EditTaglineModalProps) {
  const [tagline, setTagline] = useState(initialTagline);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const token = session?.accessToken ?? "";

  useEffect(() => {
    setTagline(initialTagline);
  }, [initialTagline]);

  const handleSave = async () => {
    if (!tagline.trim()) {
      toast.error("Tagline cannot be empty");
      return;
    }

    setLoading(true);
    const res = await updateDashboardTaglineClient(tagline.trim(), token);
    setLoading(false);

    if (!res || res.error) {
      toast.error("Failed to update tagline");
      return;
    }

    toast.success("Tagline updated successfully");
    onClose();
    router.refresh();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Tagline">
      <FormField
        as="textarea"
        label="Homepage Tagline"
        rows={3}
        value={tagline}
        onChange={(e) => setTagline(e.target.value)}
        placeholder="Enter homepage tagline"
      />

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button isLoading={loading} onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
}
