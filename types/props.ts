import { ReactNode } from "react";
import { FilterField, ModalType } from "./common";
import {
  Activity,
  CardDistribution,
  CryptoVolumeData,
  TransactionType,
} from "./models";

export interface DataTableClientProps<T> {
  initialData?: T[];
  initialPage?: number;
  totalPages?: number;
}

export interface LineChartCardProps {
  title: string;
  data?: TransactionType[];
  cryptoData?: CryptoVolumeData[];
  className?: string;
}

export interface PieChartCardProps {
  title: string;
  data: CardDistribution[];
  className?: string;
}

export interface StatCardProps {
  label: string;
  value: string;
  change: string;
  data?: number[];
  bgColor?: string;
  selectOptions?: string[];
}

export interface SelectProps {
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export interface RecentActivitiesProps {
  title?: string;
  data: Activity[];
  className?: string;
}

export interface LeaderboardCardProps {
  title: string;
  className?: string;
}

export interface GenericFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  fields: unknown;
  title?: string;
}

export interface ModalManagerProps {
  modalType: string | null;
  modalData: unknown;
  onClose: () => void;
}

export interface PageHeaderProps {
  onSearch?: (value: string) => void;
  onDateSelect?: () => void;
  showDateSelect?: boolean;
  buttonText?: string;
  buttonIcon?: ReactNode;
  modalTypeToOpen?: ModalType;
  filterFields?: FilterField[];
  buttonHref?: string;
  buttonAction?: () => void;
}
