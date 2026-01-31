import { tryServer } from "../utils/errorHandler";
import { clientApi, getServerApi, publicApi } from "./config/client";

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

export const getAllCryptoPairRates = async () => {
  const api = await getServerApi();
  return tryServer(api.get("/admin/crypto").then((res) => res.data));
};

export const getAllCryptoPairRatesClient = async () => {
  return clientApi.get("/admin/crypto").then((res) => res.data);
};

export const getMarketInsights = async () => {
  return tryServer(
    publicApi.get("/crypto/market-insights").then((r) => r.data),
  );
};
