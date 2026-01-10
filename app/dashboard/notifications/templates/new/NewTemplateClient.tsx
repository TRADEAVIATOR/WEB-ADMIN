"use client";

import NotificationTemplateForm from "@/components/forms/NotificationTemplateForm";
import {
  createNotificationTemplate,
  NotificationTemplatePayload,
} from "@/lib/api/notifications";
import { handleApiError } from "@/lib/utils/errorHandler";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewTemplateClient() {
  const router = useRouter();

  const handleCreateTemplate = async (values: NotificationTemplatePayload) => {
    const toastId = toast.loading("Creating template...");

    try {
      const res = await createNotificationTemplate(values);

      toast.success(res?.message || "Template created successfully!", {
        id: toastId,
      });

      router.push("/dashboard/notifications/templates");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to create template",
        {
          id: toastId,
        }
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
          <h1 className="text-2xl font-bold">Create Template</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create a reusable notification template
          </p>
        </div>

        <NotificationTemplateForm onSubmit={handleCreateTemplate} />
      </div>
    </div>
  );
}
