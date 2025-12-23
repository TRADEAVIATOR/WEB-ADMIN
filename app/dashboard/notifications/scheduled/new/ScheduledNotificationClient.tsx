"use client";

import ScheduledNotificationForm from "@/components/forms/ScheduledNotificationForm";
import {
  createScheduledNotification,
  ScheduledNotificationPayload,
} from "@/lib/api/notifications";
import { handleApiError } from "@/lib/utils/errorHandler";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ScheduledNotificationClient() {
  const router = useRouter();

  const handleCreateSchedule = async (values: ScheduledNotificationPayload) => {
    const toastId = toast.loading("Scheduling notification...");

    try {
      const res = await createScheduledNotification(values);
      toast.success(res?.message || "Notification scheduled successfully!", {
        id: toastId,
      });
      router.push("/dashboard/notifications/scheduled");
    } catch (error: any) {
      handleApiError(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      <button
        onClick={() => router.back()}
        className="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium mb-6 transition">
        <ChevronLeft size={18} />
        <span>Back</span>
      </button>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Create Scheduled Notification</h1>
          <p className="text-sm text-gray-500 mt-1">
            Schedule a notification for future delivery
          </p>
        </div>

        <ScheduledNotificationForm
          onSubmit={(data) => handleCreateSchedule(data)}
        />
      </div>
    </div>
  );
}
