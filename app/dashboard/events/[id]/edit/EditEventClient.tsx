"use client";

import { useState } from "react";
import { editEvent } from "@/lib/api/events";
import EventForm from "@/components/forms/EventForm";
import { EventFormValues } from "@/types/forms";
import { handleApiError } from "@/lib/utils/errorHandler";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditEventClient({ initialValues, eventId }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleEditEvent = async (values: EventFormValues) => {
    setIsLoading(true);

    try {
      const res = await editEvent({ ...values }, eventId);

      if (res?.error) {
        toast.error(res?.message || "Failed to update event");
        return;
      }

      toast.success(res?.data?.message || "Event updated successfully!");
      router.push("/dashboard/events");
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      <button
        onClick={() => window.history.back()}
        disabled={isLoading}
        className="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium mb-6 transition disabled:opacity-60 disabled:cursor-not-allowed">
        <ChevronLeft size={18} />
        <span>Back</span>
      </button>

      <div className="max-w-4xl mx-auto">
        <EventForm
          initialValues={initialValues}
          onSubmit={handleEditEvent}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
