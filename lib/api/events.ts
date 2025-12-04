import { tryServer } from "../utils/tryServer";
import { EventFormValues } from "@/types/forms";
import { authApi } from "../axios";

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

interface CreateEventParams extends EventFormValues {
  eventImages?: File[];
}

export const createEvent = async (data: CreateEventParams) => {
  const api = await authApi();

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("location", data.location);

  const eventDateTime = data.time
    ? `${data.date}T${data.time}:00.000Z`
    : data.date;
  formData.append("date", eventDateTime);

  formData.append("ticketTiers", JSON.stringify(data.tickets));

  if (data.eventImages?.length) {
    data.eventImages.forEach((file) => formData.append("eventImages", file));
  }

  return tryServer(
    api
      .post("/events/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
  );
};

interface EditEventParams extends EventFormValues {
  eventId: string;
  eventImages?: File[];
}

export const editEvent = async (data: EditEventParams) => {
  const api = await authApi();

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("location", data.location);

  const eventDateTime = data.time
    ? `${data.date}T${data.time}:00.000Z`
    : data.date;
  formData.append("date", eventDateTime);

  formData.append("ticketTiers", JSON.stringify(data.tickets));

  if (data.eventImages?.length) {
    data.eventImages.forEach((file) => formData.append("eventImages", file));
  }

  return tryServer(
    api
      .put(`/events/${data.eventId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
  );
};
