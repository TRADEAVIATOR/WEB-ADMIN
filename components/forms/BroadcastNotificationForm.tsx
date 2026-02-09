"use client";

import { useState, useRef, useEffect } from "react";
import FormField from "@/components/ui/FormField";
import { NotificationType } from "@/types/enums";
import Button from "@/components/ui/Button";
import SelectField, { SelectOption } from "../ui/SelectField";
import EmojiPicker from "emoji-picker-react";
import { Smile } from "lucide-react";
import { handleApiError } from "@/lib/utils/errorHandler";
import { getNotificationTemplatesClient } from "@/lib/api/notifications";

interface NotificationTemplate {
  id: string;
  name: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  variables: string[];
}

interface BroadcastNotificationFormData {
  notificationType: string;
  title?: string;

  message?: string;

  metadata?: Record<string, any>;
  deliveryChannels: string[];
  templateId?: string;
  templateVariables?: Record<string, string>;
  filters?: {
    tier?: string[];
    isActive?: boolean;
    isVerified?: boolean;
    registeredAfter?: string;
    registeredBefore?: string;
  };
}

interface BroadcastNotificationFormProps {
  onSubmit: (data: BroadcastNotificationFormData) => Promise<void>;
  initialData?: Partial<BroadcastNotificationFormData>;
  isEdit?: boolean;
}

export default function BroadcastNotificationForm({
  onSubmit,
  initialData,
  isEdit = false,
}: BroadcastNotificationFormProps) {
  const [useTemplate, setUseTemplate] = useState(
    Boolean(initialData?.templateId),
  );
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<NotificationTemplate | null>(null);
  const [templateVariables, setTemplateVariables] = useState<
    Record<string, string>
  >(initialData?.templateVariables || {});
  const [loadingTemplates, setLoadingTemplates] = useState(false);

  const [formData, setFormData] = useState<BroadcastNotificationFormData>({
    notificationType: initialData?.notificationType || "",
    title: initialData?.title || "",
    message: initialData?.message || "",
    deliveryChannels: initialData?.deliveryChannels || [],
    templateId: initialData?.templateId || "",
    filters: {
      tier: initialData?.filters?.tier || [],
      isActive: initialData?.filters?.isActive,
      isVerified: initialData?.filters?.isVerified,
      registeredAfter: initialData?.filters?.registeredAfter || "",
      registeredBefore: initialData?.filters?.registeredBefore || "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<
    "title" | "message" | null
  >(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (useTemplate) {
      fetchTemplates();
    }
  }, [useTemplate]);

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

  const fetchTemplates = async () => {
    setLoadingTemplates(true);
    try {
      const response = await getNotificationTemplatesClient(1, 100);
      setTemplates(response.data || []);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoadingTemplates(false);
    }
  };

  const handleTemplateSelect = (option: SelectOption | null) => {
    if (!option) {
      setSelectedTemplate(null);
      setTemplateVariables({});
      setFormData({ ...formData, templateId: "" });
      return;
    }

    const template = templates.find((t) => t.id === option.value);
    if (template) {
      setSelectedTemplate(template);
      setFormData({
        ...formData,
        templateId: template.id,
        notificationType: template.type,
      });

      const initialVars: Record<string, string> = {};
      template.variables.forEach((varName) => {
        initialVars[varName] = "";
      });
      setTemplateVariables(initialVars);
    }
  };

  const handleVariableChange = (varName: string, value: string) => {
    setTemplateVariables((prev) => ({
      ...prev,
      [varName]: value,
    }));
  };

  const handleEmojiClick = (emoji: any) => {
    if (showEmojiPicker === "title") {
      const input = titleInputRef.current;
      if (input) {
        const title = formData.title || "";
        const cursorPos = input.selectionStart ?? title.length;
        const newTitle =
          title.slice(0, cursorPos) + emoji.emoji + title.slice(cursorPos);

        setFormData({ ...formData, title: newTitle });

        setTimeout(() => {
          input.focus();
          input.setSelectionRange(
            cursorPos + emoji.emoji.length,
            cursorPos + emoji.emoji.length,
          );
        }, 0);
      }
    } else if (showEmojiPicker === "message") {
      const textarea = messageInputRef.current;
      if (textarea) {
        const message = formData.message || "";
        const cursorPos = textarea.selectionStart ?? message.length;
        const newMessage =
          message.slice(0, cursorPos) + emoji.emoji + message.slice(cursorPos);

        setFormData({ ...formData, message: newMessage });

        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(
            cursorPos + emoji.emoji.length,
            cursorPos + emoji.emoji.length,
          );
        }, 0);
      }
    }

    setShowEmojiPicker(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload: BroadcastNotificationFormData = {
        notificationType: formData.notificationType,
        deliveryChannels: formData.deliveryChannels,
      };

      if (useTemplate) {
        payload.templateId = formData.templateId;
        if (Object.keys(templateVariables).length > 0) {
          payload.templateVariables = templateVariables;
        }
      } else {
        payload.title = formData.title;
        payload.message = formData.message;
      }

      const hasFilters =
        (formData.filters?.tier && formData.filters.tier.length > 0) ||
        formData.filters?.isActive !== undefined ||
        formData.filters?.isVerified !== undefined ||
        formData.filters?.registeredAfter ||
        formData.filters?.registeredBefore;

      if (hasFilters) {
        payload.filters = {};

        if (formData.filters?.tier && formData.filters.tier.length > 0) {
          payload.filters.tier = formData.filters.tier;
        }

        if (formData.filters?.isActive !== undefined) {
          payload.filters.isActive = formData.filters.isActive;
        }

        if (formData.filters?.isVerified !== undefined) {
          payload.filters.isVerified = formData.filters.isVerified;
        }

        if (formData.filters?.registeredAfter) {
          payload.filters.registeredAfter = formData.filters.registeredAfter;
        }

        if (formData.filters?.registeredBefore) {
          payload.filters.registeredBefore = formData.filters.registeredBefore;
        }
      }

      await onSubmit(payload);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChannelToggle = (channel: string) => {
    setFormData((prev) => ({
      ...prev,
      deliveryChannels: prev.deliveryChannels.includes(channel)
        ? prev.deliveryChannels.filter((c) => c !== channel)
        : [...prev.deliveryChannels, channel],
    }));
  };

  const handleTierToggle = (tier: string) => {
    setFormData((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        tier: prev.filters?.tier?.includes(tier)
          ? prev.filters.tier.filter((t) => t !== tier)
          : [...(prev.filters?.tier || []), tier],
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <>
          <SelectField
            id="template-select"
            label="Select Template"
            value={
              selectedTemplate
                ? {
                    label: selectedTemplate.name,
                    value: selectedTemplate.id,
                  }
                : null
            }
            onChange={handleTemplateSelect}
            options={templates.map((template) => ({
              label: template.name,
              value: template.id,
            }))}
            isLoading={loadingTemplates}
            required
          />

          {selectedTemplate && (
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Template Preview
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Title:</strong> {selectedTemplate.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Message:</strong> {selectedTemplate.message}
                </p>
              </div>

              {selectedTemplate.variables.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700">
                    Template Variables
                  </p>
                  {selectedTemplate.variables.map((varName) => (
                    <FormField
                      key={varName}
                      label={varName
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                      value={templateVariables[varName] || ""}
                      onChange={(e) =>
                        handleVariableChange(varName, e.target.value)
                      }
                      placeholder={`Enter ${varName}`}
                      required
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="relative">
            <FormField
              label="Title"
              name="title"
              value={formData.title}
              ref={titleInputRef}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter broadcast title"
              className="rounded-full bg-[#F5F5F5] py-3 px-4 pr-12 text-base"
              required
            />
            <button
              type="button"
              onClick={() =>
                setShowEmojiPicker(showEmojiPicker === "title" ? null : "title")
              }
              className="absolute right-4 top-9 p-1.5 rounded-lg hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-700">
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
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Enter broadcast message"
                className="w-full rounded-2xl bg-[#F5F5F5] py-3 px-4 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={4}
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowEmojiPicker(
                    showEmojiPicker === "message" ? null : "message",
                  )
                }
                className="absolute right-4 top-3 p-1.5 rounded-lg hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-700">
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
        disabled={useTemplate && selectedTemplate !== null}
      />

      <div>
        <label className="block text-sm font-medium mb-2">
          Delivery Channels *
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
              <span className="text-sm capitalize">
                {channel.replace("_", " ")}
              </span>
            </label>
          ))}
        </div>
        {formData.deliveryChannels.length === 0 && (
          <p className="text-xs text-red-500 mt-1">
            Please select at least one delivery channel
          </p>
        )}
      </div>

      <div className="border-t border-t-gray-100 pt-4 mt-6">
        <h3 className="text-base font-semibold mb-4">
          Audience Filters (Optional)
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">User Tier</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["Free", "Basic", "Premium", "Enterprise"].map((tier) => (
                <label
                  key={tier}
                  className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.filters?.tier?.includes(tier) || false}
                    onChange={() => handleTierToggle(tier)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm">{tier}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField
              id="is-active"
              label="Active Status"
              value={{
                label:
                  formData.filters?.isActive === undefined
                    ? "All users"
                    : formData.filters.isActive
                      ? "Active only"
                      : "Inactive only",
                value:
                  formData.filters?.isActive === undefined
                    ? ""
                    : formData.filters.isActive.toString(),
              }}
              onChange={(option) =>
                setFormData({
                  ...formData,
                  filters: {
                    ...formData.filters,
                    isActive:
                      (option as { label: string; value: string }).value === ""
                        ? undefined
                        : (option as { label: string; value: string }).value ===
                          "true",
                  },
                })
              }
              options={[
                { label: "All users", value: "" },
                { label: "Active only", value: "true" },
                { label: "Inactive only", value: "false" },
              ]}
            />

            <SelectField
              id="is-verified"
              label="Verification Status"
              value={{
                label:
                  formData.filters?.isVerified === undefined
                    ? "All users"
                    : formData.filters.isVerified
                      ? "Verified only"
                      : "Unverified only",
                value:
                  formData.filters?.isVerified === undefined
                    ? ""
                    : formData.filters.isVerified.toString(),
              }}
              onChange={(option) =>
                setFormData({
                  ...formData,
                  filters: {
                    ...formData.filters,
                    isVerified:
                      (option as { label: string; value: string }).value === ""
                        ? undefined
                        : (option as { label: string; value: string }).value ===
                          "true",
                  },
                })
              }
              options={[
                { label: "All users", value: "" },
                { label: "Verified only", value: "true" },
                { label: "Unverified only", value: "false" },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Registered After"
              name="registeredAfter"
              type="date"
              value={formData.filters?.registeredAfter || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  filters: {
                    ...formData.filters,
                    registeredAfter: e.target.value,
                  },
                })
              }
              className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
            />
            <FormField
              label="Registered Before"
              name="registeredBefore"
              type="date"
              value={formData.filters?.registeredBefore || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  filters: {
                    ...formData.filters,
                    registeredBefore: e.target.value,
                  },
                })
              }
              className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 pt-4">
        <Button
          variant="outline"
          type="button"
          onClick={() => window.history.back()}
          className="w-full py-3 text-base font-semibold rounded-full">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading || formData.deliveryChannels.length === 0}
          className="w-full py-3 text-base font-semibold rounded-full">
          {isLoading
            ? "Sending..."
            : isEdit
              ? "Update Broadcast"
              : "Send Broadcast"}
        </Button>
      </div>
    </form>
  );
}
