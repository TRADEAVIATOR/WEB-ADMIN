export type ModalType =
  | "add-crypto-rate"
  | "confirm-new-crypto-rate"
  | "add-giftcard-rate"
  | "confirm-new-giftcard-rate"
  | "add-new-administrator"
  | "confirm-new-administrator"
  | "logout"
  | null;

export interface RowData {
  [key: string]: string | number;
}

export interface MenuItem {
  label: string;
  href?: string;
  onClick?: (row: RowData) => void;
  color?: string;
}
