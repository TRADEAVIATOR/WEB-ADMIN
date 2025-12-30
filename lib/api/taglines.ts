import { tryServer } from "../utils/errorHandler";
import { clientApi, getServerApi } from "./config/client";

export const getTaglines = async () => {
  const api = await getServerApi();
  return tryServer(
    api.get("/admin/tags/taglines").then((res) => res.data)
  );
};

export const getTaglinesClient = async () => {
  const res = await clientApi.get("/admin/tags/tagline");
  return res.data;
};

export const createTaglineClient = async (payload: { tagline: string }) => {
  const res = await clientApi.patch("/admin/tags/tagline", payload);
  return res.data;
};

export const updateTaglineClient = async (
  index: number,
  payload: { tagline: string }
) => {
  const res = await clientApi.put(`/admin/tags/tagline/${index}`, payload);
  return res.data;
};

export const deleteTaglineClient = async (index: number) => {
  const res = await clientApi.delete(`/admin/tags/tagline/${index}`);
  return res.data;
};
