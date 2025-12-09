"use client";

import EventForm from "@/components/forms/EventForm";
import { createEvent } from "@/lib/api/events";
import { EventFormValues } from "@/types/forms";
import { ChevronLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddEventClient() {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.accessToken ?? "";

  const handleAddEvent = async (values: EventFormValues) => {
    const res = await createEvent(values, token);
    if (res?.error) {
      toast.error("Failed to create event");
      return;
    }
    toast.success(res?.data?.message || "Event created successfully!");
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
        <EventForm onSubmit={handleAddEvent} />
      </div>
    </div>
  );
}
