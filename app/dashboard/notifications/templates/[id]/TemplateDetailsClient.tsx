"use client";

import { ChevronLeft } from "lucide-react";
import DetailItem from "@/components/shared/DetailItem";
import { NotificationTemplate } from "@/types/models";
import { useRouter } from "next/navigation";

export default function TemplateDetailsClient({
  template,
}: {
  template: NotificationTemplate;
}) {
  const router = useRouter();

  const createdAt = template.createdAt
    ? new Date(template.createdAt).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "-";

  const updatedAt = template.updatedAt
    ? new Date(template.updatedAt).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "-";

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium mb-6 transition">
        <ChevronLeft size={18} />
        <span>Back</span>
      </button>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Template ID" value={template.id} />
            <DetailItem label="Template Name" value={template.name} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Title" value={template.title} />
            <DetailItem label="Type" value={template.type} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Priority" value={template.priority} />
            <DetailItem
              label="Status"
              value={template.isActive ? "Active" : "Inactive"}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Message Content" value={template.message} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem
              label="Variables"
              value={
                template.variables?.length ? template.variables.join(", ") : "-"
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Created At" value={createdAt} />
            <DetailItem label="Updated At" value={updatedAt} />
          </div>
        </div>
      </div>
    </div>
  );
}
