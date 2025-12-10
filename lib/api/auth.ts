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

export const logoutAdmin = async (token: string) => {
  return tryServer(
    api.post(
      "/admin/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );
};

export const changeAdminPasswordClient = async (
  payload: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  },
  token: string
) => {
  const res = await api.post("/admin/auth/change-password", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const createAdminUserClient = async (
  payload: {
    name: string;
    email: string;
    password: string;
  },
  token: string
) => {
  const res = await api.post("/admin/auth/create", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
