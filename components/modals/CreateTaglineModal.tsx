"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import FormField from "@/components/ui/FormField";
import { createTaglineClient } from "@/lib/api/taglines";
import { handleApiError } from "@/lib/utils/errorHandler";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface CreateTaglineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTaglineModal({
  isOpen,
  onClose,
}: CreateTaglineModalProps) {
  const [tagline, setTagline] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    const trimmedTagline = tagline.trim();

    if (!trimmedTagline) {
      toast.error("Tagline cannot be empty");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creating tagline...");

    try {
      const res = await createTaglineClient({ tagline: trimmedTagline });

      if (!res?.success) {
        toast.dismiss(toastId);
        toast.error(res?.message || "Failed to create tagline");
        return;
      }

      toast.success("Tagline created successfully", { id: toastId });
      setTagline("");
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
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Tagline">
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
        <Button isLoading={loading} onClick={handleCreate}>
          Create
        </Button>
      </div>
    </Modal>
  );
}
