"use client";

import { useState, ChangeEvent } from "react";
import Button from "@/components/ui/Button";
import { AiOutlinePlus } from "react-icons/ai";
import FormField from "../ui/FormField";
import { EventFormValues } from "@/types/forms";
import Image from "next/image";

interface EventFormProps {
  initialValues?: Partial<EventFormValues>;
  onSubmit: (values: any) => void;
  isLoading?: boolean;
}

export default function EventForm({
  initialValues,
  onSubmit,
  isLoading = false,
}: EventFormProps) {
  const [values, setValues] = useState<EventFormValues>({
    title: initialValues?.title || "",
    description: initialValues?.description || "",
    location: initialValues?.location || "",
    date: initialValues?.date || "",
    time: initialValues?.time || "",
    eventImages: initialValues?.eventImages || [],
    ticketTiers: initialValues?.ticketTiers || [],
  });

  const handleChange = (field: keyof EventFormValues, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleTicketChange = (
    index: number,
    field: keyof {
      name: string;
      quantity: number;
      price: string;
      currency: string;
    },
    value: any
  ) => {
    const updatedTickets = [...values.ticketTiers];
    updatedTickets[index] = { ...updatedTickets[index], [field]: value };
    setValues((prev) => ({ ...prev, ticketTiers: updatedTickets }));
  };

  const addTicket = () => {
    setValues((prev) => ({
      ...prev,
      ticketTiers: [
        ...prev.ticketTiers,
        { name: "", quantity: 1, price: "", currency: "" },
      ],
    }));
  };

  const removeTicket = (index: number) => {
    const updatedTickets = values.ticketTiers.filter((_, i) => i !== index);
    setValues((prev) => ({ ...prev, ticketTiers: updatedTickets }));
  };

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setValues((prev) => ({
      ...prev,
      eventImages: [...prev.eventImages, ...filesArray],
    }));
  };

  const removeImage = (index: number) => {
    const updatedImages = values.eventImages.filter((_, i) => i !== index);
    setValues((prev) => ({ ...prev, eventImages: updatedImages }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventDateTime = values.date
      ? new Date(`${values.date}T${values.time || "00:00"}`).toISOString()
      : "";

    onSubmit({
      title: values.title,
      description: values.description,
      location: values.location,
      date: eventDateTime,
      ticketTiers: values.ticketTiers,
      eventImages: values.eventImages,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Title"
        placeholder="Event Name"
        value={values.title}
        onChange={(e) => handleChange("title", e.target.value)}
        required
      />

      <FormField
        label="Description"
        placeholder="Event Description"
        value={values.description}
        onChange={(e) => handleChange("description", e.target.value)}
        as="textarea"
        rows={5}
        required
      />

      <FormField
        label="Location"
        placeholder="Event Location"
        value={values.location}
        onChange={(e) => handleChange("location", e.target.value)}
        required
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          label="Date"
          type="date"
          value={values.date}
          onChange={(e) => handleChange("date", e.target.value)}
          required
        />
        <FormField
          label="Time"
          type="time"
          value={values.time}
          onChange={(e) => handleChange("time", e.target.value)}
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">Tickets</div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={<AiOutlinePlus />}
            iconPosition="left"
            onClick={addTicket}>
            Add Ticket
          </Button>
        </div>

        {values.ticketTiers.map((ticket, index) => (
          <div key={index} className="grid grid-cols-4 gap-3 items-end">
            <FormField
              label="Name"
              placeholder="Ticket Name"
              value={ticket.name}
              onChange={(e) =>
                handleTicketChange(index, "name", e.target.value)
              }
              required
            />
            <FormField
              label="Quantity"
              placeholder="Quantity"
              type="number"
              min={1}
              value={ticket.quantity}
              onChange={(e) =>
                handleTicketChange(index, "quantity", Number(e.target.value))
              }
              required
            />
            <FormField
              label="Price"
              placeholder="Price"
              type="text"
              value={ticket.price}
              onChange={(e) =>
                handleTicketChange(index, "price", e.target.value)
              }
              required
            />
            <FormField
              label="Currency"
              placeholder="Currency"
              value={ticket.currency}
              onChange={(e) =>
                handleTicketChange(index, "currency", e.target.value)
              }
              required
            />
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => removeTicket(index)}>
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="text-lg font-bold">Event Images</div>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImagesChange}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {values.eventImages.map((file, index) => {
            const url =
              typeof file === "string"
                ? file
                : URL.createObjectURL(file as File);
            return (
              <div key={index} className="relative w-24 h-24">
                <Image
                  src={url}
                  alt={`Event ${index}`}
                  fill
                  className="object-cover rounded"
                  sizes="96px"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  &times;
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <Button type="submit" isLoading={isLoading} disabled={isLoading}>
        Save Event
      </Button>
    </form>
  );
}
