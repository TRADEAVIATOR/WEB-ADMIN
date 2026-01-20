"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { postCreditWallet } from "@/lib/api/wallets";
import SelectField, { SelectOption } from "../ui/SelectField";
import { SingleUserSelect } from "../shared/SingleUserSelect";
import toast from "react-hot-toast";

interface CreditWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHANNEL_OPTIONS: SelectOption[] = [
  { label: "Wallet", value: "wallet" },
  { label: "Virtual", value: "virtual_account" },
];

export default function CreditWalletModal({
  isOpen,
  onClose,
}: CreditWalletModalProps) {
  const [selectedUser, setSelectedUser] = useState<SelectOption | null>(null);
  const [channel, setChannel] = useState<SelectOption | null>(null);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser) {
      toast.error("Please select a user.");
      return;
    }

    if (!channel) {
      toast.error("Please select a payment channel.");
      return;
    }

    setLoading(true);

    try {
      await postCreditWallet({
        userId: selectedUser.value,
        amount: Number(amount),
        reason,
        channel: channel.value,
      });

      toast.success("Wallet credited successfully!");
      onClose();
    } catch (err: any) {
      toast.error(err?.message || "Failed to credit wallet. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Credit User Wallet"
      desc="Add funds to a user's wallet">
      <form onSubmit={handleSubmit} className="space-y-4">
        <SingleUserSelect value={selectedUser} onChange={setSelectedUser} />

        <SelectField
          id="channel"
          label="Payment Channel"
          options={CHANNEL_OPTIONS}
          value={channel}
          onChange={(val) => setChannel(val as SelectOption)}
          placeholder="Select a channel"
          required
        />

        <FormField
          label="Amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <FormField
          label="Reason"
          placeholder="Enter reason for credit"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" isLoading={loading} className="ml-auto block">
          Proceed
        </Button>
      </form>
    </Modal>
  );
}
