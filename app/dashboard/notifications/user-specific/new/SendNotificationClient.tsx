"use client";

import { useRouter } from "next/navigation";
import { handleApiError } from "@/lib/utils/errorHandler";
import { ChevronLeft } from "lucide-react";
import { SendNotificationPayload } from "@/types/api";
import SendNotificationForm from "@/components/forms/SendNotificationForm";
import { sendNotification } from "@/lib/api/notifications";
import toast from "react-hot-toast";

export default function SendNotificationClient() {
  const router = useRouter();

  const handleSendNotification = async (values: SendNotificationPayload) => {
    const toastId = toast.loading("Sending notification...");

    try {
      const res = await sendNotification(values);

      toast.success(res?.message || "Notification sent successfully!", {
        id: toastId,
      });

      router.push("/dashboard/notifications/user-specific");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message, { id: toastId });
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
          <h1 className="text-2xl font-bold">Send Notification</h1>
          <p className="text-sm text-gray-500 mt-1">
            Send targeted notifications to users instantly
          </p>
        </div>

        <SendNotificationForm
          onSubmit={(data) => handleSendNotification(data)}
        />
      </div>
    </div>
  );
}
