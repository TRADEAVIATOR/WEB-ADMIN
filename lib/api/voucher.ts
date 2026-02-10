import { tryServer } from "../utils/errorHandler";
import { clientApi, getServerApi } from "./config/client";

export const getVouchers = async (page = 1, limit = 10) => {
  const api = await getServerApi();
  return tryServer(
    api.get(`/admin/vouchers?page=${page}&limit=${limit}`).then((r) => r.data),
  );
};

export interface BulkVoucherPayload {
  value: number;
  quantity: number;
}

export const postBulkVouchers = async (payload: BulkVoucherPayload) => {
  return clientApi
    .post("/admin/vouchers/bulk", payload)
    .then((res) => res.data);
};
