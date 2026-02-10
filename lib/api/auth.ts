import { clientApi, getServerApi, publicApi } from "./config/client";
import { tryServer } from "../utils/errorHandler";

export const adminLogin = async (email: string, password: string) => {
  return tryServer(
    publicApi
      .post("/admin/auth/login", { email, password })
      .then((r) => r.data),
  );
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
  const res = await clientApi.post("/admin/auth/register", payload);

  return res.data;
};

export const getAdmins = async (page = 1, limit = 10) => {
  const api = await getServerApi();
  return tryServer(
    api.get(`/admin/auth/all?page=${page}&limit=${limit}`).then((r) => r.data),
  );
};

export const refreshAdminToken = async (refreshToken: string) => {
  const api = await getServerApi();
  return tryServer(
    api
      .post("/admin/auth/refresh-token", { refreshToken })
      .then((res) => res.data),
  );
};

export const suspendAdmin = async (adminId: string, isActive: boolean) => {
  return tryServer(
    clientApi
      .patch(`/admin/auth/${adminId}/suspend`, { isActive })
      .then((res) => res.data),
  );
};

export const deleteAdmin = async (adminId: string) => {
  return tryServer(
    clientApi.delete(`/admin/auth/${adminId}`).then((res) => res.data),
  );
};

export const resetAdminPassword = async (
  adminId: string,
  newPassword: string,
) => {
  return tryServer(
    clientApi
      .patch(`/admin/auth/${adminId}/reset-password`, { newPassword })
      .then((res) => res.data),
  );
};
