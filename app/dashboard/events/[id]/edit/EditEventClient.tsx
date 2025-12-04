"use client";

import { editEvent } from "@/lib/api/events";
import EventForm from "@/components/forms/EventForm";
import { EventFormValues } from "@/types/forms";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditEventClient({ initialValues, eventId }) {
  const router = useRouter();

  const handleEditEvent = async (values: EventFormValues) => {
    const res = await editEvent({ ...values, eventId });
    if (res?.error) {
      toast.error("Failed to update event");
      return;
    }
    toast.success(res?.data?.message || "Event updated successfully!");
    router.push("/dashboard/events");
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      <button
        onClick={() => window.history.back()}
        className="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium mb-6 transition">
        <ChevronLeft size={18} />
        <span>Back</span>
      </button>

      <div className="max-w-4xl mx-auto">
        <EventForm initialValues={initialValues} onSubmit={handleEditEvent} />
      </div>
    </div>
  );
}
