import { clientApi, getServerApi } from "./config/client";
import { tryServer } from "../utils/errorHandler";

export const getDisputes = async (page = 1, limit = 10) => {
  const api = await getServerApi();
  return tryServer(
    api
      .get(`/admin/disputes?page=${page}&limit=${limit}`)
      .then((res) => res.data)
  );
};

export const getDispute = async (id: string) => {
  const api = await getServerApi();
  return tryServer(api.get(`/admin/disputes/${id}`).then((res) => res.data));
};

export const updateDisputeStatusClient = async (
  transactionId: string,
  status: string
) => {
  const res = await clientApi.patch(`/admin/disputes/${transactionId}`, {
    status,
  });
  return res.data;
};
