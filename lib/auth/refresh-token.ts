import { publicApi } from "../api/config/client";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tradeaviatorbackend-8n6i.onrender.com/api/v1";

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await publicApi.post<RefreshResponse>(
      `${BASE_URL}/auth/refresh-token`,
      { refreshToken }
    );

    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      accessTokenExpires: Date.now() + 60 * 60 * 1000,
    };
  } catch (error) {
    console.error("Refresh token failed", error);
    throw error;
  }
}
