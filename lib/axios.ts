import axios from "axios";

const API_URL = "https://tradeaviatorbackend-8n6i.onrender.com";

export const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: { "Content-Type": "application/json" },
});
