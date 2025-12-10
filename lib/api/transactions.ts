import { tryServer } from "../utils/tryServer";
import { authApi } from "../axios";

export const getTransactions = async (
  page = 1,
  limit = 10,
  status?: string
) => {
  const client = await authApi();

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (status) query.append("status", status);

  return tryServer(
    client.get(`/admin/transactions?${query.toString()}`).then((r) => r.data)
  );
};

export const getTransaction = async (id: string) => {
  const client = await authApi();
  return tryServer(
    client.get(`/admin/transactions/${id}`).then((res) => res.data)
  );
};
