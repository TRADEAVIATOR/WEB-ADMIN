import { tryServer } from "../utils/tryServer";
import { authApi } from "../axios";

export const getTransactions = async (page = 1, limit = 10) => {
  const client = await authApi();
  return tryServer(
    client
      .get(`/admin/transactions?page=${page}&limit=${limit}`)
      .then((r) => r.data)
  );
};

export const getTransaction = async (id: string) => {
  const client = await authApi();
  return tryServer(
    client.get(`/admin/transactions/${id}`).then((res) => res.data)
  );
};
