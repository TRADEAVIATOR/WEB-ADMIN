"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import FormField from "@/components/ui/FormField";
import { BulkVoucherPayload, postBulkVouchers } from "@/lib/api/voucher";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface BulkVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BulkVoucherModal({
  isOpen,
  onClose,
}: BulkVoucherModalProps) {
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!value || Number(value) <= 0) {
      toast.error("Please enter a valid voucher value.");
      return;
    }

    if (!quantity || Number(quantity) <= 0) {
      toast.error("Please enter a valid quantity.");
      return;
    }

    setLoading(true);
    setError(null);

    const payload: BulkVoucherPayload = {
      value: Number(value),
      quantity: Number(quantity),
    };

    try {
      await postBulkVouchers(payload);
      toast.success("Vouchers created successfully!");
      onClose();
      setValue("");
      setQuantity("");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message || "Failed to create vouchers. Try again.");
      setError(err?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Bulk Vouchers"
      desc="Generate multiple vouchers at once">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Voucher Value"
          type="number"
          placeholder="Enter voucher value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />

        <FormField
          label="Quantity"
          type="number"
          placeholder="Enter quantity of vouchers"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" isLoading={loading} className="ml-auto block">
          Create Vouchers
        </Button>
      </form>
    </Modal>
  );
}
