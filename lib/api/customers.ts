import { tryServer } from "@/lib/utils/tryServer";
import { api, authApi } from "../axios";

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

export const toggleCustomerStatusClient = async (id: string, token: string) => {
  const res = await api.patch(
    `/admin/customers/${id}/toggle-status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
