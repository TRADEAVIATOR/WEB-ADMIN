import { api } from "../axios";

export const setCryptoRateClient = async (
  payload: { valueNGN: number; baseAsset: string },
  token: string
) => {
  const res = await api.post("/admin/crypto/set-rate", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
