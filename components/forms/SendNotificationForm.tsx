"use client";

import { useState, useRef, useEffect } from "react";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { SendNotificationPayload } from "@/types/api";
import { NotificationPriority, NotificationType } from "@/types/enums";
import { MultiUserSelect } from "../shared/MultiUserSelect";
import SelectField, { SelectOption } from "../ui/SelectField";
import { handleApiError } from "@/lib/utils/errorHandler";
import EmojiPicker from "emoji-picker-react";
import { Smile } from "lucide-react";

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
  const [showEmojiPicker, setShowEmojiPicker] = useState<
    "title" | "message" | null
  >(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

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

      <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
        <input
          type="checkbox"
          checked={useTemplate}
          onChange={(e) => setUseTemplate(e.target.checked)}
          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <span className="text-sm font-medium text-gray-700">Use Template</span>
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
          <div className="relative">
            <FormField
              label="Title"
              value={formData.title}
              ref={titleInputRef}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
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
                required
                rows={4}
                className="w-full rounded-2xl bg-[#F5F5F5] py-3 px-4 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Enter notification message"
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Delivery Channels <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["email", "in_app", "sms", "push"].map((channel) => (
            <label
              key={channel}
              className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.deliveryChannels.includes(channel)}
                onChange={() => handleChannelToggle(channel)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="capitalize text-sm text-gray-700">
                {channel.replace("_", " ")}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
          className="w-full">
          {isEdit ? "Update Notification" : "Send Notification"}
        </Button>
      </div>
    </form>
  );
}
