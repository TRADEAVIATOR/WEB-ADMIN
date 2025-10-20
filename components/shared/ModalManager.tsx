"use client";

import AddAdministratorModal from "../modals/AddAdministratorModal";
import AddCryptoRateModal from "../modals/AddCryptoRateModal";
import AddGiftcardRateModal from "../modals/AddGiftcardRateModal";
import ConfirmNewAdministratorModal from "../modals/ConfirmNewAdministratorModal";
import ConfirmNewCryptoRateModal from "../modals/ConfirmNewCryptoRateModal";
import ConfirmNewGiftcardRateModal from "../modals/ConfirmNewGiftcardRateModal";
import LogoutModal from "../modals/LogoutModal";

interface ModalManagerProps {
  modalType: string | null;
  modalData: unknown;
  onClose: () => void;
}

export default function ModalManager({
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

    default:
      return null;
  }
}
