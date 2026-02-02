import { clientApi, getServerApi } from "./config/client";
import { tryServer } from "../utils/errorHandler";

export const getCustomers = async (page = 1, limit = 10, search?: string) => {
  const api = await getServerApi();

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) query.append("search", search);

  return tryServer(
    api.get(`/admin/customers?${query.toString()}`).then((r) => r.data),
  );
};

export const getCustomersClient = async (page = 1, limit = 10) => {
  const res = await clientApi.get(
    `/admin/customers?page=${page}&limit=${limit}`,
  );
  return res.data;
};

export const getCustomer = async (id: string) => {
  const api = await getServerApi();
  return tryServer(api.get(`/admin/customers/${id}`).then((res) => res.data));
};

export const toggleCustomerStatusClient = async (id: string) => {
  const res = await clientApi.patch(`/admin/customers/${id}/toggle-status`);
  return res.data;
};

export const getCustomerStats = async (customerId: string) => {
  const api = await getServerApi();
  return tryServer(
    api.get(`/admin/customers/${customerId}/stats`).then((r) => r.data),
  );
};
