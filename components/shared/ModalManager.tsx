"use client";

import { Activity, Transaction } from "@/types/models";
import ActivityDetailsModal from "../modals/ActivityDetailsModal";
import AddAdministratorModal from "../modals/AddAdministratorModal";
import AddCryptoRateModal from "../modals/AddCryptoRateModal";
import AddGiftcardRateModal from "../modals/AddGiftcardRateModal";
import ConfirmNewAdministratorModal from "../modals/ConfirmNewAdministratorModal";
import ConfirmNewCryptoRateModal from "../modals/ConfirmNewCryptoRateModal";
import ConfirmNewGiftcardRateModal from "../modals/ConfirmNewGiftcardRateModal";
import EditTaglineModal from "../modals/EditTaglineModal";
import GenericFilterModal from "../modals/GenericFilterModal";
import GiftcardApprovalModal from "../modals/GiftcardApprovalModal";
import GiftcardRejectionModal from "../modals/GiftcardRejectionModal";
import TransactionDetailsModal from "../modals/TransactionDetailsModal";
import LogoutModal from "../modals/LogoutModal";
import CreateTaglineModal from "../modals/CreateTaglineModal";
import { ModalManagerProps } from "@/types/props";
import DebitWalletModal from "../modals/DebitWalletModal";
import CreditWalletModal from "../modals/CreditWalletModal";

export default function ModalManager({
  modalData,
  modalType,
  onClose,
}: ModalManagerProps) {
  switch (modalType) {
    case "add-crypto-rate":
      return <AddCryptoRateModal isOpen={true} onClose={onClose} />;

    case "add-giftcard-rate":
      return <AddGiftcardRateModal isOpen={true} onClose={onClose} />;

    case "add-new-administrator":
      return <AddAdministratorModal isOpen={true} onClose={onClose} />;

    case "logout":
      return <LogoutModal isOpen={true} onClose={onClose} />;

    case "confirm-new-crypto-rate":
      return <ConfirmNewCryptoRateModal isOpen={true} onClose={onClose} />;

    case "confirm-new-giftcard-rate":
      return <ConfirmNewGiftcardRateModal isOpen={true} onClose={onClose} />;

    case "confirm-new-administrator":
      return <ConfirmNewAdministratorModal isOpen={true} onClose={onClose} />;

    case "approve-giftcard":
      return <GiftcardApprovalModal isOpen={true} onClose={onClose} />;

    case "reject-giftcard":
      return <GiftcardRejectionModal isOpen={true} onClose={onClose} />;

    case "view-activity-details":
      return (
        <ActivityDetailsModal
          isOpen={true}
          onClose={onClose}
          activity={modalData as Activity}
        />
      );

    case "view-transaction-details":
      return (
        <TransactionDetailsModal
          isOpen={true}
          onClose={onClose}
          transaction={modalData as Transaction}
        />
      );

    case "edit-tagline":
      return (
        <EditTaglineModal
          isOpen={true}
          onClose={onClose}
          initialTagline={modalData as { index: number; tagline: string }}
        />
      );

    case "create-tagline":
      return <CreateTaglineModal isOpen={true} onClose={onClose} />;

    case "credit-wallet":
      return <CreditWalletModal isOpen={true} onClose={onClose} />;

    case "debit-wallet":
      return <DebitWalletModal isOpen={true} onClose={onClose} />;

    case "generic-filter":
      return (
        <GenericFilterModal
          isOpen={true}
          onClose={onClose}
          fields={modalData}
        />
      );

    default:
      return null;
  }
}
