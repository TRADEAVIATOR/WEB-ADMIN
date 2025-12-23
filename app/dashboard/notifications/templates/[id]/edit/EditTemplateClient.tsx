"use client";

import NotificationTemplateForm from "@/components/forms/NotificationTemplateForm";
import {
  NotificationTemplatePayload,
  updateNotificationTemplate,
} from "@/lib/api/notifications";
import { handleApiError } from "@/lib/utils/errorHandler";
import { NotificationTemplate } from "@/types/models";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditTemplateClient({
  template,
  id,
}: {
  template: NotificationTemplate;
  id: string;
}) {
  const router = useRouter();

  const handleEditTemplate = async (
    id: string,
    values: NotificationTemplatePayload
  ) => {
    const toastId = toast.loading("Updating template...");

    try {
      const res = await updateNotificationTemplate(id, values);

      toast.success(res?.message || "Template updated successfully!", {
        id: toastId,
      });
      router.push("/dashboard/notifications/templates");
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
          <h1 className="text-2xl font-bold">Edit Template</h1>
          <p className="text-sm text-gray-500 mt-1">
            Update your notification template details
          </p>
        </div>

        <NotificationTemplateForm
          initialData={{
            name: template.name,
            title: template.title,
            message: template.message,
            type: template.type,
            priority: template.priority,
            variables: template.variables,
          }}
          onSubmit={(data) => handleEditTemplate(id, data)}
        />
      </div>
    </div>
  );
}
