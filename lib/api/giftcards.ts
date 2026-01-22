import { clientApi, getServerApi } from "./config/client";
import { tryServer } from "../utils/errorHandler";

export const getGiftCards = async (page = 1, limit = 10) => {
  const api = await getServerApi();
  return tryServer(
    api
      .get(`/admin/giftcards/products?page=${page}&limit=${limit}`)
      .then((r) => r.data),
  );
};

export const getGiftCardOrders = async (page = 1, limit = 10) => {
  const api = await getServerApi();
  return tryServer(
    api
      .get(`/admin/giftcards/orders?page=${page}&limit=${limit}`)
      .then((res) => res.data),
  );
};

export const getAcceptedGiftCards = async (page = 1, limit = 10) => {
  const api = await getServerApi();
  return tryServer(
    api
      .get(`/admin/giftcards/accepted-cards?page=${page}&limit=${limit}`)
      .then((res) => res.data),
  );
};

export const syncGiftCardProductsClient = async () => {
  const res = await clientApi.post("/admin/giftcards/sync");
  return res.data;
};

export const getGiftCardOrderById = async (orderId: string) => {
  const api = await getServerApi();
  return tryServer(
    api.get(`/admin/giftcards/orders/${orderId}`).then((res) => res.data),
  );
};

export const getGiftCardSales = async (page = 1, limit = 10) => {
  const api = await getServerApi();
  return tryServer(
    api
      .get(`/admin/giftcards/sales?page=${page}&limit=${limit}`)
      .then((res) => res.data),
  );
};

export const getGiftCardSaleById = async (saleId: string) => {
  const api = await getServerApi();
  return tryServer(
    api.get(`/admin/giftcards/sales/${saleId}`).then((res) => res.data),
  );
};

export const getAcceptedGiftCardById = async (cardId: string) => {
  const api = await getServerApi();
  return tryServer(
    api
      .get(`/admin/giftcards/accepted-cards/${cardId}`)
      .then((res) => res.data),
  );
};

export const retryGiftcardOrderClient = async (orderId: string) => {
  const res = await clientApi.post(`/admin/giftcards/orders/${orderId}/retry`);

  return res.data;
};

export const refundGiftcardOrderClient = async (
  orderId: string,
  reason: string,
) => {
  const res = await clientApi.post(
    `/admin/giftcards/orders/${orderId}/refund`,
    { reason },
  );

  return res.data;
};

export const createAcceptedGiftcard = async (payload: FormData) => {
  const res = await clientApi.post("/admin/giftcards/accepted-card", payload);
  return res.data;
};

export const updateAcceptedGiftcard = async (id: string, payload: FormData) => {
  const res = await clientApi.put(`/admin/giftcards/accepted/${id}`, payload);
  return res.data;
};

export const reviewGiftCardSale = async (saleId: string) => {
  const res = await clientApi.post(`/admin/giftcards/sales/${saleId}/review`);
  return res.data;
};

export const rejectGiftCardSales = async (saleId: string, reason: string) => {
  const res = await clientApi.post(`/admin/giftcards/sales/reject`, {
    saleId: saleId,
    rejectionReason: reason,
  });
  return res.data;
};

export const processGiftCardPayout = async (saleId: string) => {
  const res = await clientApi.post(`/admin/giftcards/sales/process-payout`, {
    saleId: saleId,
  });
  return res.data;
};
