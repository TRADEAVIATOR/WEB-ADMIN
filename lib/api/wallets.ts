import { tryServer } from "../utils/errorHandler";
import { clientApi, getServerApi } from "./config/client";

export const getWallets = async () => {
  const api = await getServerApi();
  return tryServer(api.get("/admin/wallets/giftbills").then((r) => r.data));
};

export interface WalletActionPayload {
  userId: string;
  amount: number;
  reason: string;
  channel: string;
}

export const postCreditWallet = async (payload: WalletActionPayload) => {
  return clientApi
    .post("/admin/wallets/credit", payload)
    .then((res) => res.data);
};

export const postDebitWallet = async (payload: WalletActionPayload) => {
  return clientApi
    .post("/admin/wallets/debit", payload)
    .then((res) => res.data);
};
