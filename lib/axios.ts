import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: { "Content-Type": "application/json" },
});
