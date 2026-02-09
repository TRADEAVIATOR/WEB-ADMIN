import { EventFormValues } from "@/types/forms";
import { clientApi, getServerApi } from "./config/client";
import { tryServer } from "../utils/errorHandler";

export const getEvents = async (page = 1, limit = 10) => {
  const api = await getServerApi();
  return tryServer(
    api
      .get(`/admin/events?page=${page}&limit=${limit}`)
      .then((res) => res.data),
  );
};

export const getEvent = async (id: string) => {
  const api = await getServerApi();
  return tryServer(api.get(`/admin/events/${id}`).then((res) => res.data));
};

const buildFormData = (data: EventFormValues) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("location", data.location);

  const eventDateTime = data.time
    ? `${data.date}T${data.time}:00.000Z`
    : data.date;
  formData.append("date", eventDateTime);

  formData.append("ticketTiers", JSON.stringify(data.ticketTiers || []));

  const imagesArray = Array.isArray(data.eventImages) ? data.eventImages : [];
  imagesArray.forEach((file) => {
    formData.append("eventImages", file);
  });

  return formData;
};

export const createEvent = async (data: EventFormValues) => {
  const formData = buildFormData(data);

  return tryServer(
    clientApi.post("/admin/events", formData, {}).then((res) => res.data),
  );
};

export const editEvent = async (data: EventFormValues, eventId: string) => {
  const formData = buildFormData(data);

  return tryServer(
    clientApi.put(`/admin/events/${eventId}`, formData).then((res) => res.data),
  );
};
