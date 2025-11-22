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
  [key: string]: string | number | boolean | null | undefined;
}

export interface MenuItem<T = RowData> {
  label: string;
  href?: string;
  color?: string;
  onClick?: (row: T) => void;
}
