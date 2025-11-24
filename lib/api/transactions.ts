import { tryServer } from "../utils/tryServer";
import { api } from "../axios";

export const getTransactions = async (page = 1, limit = 10) => {
  return tryServer(
    api.get(`/transactions?page=${page}&limit=${limit}`).then((r) => r.data)
  );
};
