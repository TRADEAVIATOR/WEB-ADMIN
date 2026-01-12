import {
  BroadcastNotificationPayload,
  SendNotificationPayload,
} from "@/types/api";
import { tryServer } from "../utils/errorHandler";
import { clientApi, getServerApi } from "./config/client";

export const getScheduledNotifications = async (page = 1, limit = 10) => {
  const api = await getServerApi();
  return tryServer(
    api
      .get(`/admin/notifications/scheduled?page=${page}&limit=${limit}`)
      .then((r) => r.data)
  );
};

export const getNotificationTemplates = async (page = 1, limit = 10) => {
  const api = await getServerApi();
  return tryServer(
    api
      .get(`/admin/notifications/templates?page=${page}&limit=${limit}`)
      .then((r) => r.data)
  );
};

export const getNotificationTemplatesClient = async (page = 1, limit = 10) => {
  return clientApi
    .get(`/admin/notifications/templates?page=${page}&limit=${limit}`)
    .then((r) => r.data);
};

export const getNotificationTemplate = async (id: string) => {
  const api = await getServerApi();
  return tryServer(
    api.get(`/admin/notifications/templates/${id}`).then((r) => r.data)
  );
};

export const getBroadcastNotifications = async (page = 1, limit = 10) => {
  const api = await getServerApi();
  return tryServer(
    api
      .get(`/admin/notifications/broadcasts?page=${page}&limit=${limit}`)
      .then((r) => r.data)
  );
};

export const deleteNotificationTemplateClient = async (id: string) => {
  return clientApi
    .delete(`/admin/notifications/templates/${id}`)
    .then((r) => r.data);
};

export type NotificationTemplatePayload = {
  name: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  variables: string[];
};

export const createNotificationTemplate = async (
  payload: NotificationTemplatePayload
) => {
  const res = await clientApi.post("/admin/notifications/templates", payload);
  return res.data;
};

export const updateNotificationTemplate = async (
  id: string,
  payload: NotificationTemplatePayload
) => {
  const res = await clientApi.patch(
    `/admin/notifications/templates/${id}`,
    payload
  );
  return res.data;
};

export interface ScheduledNotificationPayload {
  title: string;
  message: string;
  type: string;
  priority: string;
  scheduledFor: string;
  isRecurring: boolean;
  recurringPattern?: string;
  targetUserIds?: string[];
  filterCriteria?: any;
  metadata?: any;
}

export const createScheduledNotification = async (
  payload: ScheduledNotificationPayload
) => {
  const res = await clientApi.post("/admin/notifications/scheduled", payload);
  return res.data;
};

export const updateScheduledNotification = async (
  id: string,
  payload: ScheduledNotificationPayload
) => {
  const res = await clientApi.patch(
    `/admin/notifications/scheduled/${id}`,
    payload
  );
  return res.data;
};

export const cancelScheduledNotification = async (id: string) => {
  const res = await clientApi.post(
    `/admin/notifications/scheduled/${id}/cancel`
  );
  return res.data;
};

export const getRecurringPatterns = async () => {
  const api = await getServerApi();
  return tryServer(
    api.get("/admin/notifications/recurring-patterns").then((res) => res.data)
  );
};

export const getNotifications = async (page = 1, limit = 20) => {
  const api = await getServerApi();
  return tryServer(
    api
      .get(`/admin/notifications?page=${page}&limit=${limit}`)
      .then((r) => r.data)
  );
};

export const sendNotification = async (payload: SendNotificationPayload) => {
  const res = await clientApi.post("/admin/notifications/send", payload);
  return res.data;
};

export const createBroadcastNotification = async (
  payload: BroadcastNotificationPayload
) => {
  const res = await clientApi.post("/admin/notifications/broadcast", payload);
  return res.data;
};

export const getAllAdminNotifications = async (page = 1, limit = 20) => {
  const api = await getServerApi();
  return tryServer(
    api
      .get(`/admin/notifications/admin?page=${page}&limit=${limit}`)
      .then((r) => r.data)
  );
};

export const getAdminNotificationsClient = async (limit = 5) => {
  return clientApi
    .get(`/admin/notifications/admin?limit=${limit}`)
    .then((r) => r.data);
};

export const markNotificationAsRead = async (notificationId: string) => {
  return clientApi
    .patch(`/admin/notifications/admin/${notificationId}/read`)
    .then((r) => r.data);
};

export const getUnreadNotificationsCount = async (): Promise<number> => {
  const res = await clientApi
    .get("/admin/notifications/admin/unread-count")
    .then((r) => r.data);

  return res?.data?.count || 0;
};

export const deleteAdminNotification = async (notificationId: string) => {
  return clientApi
    .delete(`/admin/notifications/admin/${notificationId}`)
    .then((r) => r.data);
};

export const getUserSpecificNotifications = async (page = 1, limit = 50) => {
  const api = await getServerApi();
  return tryServer(
    api
      .get(`/admin/notifications/user-specific?page=${page}&limit=${limit}`)
      .then((r) => r.data)
  );
};

export const getNotificationAnalytics = async () => {
  const api = await getServerApi();
  return tryServer(
    api.get("/admin/notifications/analytics").then((res) => res.data.data)
  );
};
