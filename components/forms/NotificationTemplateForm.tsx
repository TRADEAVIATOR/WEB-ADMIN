"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { handleApiError } from "@/lib/utils/errorHandler";
import { NotificationPriority, NotificationType } from "@/types/enums";
import FormField from "@/components/ui/FormField";
import { useRouter } from "next/navigation";
import SelectField from "../ui/SelectField";

export interface NotificationTemplateFormProps {
  initialData?: {
    name: string;
    title: string;
    message: string;
    type: NotificationType;
    priority: NotificationPriority;
    variables?: string[];
  };
  onSubmit: (data: {
    name: string;
    title: string;
    message: string;
    type: NotificationType;
    priority: NotificationPriority;
    variables: string[];
  }) => Promise<void>;
}

export default function NotificationTemplateForm({
  initialData,
  onSubmit,
}: NotificationTemplateFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    title: initialData?.title || "",
    message: initialData?.message || "",
    type: initialData?.type || NotificationType.SYSTEM,
    priority: initialData?.priority || NotificationPriority.MEDIUM,
    variables: initialData?.variables?.join(", ") || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSubmit({
        ...formData,
        variables: formData.variables
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean),
      });
      router.back();
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Template Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="e.g., Welcome Email Template"
        required
      />

      <FormField
        label="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Use {{variableName}} for dynamic content"
        required
      />

      <FormField
        label="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        placeholder="Hello {{userName}}, welcome!"
        as="textarea"
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          id="notification-type"
          label="Notification Type"
          value={{ label: formData.type, value: formData.type }}
          onChange={(option) =>
            setFormData({
              ...formData,
              type: (option as { label: string; value: string })
                .value as NotificationType,
            })
          }
          options={Object.values(NotificationType).map((type) => ({
            label: type,
            value: type,
          }))}
          required
        />

        <SelectField
          id="priority"
          label="Priority"
          value={{ label: formData.priority, value: formData.priority }}
          onChange={(option) =>
            setFormData({
              ...formData,
              priority: (option as { label: string; value: string })
                .value as NotificationPriority,
            })
          }
          options={Object.values(NotificationPriority).map((priority) => ({
            label: priority,
            value: priority,
          }))}
          required
        />
      </div>

      <FormField
        label="Variables"
        value={formData.variables}
        onChange={(e) =>
          setFormData({ ...formData, variables: e.target.value })
        }
        placeholder="userName, amount, date (comma-separated)"
      />

      <div className="flex flex-col md:flex-row gap-4 pt-4">
        <Button
          variant="outline"
          type="button"
          onClick={() => router.back()}
          className="w-full">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
          className="w-full">
          Save Template
        </Button>
      </div>
    </form>
  );
}
