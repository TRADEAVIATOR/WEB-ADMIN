import { tryServer } from "../utils/errorHandler";
import { getServerApi } from "./config/client";

export const getRewards = async (page = 1, limit = 10) => {
  const api = await getServerApi();
  return tryServer(
    api.get(`/admin/rewards?page=${page}&limit=${limit}`).then((r) => r.data)
  );
};
