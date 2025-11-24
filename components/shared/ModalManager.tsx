"use client";

import AddAdministratorModal from "../modals/AddAdministratorModal";
import AddCryptoRateModal from "../modals/AddCryptoRateModal";
import AddGiftcardRateModal from "../modals/AddGiftcardRateModal";
import ConfirmNewAdministratorModal from "../modals/ConfirmNewAdministratorModal";
import ConfirmNewCryptoRateModal from "../modals/ConfirmNewCryptoRateModal";
import ConfirmNewGiftcardRateModal from "../modals/ConfirmNewGiftcardRateModal";
import GenericFilterModal from "../modals/GenericFilterModal";
import GiftcardApprovalModal from "../modals/GiftcardApprovalModal";
import GiftcardRejectionModal from "../modals/GiftcardRejectionModal";
import LogoutModal from "../modals/LogoutModal";
import { ModalManagerProps } from "@/types/props";

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
