import { tryServer } from "../utils/tryServer";
import { authApi } from "../axios";

export const getDashboardMetrics = async () => {
  const client = await authApi();
  return tryServer(client.get("/admin/dashboard").then((r) => r.data));
};

export const getDashboardGrowth = async () => {
  const client = await authApi();
  return tryServer(client.get("/admin/dashboard/growth").then((r) => r.data));
};
