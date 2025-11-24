import { tryServer } from "../utils/tryServer";
import { api } from "../axios";

export const getRewards = async (page = 1, limit = 10) => {
  return tryServer(
    api.get(`/rewards?page=${page}&limit=${limit}`).then((r) => r.data)
  );
};
