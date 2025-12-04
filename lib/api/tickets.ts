import { tryServer } from "../utils/tryServer";
import { authApi } from "../axios";

export const getTickets = async (page = 1, limit = 10) => {
  const client = await authApi();
  return tryServer(
    client
      .get(`/admin/tickets?page=${page}&limit=${limit}`)
      .then((res) => res.data)
  );
};
