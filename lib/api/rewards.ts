import { tryServer } from "../utils/tryServer";
import { authApi } from "../axios";

export const getRewards = async (page = 1, limit = 10) => {
  const client = await authApi();
  return tryServer(
    client.get(`/admin/rewards?page=${page}&limit=${limit}`).then((r) => r.data)
  );
};
