import { tryServer } from "../utils/errorHandler";
import { clientApi, getServerApi } from "./config/client";

interface GetPromoCodesParams {
  page?: number;
  limit?: number;
  isActive?: boolean;
  applicableFor?: string;
}

export const getPromoCodes = async ({
  page = 1,
  limit = 50,
  isActive,
  applicableFor,
}: GetPromoCodesParams = {}) => {
  const api = await getServerApi();

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(isActive !== undefined && { isActive: String(isActive) }),
    ...(applicableFor && { applicableFor }),
  });

  return tryServer(
    api.get(`/admin/promocode?${query.toString()}`).then((r) => r.data),
  );
};

export const getPromoCode = async (id: string) => {
  const api = await getServerApi();

  return tryServer(api.get(`/admin/promocode/${id}`).then((r) => r.data));
};

export const getPromoCodeStats = async (id: string) => {
  const api = await getServerApi();

  return tryServer(api.get(`/admin/promocode/${id}/stats`).then((r) => r.data));
};

export const deletePromoCode = async (id: string) => {
  const res = await clientApi.delete(`/admin/promocode/${id}`);
  return res.data;
};

export const createPromoCode = async (payload: any) => {
  const res = await clientApi.post("/admin/promocode", payload);
  return res.data;
};

export const updatePromoCode = async (id: string, payload: any) => {
  const res = await clientApi.put(`/admin/promocode/${id}`, payload);
  return res.data;
};
