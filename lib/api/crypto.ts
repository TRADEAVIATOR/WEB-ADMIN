import { clientApi } from "./config/client";

export const setCryptoRateClient = async (payload: {
  valueNGN: number;
  baseAsset: string;
}) => {
  const res = await clientApi.post("/admin/crypto/set-rate", payload);

  return res.data;
};

export const deleteCryptoRateClient = async (baseAsset: string) => {
  const res = await clientApi.delete(`/admin/crypto/${baseAsset}`);

  return res.data;
};

export const getCryptoAssets = async () => {
  return clientApi.get("/admin/crypto/assets").then((r) => r.data);
};
