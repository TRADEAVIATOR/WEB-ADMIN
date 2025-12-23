"use client";

import { useState } from "react";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { SendNotificationPayload } from "@/types/api";
import { NotificationPriority, NotificationType } from "@/types/enums";
import { MultiUserSelect } from "../shared/MultiUserSelect";
import SelectField, { SelectOption } from "../ui/SelectField";
import { handleApiError } from "@/lib/utils/errorHandler";

interface SendNotificationFormProps {
  initialData?: Partial<SendNotificationPayload>;
  onSubmit: (payload: SendNotificationPayload) => Promise<void>;
  isEdit?: boolean;
}

export default function SendNotificationForm({
  initialData,
  onSubmit,
  isEdit = false,
}: SendNotificationFormProps) {
  const [multiUsers, setMultiUsers] = useState<SelectOption[]>([]);
  const [useTemplate, setUseTemplate] = useState(
    Boolean(initialData?.templateId)
  );

  const [formData, setFormData] = useState({
    userIds: initialData?.userIds?.join(", ") || "",
    notificationType: initialData?.notificationType || "",
    priority: initialData?.priority || "",
    templateId: initialData?.templateId || "",
    title: initialData?.title || "",
    message: initialData?.message || "",
    deliveryChannels: initialData?.deliveryChannels || ([] as string[]),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChannelToggle = (channel: string) => {
    setFormData((prev) => ({
      ...prev,
      deliveryChannels: prev.deliveryChannels.includes(channel)
        ? prev.deliveryChannels.filter((c) => c !== channel)
        : [...prev.deliveryChannels, channel],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload: SendNotificationPayload = {
        userIds: multiUsers.map((u) => u.value),
        notificationType: formData.notificationType,
        priority: formData.priority,
        deliveryChannels: formData.deliveryChannels,
        metadata: {},
      };

      if (useTemplate) {
        payload.templateId = formData.templateId;
      } else {
        payload.title = formData.title;
        payload.message = formData.message;
      }

      await onSubmit(payload);
    } catch (err: any) {
      handleApiError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <MultiUserSelect values={multiUsers} onChange={setMultiUsers} />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={useTemplate}
          onChange={(e) => setUseTemplate(e.target.checked)}
          className="w-4 h-4"
        />
        <span className="text-sm font-medium">Use Template</span>
      </div>

      {useTemplate ? (
        <FormField
          label="Template ID"
          value={formData.templateId}
          onChange={(e) =>
            setFormData({ ...formData, templateId: e.target.value })
          }
          required
        />
      ) : (
        <>
          <FormField
            label="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <FormField
            label="Message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          />
        </>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          id="notification-type"
          label="Notification Type"
          value={{
            label: formData.notificationType,
            value: formData.notificationType,
          }}
          onChange={(option) =>
            setFormData({
              ...formData,
              notificationType: (option as { label: string; value: string })
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

      <div>
        <label className="block text-sm font-medium mb-2">
          Delivery Channels
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["email", "in_app", "sms", "push"].map((channel) => (
            <label key={channel} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.deliveryChannels.includes(channel)}
                onChange={() => handleChannelToggle(channel)}
              />
              <span className="capitalize text-sm">
                {channel.replace("_", " ")}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
          {isEdit ? "Update Notification" : "Send Notification"}
        </Button>
      </div>
    </form>
  );
}
