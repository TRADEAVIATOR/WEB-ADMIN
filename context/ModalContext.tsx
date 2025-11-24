"use client";

import ModalManager from "@/components/shared/ModalManager";
import { createContext, useContext, useState, ReactNode } from "react";
import { FilterField, ModalType } from "@/types/common";

interface ModalContextType {
  openModal: (type: Exclude<ModalType, null>, data?: FilterField[]) => void;
  closeModal: () => void;
  modalType: ModalType;
  modalData: FilterField[] | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<FilterField[] | null>(null);

  const openModal = (
    type: Exclude<ModalType, null>,
    data: FilterField[] = []
  ) => {
    setModalType(type);
    setModalData(data);
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
