import { tryServer } from "../utils/errorHandler";
import { getServerApi } from "./config/client";

export const getVirtualCards = async (page = 1, limit = 10) => {
  const api = await getServerApi();

  return tryServer(
    api
      .get(`/admin/virtualcards?page=${page}&limit=${limit}`)
      .then((r) => r.data),
  );
};
