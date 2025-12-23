"use client";

import { useState } from "react";
import FormField from "@/components/ui/FormField";
import { NotificationPriority, NotificationType } from "@/types/enums";
import Button from "@/components/ui/Button";
import SelectField from "../ui/SelectField";

interface BroadcastNotificationFormData {
  notificationType: string;
  priority: string;
  title: string;
  message: string;
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
  const [formData, setFormData] = useState<BroadcastNotificationFormData>({
    notificationType: initialData?.notificationType || "",
    priority: initialData?.priority || "",
    title: initialData?.title || "",
    message: initialData?.message || "",
    deliveryChannels: initialData?.deliveryChannels || [],
    filters: {
      tier: initialData?.filters?.tier || [],
      isActive: initialData?.filters?.isActive,
      isVerified: initialData?.filters?.isVerified,
      registeredAfter: initialData?.filters?.registeredAfter || "",
      registeredBefore: initialData?.filters?.registeredBefore || "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload: BroadcastNotificationFormData = {
        notificationType: formData.notificationType,
        priority: formData.priority,
        title: formData.title,
        message: formData.message,
        deliveryChannels: formData.deliveryChannels,
      };

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
      <FormField
        label="Title"
        name="title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Enter broadcast title"
        className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
        required
      />

      <FormField
        label="Message"
        name="message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        placeholder="Enter broadcast message"
        className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
        required
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
