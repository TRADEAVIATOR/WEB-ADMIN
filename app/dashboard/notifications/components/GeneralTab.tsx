"use client";

import { FiEye } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function GeneralTab() {
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-lg font-semibold">General Notification</h2>
          <p className="text-sm text-gray-500">
            Fill out these details to send a push notification to all users
          </p>
        </div>

        <button className="flex items-center gap-2 text-primary text-sm font-medium hover:underline">
          <FiEye className="text-primary text-lg" />
          Preview
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Title"
          name="title"
          placeholder="Enter title"
          className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
          required
        />
        <Input
          label="Notification body"
          name="body"
          placeholder="Enter notification message"
          className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
          required
        />
        <Input
          label="Notification type"
          name="type"
          placeholder="Select notification type"
          className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
          required
        />
        <Input
          label="Delivery channel"
          name="channel"
          placeholder="Select delivery channel"
          className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
          required
        />

        <h3 className="text-sm font-medium">Schedule Send</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Date"
            name="date"
            type="date"
            className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
            required
          />
          <Input
            label="Time"
            name="time"
            type="time"
            className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Button
            variant="outline"
            type="button"
            className="w-full py-3 text-base font-semibold rounded-full">
            Save as Draft
          </Button>
          <Button
            type="submit"
            className="w-full py-3 text-base font-semibold rounded-full">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
