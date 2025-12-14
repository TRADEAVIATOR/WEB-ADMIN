"use client";

import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { FiEye } from "react-icons/fi";

export default function ScheduledPage() {
  const [activeTab, setActiveTab] = useState<"new" | "list">("list");
  const [scheduled, setScheduled] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "",
    priority: "",
    scheduledFor: "",
    time: "",
    isRecurring: false,
    recurringPattern: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Replace with actual API call
    // const api = await authApi();
    // await tryServer(api.post('/api/v1/admin/notifications/scheduled', formData));
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
          <h1 className="text-2xl font-bold">Scheduled Notifications</h1>
          <p className="text-sm text-gray-500 mt-1">
            Schedule notifications for future delivery
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Title"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Enter notification title"
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
            placeholder="Enter notification message"
            className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
            required
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Notification Type"
              name="type"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
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

          <h3 className="text-sm font-medium pt-2">Schedule Time</h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Date"
              name="scheduledFor"
              type="date"
              value={formData.scheduledFor}
              onChange={(e) =>
                setFormData({ ...formData, scheduledFor: e.target.value })
              }
              className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
              required
            />
            <FormField
              label="Time"
              name="time"
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isRecurring"
              checked={formData.isRecurring}
              onChange={(e) =>
                setFormData({ ...formData, isRecurring: e.target.checked })
              }
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="isRecurring" className="text-sm font-medium">
              Recurring Notification
            </label>
          </div>

          {formData.isRecurring && (
            <FormField
              label="Recurring Pattern"
              name="recurringPattern"
              value={formData.recurringPattern}
              onChange={(e) =>
                setFormData({ ...formData, recurringPattern: e.target.value })
              }
              placeholder="Select pattern"
              className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
              required
            />
          )}

          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => setActiveTab("list")}
              className="w-full py-3 text-base font-semibold rounded-full">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 text-base font-semibold rounded-full">
              {isSubmitting ? "Scheduling..." : "Schedule Notification"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
