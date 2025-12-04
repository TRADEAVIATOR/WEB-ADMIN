import { tryServer } from "../utils/tryServer";
import { api, authApi } from "../axios";

export const adminLogin = async (email: string, password: string) => {
  return tryServer(
    api.post("/admin/auth/login", { email, password }).then((r) => r.data)
  );
};

export const getAdminProfile = async () => {
  const api = await authApi();
  return tryServer(api.get("/admin/auth/profile").then((res) => res.data));
};

export const logoutAdmin = async () => {
  const api = await authApi();
  return tryServer(api.post("/admin/auth/logout"));
};
