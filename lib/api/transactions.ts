import { tryServer } from "../utils/errorHandler";
import { getServerApi } from "./config/client";

export const getTransactions = async (
  page = 1,
  limit = 10,
  status?: string,
  search?: string,
) => {
  const api = await getServerApi();

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (status) query.append("status", status);
  if (search) query.append("search", search);

  return tryServer(
    api.get(`/admin/transactions?${query.toString()}`).then((r) => r.data),
  );
};

export const getTransaction = async (id: string) => {
  const api = await getServerApi();
  return tryServer(
    api.get(`/admin/transactions/${id}`).then((res) => res.data),
  );
};
