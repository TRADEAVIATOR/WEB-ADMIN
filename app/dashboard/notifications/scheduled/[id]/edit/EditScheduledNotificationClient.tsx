"use client";

import ScheduledNotificationForm from "@/components/forms/ScheduledNotificationForm";
import {
  ScheduledNotificationPayload,
  updateScheduledNotification,
} from "@/lib/api/notifications";
import { handleApiError } from "@/lib/utils/errorHandler";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditScheduledNotificationClient({
  id,
  scheduledNotification,
}: {
  id: string;
  scheduledNotification: any;
}) {
  const router = useRouter();

  const handleEditSchedule = async (
    id: string,
    values: ScheduledNotificationPayload,
  ) => {
    const toastId = toast.loading("Updating scheduled notification...");

    try {
      const res = await updateScheduledNotification(id, values);
      toast.success(
        res?.message || "Scheduled notification updated successfully!",
        { id: toastId },
      );
      router.push("/dashboard/notifications/scheduled");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to schedule notification",
        { id: toastId },
      );
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
          <h1 className="text-2xl font-bold">Edit Scheduled Notification</h1>
          <p className="text-sm text-gray-500 mt-1">
            Update your scheduled notification details
          </p>
        </div>

        <ScheduledNotificationForm
          initialData={scheduledNotification}
          onSubmit={(data) => handleEditSchedule(id, data)}
        />
      </div>
    </div>
  );
}
