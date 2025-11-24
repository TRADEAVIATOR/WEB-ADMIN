import { Pagination } from "./common";
import { Customer, Reward } from "./models";

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
