import { tryServer } from "@/lib/utils/tryServer";
import { api, authApi } from "../axios";

export const getDisputes = async (page = 1, limit = 10) => {
  const api = await authApi();
  return tryServer(
    api
      .get(`/admin/disputes?page=${page}&limit=${limit}`)
      .then((res) => res.data)
  );
};

export const getDispute = async (id: string) => {
  const api = await authApi();
  return tryServer(api.get(`/admin/disputes/${id}`).then((res) => res.data));
};

export const updateDisputeStatusClient = async (
  transactionId: string,
  status: string,
  token: string
) => {
  const res = await api.patch(
    `/admin/disputes/${transactionId}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
