import { tryServer } from "../utils/errorHandler";
import { clientApi, getServerApi } from "./config/client";

export const getSupportConversations = async (page = 1, limit = 20) => {
  const api = await getServerApi();
  return tryServer(
    api
      .get(`/admin/support/conversations?page=${page}&limit=${limit}`)
      .then((r) => r.data)
  );
};

export const getConversation = async (conversationId: string) => {
  const api = await getServerApi();
  return tryServer(
    api
      .get(`/admin/support/conversations/${conversationId}`)
      .then((r) => r.data)
  );
};

export const getConversationMessages = async (conversationId: string) => {
  return clientApi
    .get(`/admin/support/conversations/${conversationId}/messages`)
    .then((r) => r.data);
};

export const updateConversation = async (
  conversationId: string,
  payload: {
    status?: string;
    priority?: string;
  }
) => {
  return clientApi
    .patch(`/admin/support/conversations/${conversationId}`, payload)
    .then((r) => r.data);
};

export const assignConversation = async (
  conversationId: string,
  adminId: string
) => {
  return clientApi
    .patch(`/admin/support/conversations/${conversationId}/assign`, {
      adminId,
    })
    .then((r) => r.data);
};

export const sendAdminReply = async (
  conversationId: string,
  message: string
) => {
  return clientApi
    .post(`/admin/support/conversations/${conversationId}/reply`, {
      message,
    })
    .then((r) => r.data);
};
