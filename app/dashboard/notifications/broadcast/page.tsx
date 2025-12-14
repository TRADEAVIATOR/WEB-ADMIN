"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye } from "react-icons/fi";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { ChevronLeft } from "lucide-react";

export default function BroadcastPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    notificationType: "",
    priority: "",
    title: "",
    message: "",
    deliveryChannels: [] as string[],
    filters: {
      tier: [] as string[],
      isActive: "",
      isVerified: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Replace with actual API call
    // const api = await authApi();
    // await tryServer(api.post('/api/v1/admin/notifications/broadcast', formData));
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
        tier: prev.filters.tier.includes(tier)
          ? prev.filters.tier.filter((t) => t !== tier)
          : [...prev.filters.tier, tier],
      },
    }));
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => window.history.back()}
          className="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium mb-6 transition">
          <ChevronLeft size={18} />
          <span>Back</span>
        </button>

        <button className="flex cursor-pointer items-center gap-2 text-primary text-sm font-medium hover:underline">
          <FiEye className="text-primary text-lg" />
          Preview
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Broadcast Notification</h1>
          <p className="text-sm text-gray-500 mt-1">
            Send notifications to all users or filtered audience
          </p>
        </div>

        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              label="Title"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter broadcast title"
              className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
              required
            />

            <FormField
              label="Message"
              name="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Enter broadcast message"
              className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
              required
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                label="Notification Type"
                name="notificationType"
                value={formData.notificationType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notificationType: e.target.value,
                  })
                }
                placeholder="Select type"
                className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
                required
              />
              <FormField
                label="Priority"
                name="priority"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                placeholder="Select priority"
                className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
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
            </div>

            <div className="border-t border-t-gray-100 pt-4 mt-6">
              <h3 className="text-base font-semibold mb-4">
                Audience Filters (Optional)
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    User Tier
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {["Free", "Basic", "Premium", "Enterprise"].map((tier) => (
                      <label
                        key={tier}
                        className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.filters.tier.includes(tier)}
                          onChange={() => handleTierToggle(tier)}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <span className="text-sm">{tier}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    label="Active Status"
                    name="isActive"
                    value={formData.filters.isActive}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        filters: {
                          ...formData.filters,
                          isActive: e.target.value,
                        },
                      })
                    }
                    placeholder="All users"
                    className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
                  />
                  <FormField
                    label="Verification Status"
                    name="isVerified"
                    value={formData.filters.isVerified}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        filters: {
                          ...formData.filters,
                          isVerified: e.target.value,
                        },
                      })
                    }
                    placeholder="All users"
                    className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.back()}
                className="w-full py-3 text-base font-semibold rounded-full">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 text-base font-semibold rounded-full">
                {isLoading ? "Sending..." : "Send Broadcast"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
