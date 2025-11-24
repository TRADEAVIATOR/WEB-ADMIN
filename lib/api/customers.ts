import { tryServer } from "@/lib/utils/tryServer";
import { api } from "@/lib/axios";

export const getCustomers = async (page = 1, limit = 10) => {
  return tryServer(
    api.get(`/customers?page=${page}&limit=${limit}`).then((r) => r.data)
  );
};

export const getCustomer = async (id: string) => {
  return tryServer(api.get(`/customers/${id}`).then((res) => res.data));
};

export const toggleCustomerStatus = async (id: string) => {
  return tryServer(
    api.patch(`/customers/${id}/toggle-status`).then((res) => res.data)
  );
};
