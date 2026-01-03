import { ModalType } from "./common";
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
  change: string | number;
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
  title?: string;
  description?: string;

  onSearch?: (value: string) => void;
  onDateSelect?: () => void;

  showBackButton?: boolean;

  buttonText?: string;
  buttonIcon?: React.ReactNode;
  buttonHref?: string;
  buttonAction?: () => void;
  modalTypeToOpen?: ModalType;

  filterFields?: any[];
}
