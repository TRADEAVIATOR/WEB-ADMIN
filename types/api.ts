import { Customer, Dispute, Reward, Ticket, Transaction } from "./models";
import { Pagination } from "./common";

export interface CustomersResponse {
  customers: Customer[];
  pagination: Pagination;
}

export interface RewardsResponse {
  success: boolean;
  message: string;
  results: Reward[];
  pagination: Pagination;
}

export interface TicketsResponse {
  results: Ticket[];
  pagination: Pagination;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  pagination: Pagination;
}

export interface DisputesResponse {
  transactions: Dispute[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
    hasMore: boolean;
  };
}

export interface EventsResponse {
  message: string;
  results: Event[];
  pagination: Pagination;
}
