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

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: Error | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

clientApi.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.error === "RefreshAccessTokenError" && !isRefreshing) {
      console.warn("Session has refresh token error, signing out...");
      await signOut({ redirect: true, callbackUrl: "/" });
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
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return clientApi(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const session = await getSession();

        if (session?.error === "RefreshAccessTokenError") {
          processQueue(new Error("Session expired"));
          await signOut({ redirect: true, callbackUrl: "/" });
          return Promise.reject(error);
        }

        if (session?.accessToken) {
          originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
          processQueue(null);
          return clientApi(originalRequest);
        }

        processQueue(new Error("No access token"));
        if (typeof window !== "undefined") {
          await signOut({ redirect: true, callbackUrl: "/" });
        }
        return Promise.reject(error);
      } catch (refreshError) {
        processQueue(refreshError as Error);
        if (typeof window !== "undefined") {
          await signOut({ redirect: true, callbackUrl: "/" });
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
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

  serverApi.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      console.error("Server API error:", {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
      });

      return Promise.reject(error);
    },
  );

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
