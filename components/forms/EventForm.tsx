"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { AiOutlinePlus } from "react-icons/ai";
import FormField from "../ui/FormField";
import { EventFormValues } from "@/types/forms";

interface EventFormProps {
  initialValues?: Partial<EventFormValues>;
  onSubmit: (values: EventFormValues) => void;
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
    tickets: initialValues?.tickets || [],
  });

  const handleChange = (field: keyof EventFormValues, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleTicketChange = (
    index: number,
    field: keyof {
      type: string;
      amount: number;
    },
    value: any
  ) => {
    const updatedTickets = [...values.tickets];
    updatedTickets[index] = { ...updatedTickets[index], [field]: value };
    setValues((prev) => ({ ...prev, tickets: updatedTickets }));
  };

  const addTicket = () => {
    setValues((prev) => ({
      ...prev,
      tickets: [...prev.tickets, { type: "", amount: 0 }],
    }));
  };

  const removeTicket = (index: number) => {
    const updatedTickets = values.tickets.filter((_, i) => i !== index);
    setValues((prev) => ({ ...prev, tickets: updatedTickets }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
      className="space-y-6">
      <FormField
        label="Title"
        placeholder="Event Name"
        value={values.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />

      <FormField
        label="Description"
        placeholder="Event Description"
        value={values.description}
        onChange={(e) => handleChange("description", e.target.value)}
        as="textarea"
        rows={5}
      />

      <FormField
        label="Location"
        placeholder="Event Location"
        value={values.location}
        onChange={(e) => handleChange("location", e.target.value)}
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          label="Date"
          type="date"
          value={values.date}
          onChange={(e) => handleChange("date", e.target.value)}
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

        {values.tickets.map((ticket, index) => (
          <div key={index} className="grid grid-cols-2 gap-3 items-end">
            <FormField
              label="Type"
              placeholder="Ticket Type"
              value={ticket.type}
              onChange={(e) =>
                handleTicketChange(index, "type", e.target.value)
              }
              as="select"
              options={[
                { value: "Regular", label: "Regular" },
                { value: "VIP", label: "VIP" },
                { value: "VVIP", label: "VVIP" },
              ]}
            />
            <FormField
              label="Amount"
              placeholder="Price"
              type="number"
              value={ticket.amount}
              onChange={(e) =>
                handleTicketChange(index, "amount", Number(e.target.value))
              }
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

      <Button type="submit" isLoading={isLoading}>
        Save Event
      </Button>
    </form>
  );
}
