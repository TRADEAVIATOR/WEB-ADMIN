"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import FormField from "@/components/ui/FormField";
import { updateTaglineClient } from "@/lib/api/taglines";
import { handleApiError } from "@/lib/utils/errorHandler";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface EditTaglineModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTagline?: { index: number; tagline: string };
}

export default function EditTaglineModal({
  isOpen,
  onClose,
  initialTagline = { index: 0, tagline: "" },
}: EditTaglineModalProps) {
  const [tagline, setTagline] = useState(initialTagline.tagline);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTagline(initialTagline.tagline);
  }, [initialTagline]);

  const handleSave = async () => {
    const trimmedTagline = tagline.trim();

    if (!trimmedTagline) {
      toast.error("Tagline cannot be empty");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Updating tagline...");

    try {
      const res = await updateTaglineClient(initialTagline.index, {
        tagline: trimmedTagline,
      });

      if (!res?.success) {
        toast.dismiss(toastId);
        toast.error(res?.message || "Failed to update tagline");
        return;
      }

      toast.success("Tagline updated successfully", { id: toastId });
      onClose();
      router.refresh();
    } catch (error: any) {
      toast.dismiss(toastId);
      handleApiError(error);
    } finally {
      setLoading(false);
    }
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
        required
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
