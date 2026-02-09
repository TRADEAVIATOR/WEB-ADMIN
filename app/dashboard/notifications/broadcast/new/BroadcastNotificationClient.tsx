"use client";

import { useRouter } from "next/navigation";
import { handleApiError } from "@/lib/utils/errorHandler";
import { ChevronLeft } from "lucide-react";
import BroadcastNotificationForm from "@/components/forms/BroadcastNotificationForm";
import { createBroadcastNotification } from "@/lib/api/notifications";
import toast from "react-hot-toast";

interface BroadcastNotificationPayload {
  notificationType: string;
  title?: string;
  message?: string;
  metadata?: Record<string, any>;
  deliveryChannels: string[];
  filters?: {
    tier?: string[];
    isActive?: boolean;
    isVerified?: boolean;
    registeredAfter?: string;
    registeredBefore?: string;
  };
}

export default function BroadcastNotificationClient() {
  const router = useRouter();
  const handleBroadcastNotification = async (
    values: BroadcastNotificationPayload,
  ) => {
    const toastId = toast.loading("Sending broadcast notification...");

    try {
      const res = await createBroadcastNotification(values);

      toast.success(
        res?.message || "Broadcast notification sent successfully!",
        {
          id: toastId,
        },
      );

      router.push("/dashboard/notifications/broadcast");
      router.refresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to send broadcast notification",
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
          <h1 className="text-2xl font-bold">Broadcast Notification</h1>
          <p className="text-sm text-gray-500 mt-1">
            Send notifications to all users or filtered audience
          </p>
        </div>

        <BroadcastNotificationForm
          onSubmit={(data) => handleBroadcastNotification(data)}
        />
      </div>
    </div>
  );
}
