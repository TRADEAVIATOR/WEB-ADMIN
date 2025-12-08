"use client";

import { useRouter } from "next/navigation";
import DetailItem from "@/components/shared/DetailItem";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Event } from "@/types/models";

export default function EventDetails({ event }: { event: Event }) {
  const router = useRouter();

  const createdAt = new Date(event.createdAt).toLocaleString();
  const updatedAt = new Date(event.updatedAt).toLocaleString();
  const eventDate = new Date(event.date).toLocaleString();

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      <button
        onClick={() => router.back()}
        className="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium mb-6 transition">
        <ChevronLeft size={18} />
        <span>Back</span>
      </button>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Event ID" value={event.id} />
            <DetailItem label="Title" value={event.title} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Event Date" value={eventDate} />
            <DetailItem label="Location" value={event.location} />
          </div>

          {event.description && (
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
              <DetailItem label="Description" value={event.description} />
            </div>
          )}

          {event.imageUrls?.length > 0 && (
            <div className="space-y-3 border-b border-gray-100 pb-4">
              <h3 className="text-sm font-medium text-gray-700">Images</h3>

              <div className="flex flex-wrap gap-4">
                {event.imageUrls.map((url, i) => (
                  <div key={i} className="relative w-40 h-28">
                    <Image
                      src={url}
                      alt={`Event Image ${i + 1}`}
                      fill
                      className="rounded-lg border object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {event.ticketTiers?.length > 0 && (
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Ticket Tiers
              </h3>

              <div className="space-y-3">
                {event.ticketTiers.map((tier, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="font-semibold">{tier.name}</p>
                    <p className="text-sm text-gray-700">
                      ₦{tier.price.toLocaleString()}
                    </p>

                    {tier.description && (
                      <p className="text-xs text-gray-600 mt-1">
                        {tier.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
            <DetailItem label="Created At" value={createdAt} />
            <DetailItem label="Updated At" value={updatedAt} />
          </div>
        </div>
      </div>
    </div>
  );
}
