import axios, { AxiosError } from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api-staging.usetradeaviator.com/api/v1";

interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
}

export async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await axios.post<RefreshResponse>(
      `${BASE_URL}/admin/auth/refresh-token`,
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      },
    );

    if (!response.data.accessToken) {
      throw new Error("Invalid refresh response: missing accessToken");
    }

    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken ?? refreshToken,
      accessTokenExpires: Date.now() + 55 * 60 * 1000,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      console.error("Failed to refresh access token:", {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        url: axiosError.config?.url,
        message: axiosError.message,
      });

      if (axiosError.response?.status === 404) {
        throw new Error(
          `Refresh token endpoint not found. Please verify the API endpoint: ${BASE_URL}/admin/auth/refresh-token`,
        );
      }

      if (axiosError.response?.status === 401) {
        throw new Error("Refresh token expired or invalid");
      }

      if (!axiosError.response) {
        throw new Error("Network error: Unable to reach authentication server");
      }
    }

    throw error;
  }
}
