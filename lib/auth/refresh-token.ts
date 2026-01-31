import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api-staging.usetradeaviator.com/api/v1";

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
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
      },
    );

    if (!response.data.accessToken || !response.data.refreshToken) {
      throw new Error("Invalid refresh response");
    }

    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      accessTokenExpires: Date.now() + 55 * 60 * 1000,
    };
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error;
  }
}
