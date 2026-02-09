import { Customer, Dispute, Reward, Ticket, Transaction } from "./models";
import { Meta } from "./common";

export interface CustomersResponse {
  data: Customer[];
  meta: Meta;
}

export interface RewardsResponse {
  success: boolean;
  message: string;
  data: Reward[];
  meta: Meta;
}

export interface TicketsResponse {
  data: Ticket[];
  meta: Meta;
}

export interface TransactionsResponse {
  data: Transaction[];
  meta: Meta;
}

export interface DisputesResponse {
  data: Dispute[];
  meta: Meta;
}

export interface EventsResponse {
  message: string;
  data: Event[];
  meta: Meta;
}

export interface SendNotificationPayload {
  userIds: string[];
  notificationType: string;
  templateId?: string;
  templateVariables?: Record<string, string>;
  title?: string;
  message?: string;
  metadata?: Record<string, any>;
  deliveryChannels: string[];
}

export type BroadcastNotificationPayload = {
  notificationType: string;
  title?: string;
  message?: string;
  metadata?: Record<string, any>;
  deliveryChannels: string[];
  filters?: {
    tier?: string[];
    isActive?: boolean;
    isVerified?: boolean;
    registeredAfter?: string;
    registeredBefore?: string;
  };
};
