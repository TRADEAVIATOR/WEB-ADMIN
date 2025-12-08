"use client";

import ModalManager from "@/components/shared/ModalManager";
import { createContext, useContext, useState, ReactNode } from "react";
import { ModalType } from "@/types/common";

interface ModalContextType {
  openModal: <T>(type: Exclude<ModalType, null>, data?: T) => void;
  closeModal: () => void;
  modalType: ModalType;
  modalData: unknown;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<unknown>(null);

  const openModal = <T,>(type: Exclude<ModalType, null>, data?: T) => {
    setModalType(type);
    setModalData(data ?? null);
  };

  const closeModal = () => {
    setModalType(null);
    setModalData(null);
  };

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, modalType, modalData }}>
      {children}
      <ModalManager
        modalType={modalType}
        modalData={modalData ?? []}
        onClose={closeModal}
      />
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};
