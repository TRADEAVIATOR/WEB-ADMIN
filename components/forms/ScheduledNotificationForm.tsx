"use client";

import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";
import { NotificationPriority, NotificationType } from "@/types/enums";
import FormField from "@/components/ui/FormField";
import SelectField, { SelectOption } from "../ui/SelectField";
import { MultiUserSelect } from "../shared/MultiUserSelect";
import { handleApiError } from "@/lib/utils/errorHandler";
import EmojiPicker from "emoji-picker-react";
import { Smile } from "lucide-react";

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
  const [showEmojiPicker, setShowEmojiPicker] = useState<
    "title" | "message" | null
  >(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(null);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleEmojiClick = (emoji: any) => {
    if (showEmojiPicker === "title") {
      const input = titleInputRef.current;
      if (input) {
        const cursorPos = input.selectionStart || formData.title.length;
        const newTitle =
          formData.title.slice(0, cursorPos) +
          emoji.emoji +
          formData.title.slice(cursorPos);
        setFormData({ ...formData, title: newTitle });
        setTimeout(() => {
          input.focus();
          input.setSelectionRange(
            cursorPos + emoji.emoji.length,
            cursorPos + emoji.emoji.length
          );
        }, 0);
      }
    } else if (showEmojiPicker === "message") {
      const textarea = messageInputRef.current;
      if (textarea) {
        const cursorPos = textarea.selectionStart || formData.message.length;
        const newMessage =
          formData.message.slice(0, cursorPos) +
          emoji.emoji +
          formData.message.slice(cursorPos);
        setFormData({ ...formData, message: newMessage });
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(
            cursorPos + emoji.emoji.length,
            cursorPos + emoji.emoji.length
          );
        }, 0);
      }
    }
    setShowEmojiPicker(null);
  };

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
      <div className="relative">
        <FormField
          label="Title"
          value={formData.title}
          ref={titleInputRef}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter notification title"
          required
        />
        <button
          type="button"
          onClick={() =>
            setShowEmojiPicker(showEmojiPicker === "title" ? null : "title")
          }
          className="absolute right-3 top-9 p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700">
          <Smile size={18} />
        </button>
        {showEmojiPicker === "title" && (
          <div
            ref={emojiPickerRef}
            className="absolute right-0 top-full mt-2 z-50 shadow-xl">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <textarea
            ref={messageInputRef}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder="Enter notification message"
            required
            rows={4}
            className="w-full rounded-2xl bg-[#F5F5F5] py-3 px-4 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
          <button
            type="button"
            onClick={() =>
              setShowEmojiPicker(
                showEmojiPicker === "message" ? null : "message"
              )
            }
            className="absolute right-3 top-3 p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700">
            <Smile size={18} />
          </button>
        </div>
        {showEmojiPicker === "message" && (
          <div
            ref={emojiPickerRef}
            className="absolute right-0 top-full mt-2 z-50 shadow-xl">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>

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

      <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
        <input
          type="checkbox"
          checked={formData.isRecurring}
          onChange={(e) =>
            setFormData({ ...formData, isRecurring: e.target.checked })
          }
          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <label className="text-sm font-medium text-gray-700">
          Recurring Notification
        </label>
      </div>

      {formData.isRecurring && (
        <SelectField
          id="recurring-pattern"
          label="Recurring Pattern"
          value={{
            label: formData.recurringPattern,
            value: formData.recurringPattern,
          }}
          onChange={(option) =>
            setFormData({
              ...formData,
              recurringPattern: (option as { label: string; value: string })
                .value,
            })
          }
          options={[
            { label: "Daily", value: "daily" },
            { label: "Weekly", value: "weekly" },
            { label: "Monthly", value: "monthly" },
            { label: "Yearly", value: "yearly" },
          ]}
          required
        />
      )}

      <MultiUserSelect values={multiUsers} onChange={setMultiUsers} />

      <div className="flex gap-4 pt-4">
        <Button
          variant="outline"
          type="button"
          onClick={() => window.history.back()}
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
