import { getSessionUser } from "./auth/session";
import axios from "axios";

const API_URL = "https://tradeaviatorbackend-8n6i.onrender.com";

export const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: { "Content-Type": "application/json" },
});

export const authApi = async () => {
  const session = await getSessionUser();

  if (!session?.accessToken) throw new Error("No access token available");

  return api.create({
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
};
