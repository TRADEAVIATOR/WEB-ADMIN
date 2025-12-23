import { clientApi, getServerApi, publicApi } from "./config/client";
import { tryServer } from "../utils/errorHandler";

export const adminLogin = async (email: string, password: string) => {
  return tryServer(
    publicApi.post("/admin/auth/login", { email, password }).then((r) => r.data)
  );
};

export const getAdminProfile = async () => {
  const api = await getServerApi();
  return tryServer(api.get("/admin/auth/profile").then((res) => res.data));
};

export const logoutAdmin = async () => {
  return tryServer(clientApi.post("/admin/auth/logout"));
};

export const changeAdminPasswordClient = async (payload: {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  const res = await clientApi.post("/admin/auth/change-password", payload);

  return res.data;
};

export const createAdminUserClient = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await clientApi.post("/admin/auth/create", payload);

  return res.data;
};
