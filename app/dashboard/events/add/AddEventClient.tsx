"use client";

import { useState } from "react";
import EventForm from "@/components/forms/EventForm";
import { handleApiError } from "@/lib/utils/errorHandler";
import { createEvent } from "@/lib/api/events";
import { EventFormValues } from "@/types/forms";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddEventClient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddEvent = async (values: EventFormValues) => {
    setIsLoading(true);

    try {
      const res = await createEvent(values);

      if (res?.error) {
        toast.error(res?.message || "Failed to create event");
        return;
      }

      toast.success(res?.data?.message || "Event created successfully!");
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
        className="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium mb-6 transition"
        disabled={isLoading}>
        <ChevronLeft size={18} />
        <span>Back</span>
      </button>

      <div className="max-w-4xl mx-auto">
        <EventForm onSubmit={handleAddEvent} isLoading={isLoading} />
      </div>
    </div>
  );
}
