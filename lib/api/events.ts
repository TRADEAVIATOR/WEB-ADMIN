import { tryServer } from "../utils/tryServer";
import { EventFormValues } from "@/types/forms";
import { api, authApi } from "../axios";

export const getEvents = async (page = 1, limit = 10) => {
  const client = await authApi();
  return tryServer(
    client
      .get(`/admin/events?page=${page}&limit=${limit}`)
      .then((res) => res.data)
  );
};

export const getEvent = async (id: string) => {
  const client = await authApi();
  return tryServer(client.get(`/admin/events/${id}`).then((res) => res.data));
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

  formData.append("ticketTiers", JSON.stringify(data.tickets));

  data.eventImages?.forEach((file) => formData.append("eventImages", file));

  return formData;
};

export const createEvent = async (data: EventFormValues, token: string) => {
  const formData = buildFormData(data);

  return tryServer(
    api
      .post("/admin/events/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
  );
};

export const editEvent = async (
  data: EventFormValues,
  eventId: string,
  token: string
) => {
  const formData = buildFormData(data);

  return tryServer(
    api
      .put(`/admin/events/${eventId}`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
  );
};
