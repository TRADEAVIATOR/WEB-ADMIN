"use client";

import Button from "@/components/ui/Button";
import { useModal } from "@/context/ModalContext";

export default function AdminWalletActions() {
  const { openModal } = useModal();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4">
      <Button variant="success" onClick={() => openModal("credit-wallet")}>
        Credit Wallet
      </Button>
      <Button variant="danger" onClick={() => openModal("debit-wallet")}>
        Debit Wallet
      </Button>
    </div>
  );
}
