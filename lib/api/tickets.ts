import { tryServer } from "../utils/errorHandler";
import { getServerApi } from "./config/client";

export const getTickets = async (page = 1, limit = 10) => {
  const api = await getServerApi();
  return tryServer(
    api
      .get(`/admin/tickets?page=${page}&limit=${limit}`)
      .then((res) => res.data)
  );
};
