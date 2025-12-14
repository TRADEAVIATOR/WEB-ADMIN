"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Transaction } from "@/types/models";

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export default function TransactionDetailsModal({
  isOpen,
  onClose,
  transaction,
}: TransactionDetailsModalProps) {
  if (!transaction) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transaction Details">
      <div className="flex flex-col gap-3 text-sm text-gray-700">
        <Detail label="User ID" value={transaction.userId} />
        <Detail label="Category" value={transaction.category} />
        <Detail label="Type" value={transaction.type} />
        <Detail label="Status" value={transaction.status} />
        <Detail
          label="Amount"
          value={`${transaction.amount} ${transaction.currency.toUpperCase()}`}
        />
        <Detail label="Currency" value={transaction.currency.toUpperCase()} />
        <Detail label="Recipient" value={transaction.recipient || "-"} />
        <Detail
          label="Created At"
          value={new Date(transaction.createdAt).toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        />
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
}

function Detail({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p>{value}</p>
    </div>
  );
}
