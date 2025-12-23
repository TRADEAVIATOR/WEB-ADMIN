import { tryServer } from "../utils/errorHandler";
import { getServerApi } from "./config/client";

export const getDashboardMetrics = async () => {
  const api = await getServerApi();
  return tryServer(api.get("/admin/dashboard").then((r) => r.data));
};

export const getDashboardGrowth = async () => {
  const api = await getServerApi();
  return tryServer(api.get("/admin/dashboard/growth").then((r) => r.data));
};
