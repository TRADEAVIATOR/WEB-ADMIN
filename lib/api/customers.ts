import { tryServer } from "@/lib/utils/tryServer";
import { authApi } from "../axios";

export const getCustomers = async (page = 1, limit = 10) => {
  const client = await authApi();
  return tryServer(
    client
      .get(`/admin/customers?page=${page}&limit=${limit}`)
      .then((r) => r.data)
  );
};

export const getCustomer = async (id: string) => {
  const client = await authApi();
  return tryServer(
    client.get(`/admin/customers/${id}`).then((res) => res.data)
  );
};

export const toggleCustomerStatus = async (id: string) => {
  const client = await authApi();
  return tryServer(
    client.patch(`/admin/customers/${id}/toggle-status`).then((res) => res.data)
  );
};
