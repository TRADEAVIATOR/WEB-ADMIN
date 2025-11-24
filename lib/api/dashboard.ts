import { tryServer } from "../utils/tryServer";
import { api } from "../axios";

export const getDashboardMetrics = async () => {
  return tryServer(api.get("/dashboard").then((r) => r.data));
};

export const getDashboardGrowth = async () => {
  return tryServer(api.get("/dashboard/growth").then((r) => r.data));
};
