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
  isVerified: boolean;
  isKycVerified: boolean;
  isActive: boolean;
  wallets: Wallet[];
  virtualAccounts: VirtualAccount[];
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
  user?: {
    id: string;
    fullname: string;
    email: string;
  } | null;
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
    createdAt: string;
    type: string;
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
  id: number;
  description: string;
  details: string;
  time: string;
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
  disputes?: {
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
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
  ticketTiers: TicketTier[];
}
