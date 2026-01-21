import { NotificationPriority, NotificationType } from "./enums";

export interface Wallet {
  depositBalance: number | string;
  referralBalance: number | string;
  cashBackBalance: number | string;
}

export interface VirtualAccount {
  bankName: string;
  accountName: string;
  accountNumber: string;
  balance: number | string;
}

export interface Customer {
  id: string;
  fullname: string;
  username: string;
  phone: string;
  email: string;
  tier: string;
  createdAt: string;
  referralCode: string;
  isVerified: boolean;
  isKycVerified: boolean;
  isActive: boolean;
  wallets: Wallet[];
  virtualAccounts: VirtualAccount[];
  transactions?: Transaction[];
}

export interface Transaction {
  id: string;
  userId: string;
  category: string;
  narration: string;
  status: string;
  type: string;
  provider: string | null;
  reference: string;
  recipient: string | null;
  accountNo: string | null;
  meterNo: string | null;
  amount: string;
  currency: string;
  createdAt: string;
  updatedAt?: string | null;
  channel?: string | null;
  fee: string | null;
  internalRef?: string | null;
  user?: {
    id: string;
    fullname: string;
    phone?: string;
    email?: string;
  } | null;
  meta?: {
    code: string;
    message: string;
    success: boolean;
    internalStatus: string;
    data: {
      status: string;
      orderNo: string;
      errorMsg: string | null;
      reference: string;
    };
  };
}

export interface RewardUser {
  id: string;
  fullname: string;
  email: string;
}

export interface Reward {
  id: string;
  type: string;
  rewardType: string;
  amount: number;
  status: string;
  narration: string;
  createdAt: string;
  redeemedAt: string;
  user: RewardUser;
}

export interface DashboardMetrics {
  overview: {
    totalUsers: number;
    totalUsersToday: number;
    activeUsers: number;
    totalBalance: number;
    normalWalletBalance: number;
    virtualAccountBalance: number;
    totalTransactions: number;
    pendingTransactions: number;
    totalCryptoVolume: number;
  };

  actionRequired: {
    giftcardRequests: number;
    pendingTransactions: number;
  };

  metrics: {
    thisMonth: Record<string, number>;
    allTime: Record<string, number>;
  };

  recentActivities: Array<{
    description: string;
    type: string;
    timeAgo: string;
  }>;
}

export interface DashboardGrowth {
  overview: {
    totalBalance: number;
    virtualCardBalance: string;
    totalUsers: number;
    totalCryptoBalance: string;
  };

  transactions: {
    total: number;
    successful: number;
    failed: number;
    pending: number;
    successRate: string;
  };

  volumes: {
    deposits: string;
    withdrawals: string;
    bills: string;
    giftcards: string;
    pendingPaymentCount: number;
  };

  charts: {
    cryptoVolumeByMonth: number[];
    transactionsByType: TransactionType[];
    virtualCardSpendingLast7Days: number[];
    cryptoDistribution: number[];
    cardsDistribution: CardDistribution[];
  };
}

export interface CryptoVolumeData {
  month: string;
  value: string;
}

export interface TransactionType {
  type: string;
  count: number;
  percentage: string;
}

export interface CardDistribution {
  count: number;
  percentage: string;
}

export interface Activity {
  id: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  description: string;
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
  };
  createdAt: string;
  timeAgo: string;
}

export interface LeaderboardItem {
  name: string;
  score: string;
  status: string;
}

export interface Ticket {
  tierId: string;
  tierName: string;
  price: string;
  currency: string;
  totalQuantity: number;
  soldQuantity: number;
  remainingQuantity: number;
  revenue: number;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  eventImageUrls: string[];
}

export interface Dispute {
  id: string;
  userId: string;
  transactionId: string;
  category: string;
  type: string;
  status: string;
  narration: string | null;
  amount: string;
  currency: string;
  channel?: string | null;
  provider?: string | null;
  reference?: string | null;
  createdAt: string;
  updatedAt: string;
  recipient?: string | null;
  recipientBank?: string | null;
  internalRef?: string | null;
  user?: {
    id: string;
    fullname: string;
    phone?: string;
    email: string;
  };
  disputes: {
    transactionId: string;
    category: string;
    reason: string;
    status: string;
    description?: string | null;
    userId: string;
  }[];
  transaction?: {
    id: string;
    amount: string;
    type: string;
    status: string;
  };
}

export interface TicketTier {
  id: string;
  tierName: string;
  price: number;
  currency: string;
  remainingQuantity: number;
  soldQuantity: number;
  revenue: number;
  description?: string;
  name: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  location: string;
  imageUrls: string[];
  ticketTiers: TicketTier[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminProfile {
  name: string;
  profilePicture?: string | null;
  email?: string;
  username?: string;
  role?: string;
  joined?: string;
  status?: string;
  permissions?: string[];
}

export interface GiftCardProduct {
  id: string;
  reloadlyId: string;
  name: string;
  country: string;
  countryCode: string;
  currency: string;
  denomination: string;
  minAmount: string;
  maxAmount: string;
  imageUrl: string;
  isActive: boolean;
  reloadlyData: unknown;
  createdAt: string;
  updatedAt: string;
}

export interface GiftCardOrder {
  id: string;
  orderReference: string;
  reference?: string;
  status: "SUCCESS" | "FAILED" | "PENDING" | string;

  cardType: string;
  giftCardType?: string;
  country: string;
  denomination: string;
  quantity: number;
  giftCardValue?: string | number;

  rate: string | number | null;
  cardTotal: string | number;
  fee: string | number;
  promoDiscount?: string | number | null;
  nairaValue: string | number;

  amount?: string | number;
  currency?: string;
  channel?: string;

  paymentMethod: "WALLET" | "CARD" | "BANK" | string;
  transactionId?: string;
  failureReason?: string | null;
  createdAt: string;
  updatedAt: string;

  user?: {
    id?: string;
    fullname: string;
    email: string;
    phone?: string | null;
    country?: string;
  };

  codes?: Array<{
    code: string;
    serial?: string | null;
  }>;

  transaction?: {
    id: string;
    amount: string | number;
    status: string;
  };

  giftCardQuantity?: number;
  giftCardReceipt?: string;
  internalRef?: string;
  walletId?: string;
  provider?: string;
  narration?: string;
  sessionId?: string;
  externalRef?: string | null;
  metertoken?: string | null;
  sender?: string | null;
  virtualAccountId?: string | null;
  providerRef?: string | null;
  waecCards?: string | null;
  waecTokens?: any[];
  jambPin?: string | null;
  txHash?: string | null;
  rewardId?: string | null;
  idempotencyKey?: string | null;
  eventId?: string | null;
  transactionValue?: string | number | null;
  dataPlan?: string | null;
  institutionBank?: string | null;
  institutionAccountNo?: string | null;
  giftcardSaleId?: string | null;
  cablePlan?: string | null;
}

export interface GiftCardSale {
  id: string;
  userId: string;
  acceptedCardId: string;

  cardType: string;
  country: string;
  countryCode: string;

  cardRange: string;
  cardValue: string;
  cardCurrency: string;

  quantity: number;
  receiptType: string;

  cardImages: string[];

  userNotes: string | null;

  buyingRate: string;
  totalCardValue: string;
  payoutAmount: string;

  promoCode: string | null;
  promoDiscount: string;

  status:
    | "SUBMITTED"
    | "REVIEWED"
    | "APPROVED"
    | "REJECTED"
    | "PAID"
    | "CANCELLED"
    | string;

  reviewedBy: string | null;
  reviewedAt: string | null;
  reviewNotes: string | null;
  rejectionReason: string | null;

  paymentMethod: string;
  transactionId: string | null;

  paidAt: string | null;

  createdAt: string;
  updatedAt: string;

  cardCode?: string | null;
  cardPin?: string | null;
}

export interface AcceptedGiftCard {
  id: string;
  cardName: string;
  cardType: string;
  country: string;
  countryCode: string;
  receiptTypes: string[];
  currency: string;
  availableRanges: string[];
  rates: Record<string, number>;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  brand?: string;
  instructions?: string;
}

export interface AcceptedGiftcard {
  id: string;
  cardName: string;
  cardType: string;
  country: string;
  countryCode: string;
  currency: string;
  brand: string;
  availableRanges: string[];
  receiptTypes: string[];
  minValue: number;
  maxValue: number;
  imageUrl: string;
  instructions: string;
  isActive: boolean;
  rates: {
    [range: string]: number | { rate: number; cashReceipt: number };
  };
  createdAt: string;
  updatedAt: string;
}

export type NotificationTemplate = {
  id: string;
  name: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  variables: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ScheduledNotification = {
  id: string;
  title: string;
  type: string;
  priority: string;
  status: string;
  isRecurring: boolean;
  scheduledFor: string;
  createdAt: string;
};

export type ConversationStatus = "OPEN" | "CLOSED";
export type ConversationPriority = "LOW" | "MEDIUM" | "HIGH";
export type SenderType = "USER" | "ADMIN";

export interface SupportUser {
  id: string;
  fullname: string;
  email: string;
  phone?: string | null;
  profilePicture?: string | null;
}

interface MessageAttachment {
  fileName: string;
  fileSize: number;
  fileType: string;
  url: string;
}

export interface SupportMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: SenderType;
  message: string;
  attachments: MessageAttachment[];
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SupportConversation {
  id: string;
  userId: string;
  subject: string;
  status: ConversationStatus;
  priority: ConversationPriority;
  assignedTo: string | null;
  category: string;
  lastMessageAt: string;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;

  user: SupportUser;
  admin: any | null;
  messages: SupportMessage[];
}
