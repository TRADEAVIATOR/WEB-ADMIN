import { ReactNode } from "react";

export type ModalType =
  | "add-crypto-rate"
  | "confirm-new-crypto-rate"
  | "add-giftcard-rate"
  | "confirm-new-giftcard-rate"
  | "add-new-administrator"
  | "confirm-new-administrator"
  | "logout"
  | "approve-giftcard"
  | "reject-giftcard"
  | "edit-tagline"
  | "create-tagline"
  | "view-activity-details"
  | "view-transaction-details"
  | "generic-filter"
  | "credit-wallet"
  | "debit-wallet"
  | "create-bulk-vouchers"
  | null;

export interface RowData {
  [key: string]: string | number | boolean | null | undefined | ReactNode;
}

export interface MenuItem<T = RowData> {
  label: string;
  href?: string;
  color?: string;
  onClick?: (row: T) => void;
  hidden?: (row: T) => boolean;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  hasMore: boolean;
}

export type FilterField = {
  label: string;
  name: string;
  type: "checkbox" | "select" | "text";
  options?: { label: string; value: string }[];
};
