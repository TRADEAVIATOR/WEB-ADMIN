import { tryServer } from "../utils/tryServer";
import { AcceptedGiftcardFormValues } from "@/components/forms/AcceptedGiftcardForm";
import { api, authApi } from "../axios";

export const getGiftCards = async (page = 1, limit = 10) => {
  const client = await authApi();
  return tryServer(
    client
      .get(`/admin/giftcards/products?page=${page}&limit=${limit}`)
      .then((r) => r.data)
  );
};

export const getGiftCardOrders = async (page = 1, limit = 10) => {
  const client = await authApi();
  return tryServer(
    client
      .get(`/admin/giftcards/orders?page=${page}&limit=${limit}`)
      .then((res) => res.data)
  );
};

export const getAcceptedGiftCards = async (page = 1, limit = 10) => {
  const client = await authApi();
  return tryServer(
    client
      .get(`/admin/giftcards/accepted-cards?page=${page}&limit=${limit}`)
      .then((res) => res.data)
  );
};

export const syncGiftCardProductsClient = async (token: string) => {
  const res = await api.post(
    "/admin/giftcards/sync",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getGiftCardOrderById = async (orderId: string) => {
  const client = await authApi();
  return tryServer(
    client.get(`/admin/giftcards/orders/${orderId}`).then((res) => res.data)
  );
};

export const getGiftCardSales = async (page = 1, limit = 10) => {
  const client = await authApi();
  return tryServer(
    client
      .get(`/admin/giftcards/sales?page=${page}&limit=${limit}`)
      .then((res) => res.data)
  );
};

export const getGiftCardSaleById = async (saleId: string) => {
  const client = await authApi();
  return tryServer(
    client.get(`/admin/giftcards/sales/${saleId}`).then((res) => res.data)
  );
};

export const getAcceptedGiftCardById = async (cardId: string) => {
  const client = await authApi();
  return tryServer(
    client
      .get(`/admin/giftcards/accepted-cards/${cardId}`)
      .then((res) => res.data)
  );
};

export const retryGiftcardOrderClient = async (
  orderId: string,
  token: string
) => {
  const res = await api.post(
    `/admin/giftcards/orders/${orderId}/retry`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const refundGiftcardOrderClient = async (
  orderId: string,
  token: string,
  reason: string
) => {
  const res = await api.post(
    `/admin/giftcards/orders/${orderId}/refund`,
    { reason },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const createAcceptedGiftcard = async (
  payload: AcceptedGiftcardFormValues,
  token: string
) => {
  const res = await api.post("/admin/giftcards/accepted", payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateAcceptedGiftcard = async (
  id: string,
  payload: AcceptedGiftcardFormValues,
  token: string
) => {
  const res = await api.put(`/admin/giftcards/accepted/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getAllCryptoPairRates = async () => {
  const client = await authApi();
  return tryServer(client.get("/admin/crypto").then((res) => res.data));
};
