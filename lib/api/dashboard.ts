import { tryServer } from "../utils/tryServer";
import { api, authApi } from "../axios";

export const getDashboardMetrics = async () => {
  const client = await authApi();
  return tryServer(client.get("/admin/dashboard").then((r) => r.data));
};

export const getDashboardGrowth = async () => {
  const client = await authApi();
  return tryServer(client.get("/admin/dashboard/growth").then((r) => r.data));
};

export const getDashboardTagline = async () => {
  const client = await authApi();
  return tryServer(
    client.get("/admin/dashboard/tagline").then((res) => res.data)
  );
};

export const updateDashboardTaglineClient = async (
  tagline: string,
  token: string
) => {
  const res = await api.put(
    "/admin/dashboard/tagline",
    { tagline },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
