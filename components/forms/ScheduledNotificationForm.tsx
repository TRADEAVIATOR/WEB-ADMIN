"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { NotificationPriority, NotificationType } from "@/types/enums";
import FormField from "@/components/ui/FormField";
import SelectField, { SelectOption } from "../ui/SelectField";
import { MultiUserSelect } from "../shared/MultiUserSelect";
import { handleApiError } from "@/lib/utils/errorHandler";

export interface ScheduledNotificationFormProps {
  initialData?: {
    title: string;
    message: string;
    type: string;
    priority: string;
    scheduledFor: string;
    isRecurring: boolean;
    recurringPattern?: string;
    targetUserIds?: string[];
    filterCriteria?: {
      tier?: string[];
      isActive?: boolean;
      isVerified?: boolean;
      registeredAfter?: string;
      registeredBefore?: string;
    };
    metadata?: Record<string, any>;
  };
  onSubmit: (data: any) => Promise<void>;
}

export default function ScheduledNotificationForm({
  initialData,
  onSubmit,
}: ScheduledNotificationFormProps) {
  const [multiUsers, setMultiUsers] = useState<SelectOption[]>([]);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    message: initialData?.message || "",
    type: initialData?.type || "",
    priority: initialData?.priority || "",
    scheduledFor: initialData?.scheduledFor
      ? initialData.scheduledFor.split("T")[0]
      : "",
    time: initialData?.scheduledFor
      ? initialData.scheduledFor.split("T")[1]?.substring(0, 5)
      : "",
    isRecurring: initialData?.isRecurring || false,
    recurringPattern: initialData?.recurringPattern || "",
    targetUserIds: initialData?.targetUserIds || [""],
    filterCriteria: initialData?.filterCriteria || {
      tier: [],
      isActive: true,
      isVerified: true,
      registeredAfter: "",
      registeredBefore: "",
    },
    metadata: initialData?.metadata || {},
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const scheduledDate = new Date(
        `${formData.scheduledFor}T${formData.time}`
      ).toISOString();

      await onSubmit({
        title: formData.title,
        message: formData.message,
        type: formData.type,
        priority: formData.priority,
        scheduledFor: scheduledDate,
        isRecurring: formData.isRecurring,
        recurringPattern: formData.recurringPattern,
        targetUserIds: multiUsers.map((u) => u.value),
        filterCriteria: formData.filterCriteria,
        metadata: formData.metadata,
      });
    } catch (err: any) {
      handleApiError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Enter notification title"
        required
      />
      <FormField
        label="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        placeholder="Enter notification message"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Date"
          type="date"
          value={formData.scheduledFor}
          onChange={(e) =>
            setFormData({ ...formData, scheduledFor: e.target.value })
          }
          required
        />
        <FormField
          label="Time"
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.isRecurring}
          onChange={(e) =>
            setFormData({ ...formData, isRecurring: e.target.checked })
          }
          className="w-4 h-4"
        />
        <label className="text-sm font-medium">Recurring Notification</label>
      </div>

      {formData.isRecurring && (
        <FormField
          label="Recurring Pattern"
          value={formData.recurringPattern}
          onChange={(e) =>
            setFormData({ ...formData, recurringPattern: e.target.value })
          }
          placeholder="Select pattern"
          required
        />
      )}

      <MultiUserSelect values={multiUsers} onChange={setMultiUsers} />

      <div className="flex gap-4 pt-4">
        <Button
          variant="outline"
          type="button"
          onClick={() => history.back()}
          className="w-full">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="w-full">
          Save Notification
        </Button>
      </div>
    </form>
  );
}
