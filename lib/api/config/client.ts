import { getSession, signOut } from "next-auth/react";
import axios, { AxiosInstance, AxiosError } from "axios";
import { auth } from "../../auth/session";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api-staging.usetradeaviator.com/api/v1";

export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const clientApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

clientApi.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.error === "RefreshAccessTokenError") {
      await signOut({ redirect: true, callbackUrl: "/login" });
      return Promise.reject(new Error("Session expired"));
    }

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

clientApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const session = await getSession();

        if (session?.error === "RefreshAccessTokenError") {
          await signOut({ redirect: true, callbackUrl: "/login" });
          return Promise.reject(error);
        }

        if (session?.accessToken) {
          originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
          return clientApi(originalRequest);
        }
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          await signOut({ redirect: true, callbackUrl: "/login" });
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export async function getServerApi(): Promise<AxiosInstance> {
  const session = await auth();

  const serverApi = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...(session?.accessToken && {
        Authorization: `Bearer ${session.accessToken}`,
      }),
    },
  });

  return serverApi;
}

export function createApiWithToken(token?: string): AxiosInstance {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
}
