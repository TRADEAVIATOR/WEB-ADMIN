"use client";

import { useModal } from "@/context/ModalContext";
import Button from "@/components/ui/Button";

export default function EditTaglineButton({
  currentTagline,
}: {
  currentTagline?: string;
}) {
  const { openModal } = useModal();

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => openModal("edit-homepage-tagline", currentTagline)}>
      Edit Tagline
    </Button>
  );
}
