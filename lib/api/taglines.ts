import { tryServer } from "../utils/errorHandler";
import { clientApi, getServerApi } from "./config/client";

export const getTaglines = async () => {
  const api = await getServerApi();
  return tryServer(
    api.get("/admin/dashboard/taglines").then((res) => res.data)
  );
};

export const getTaglinesClient = async () => {
  const res = await clientApi.get("/admin/dashboard/tagline");
  return res.data;
};

export const createTaglineClient = async (payload: { tagline: string }) => {
  const res = await clientApi.patch("/admin/dashboard/tagline", payload);
  return res.data;
};

export const updateTaglineClient = async (
  index: number,
  payload: { tagline: string }
) => {
  const res = await clientApi.put(`/admin/dashboard/tagline/${index}`, payload);
  return res.data;
};

export const deleteTaglineClient = async (index: number) => {
  const res = await clientApi.delete(`/admin/dashboard/tagline/${index}`);
  return res.data;
};
