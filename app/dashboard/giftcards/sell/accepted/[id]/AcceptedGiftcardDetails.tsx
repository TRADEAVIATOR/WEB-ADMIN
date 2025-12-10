"use client";

import { useRouter } from "next/navigation";
import DetailItem from "@/components/shared/DetailItem";
import { AcceptedGiftcard } from "@/types/models";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

export default function AcceptedGiftcardDetails({
  giftcard,
}: {
  giftcard: AcceptedGiftcard;
}) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      <button
        onClick={() => router.back()}
        className="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium mb-6 transition">
        <ChevronLeft size={18} />
        <span>Back</span>
      </button>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
          <DetailItem label="Card Name" value={giftcard.cardName} />
          <DetailItem label="Card Type" value={giftcard.cardType} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
          <DetailItem label="Brand" value={giftcard.brand} />
          <DetailItem
            label="Country"
            value={`${giftcard.country} (${giftcard.countryCode})`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
          <DetailItem label="Currency" value={giftcard.currency} />
          <DetailItem label="Active" value={giftcard.isActive ? "Yes" : "No"} />
        </div>

        {giftcard.availableRanges.length > 0 && (
          <div className="border-b border-gray-100 pb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">
              Available Ranges
            </p>
            <div className="flex flex-wrap gap-2">
              {giftcard.availableRanges.map((range) => (
                <span
                  key={range}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {range}
                </span>
              ))}
            </div>
          </div>
        )}

        {giftcard.receiptTypes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem
              label="Receipt Types"
              value={giftcard.receiptTypes.join(", ")}
            />
            <DetailItem
              label="Value Range"
              value={`$${giftcard.minValue} - $${giftcard.maxValue}`}
            />
          </div>
        )}

        {giftcard.rates && (
          <div className="border-b border-gray-100 pb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">Rates</p>
            <div className="flex flex-col gap-2">
              {Object.entries(giftcard.rates).map(([range, rate]) => {
                if (typeof rate === "number") {
                  return (
                    <div key={range} className="text-sm text-gray-700">
                      <span className="font-medium">{range}:</span> {rate}
                    </div>
                  );
                }
                return (
                  <div key={range} className="text-sm text-gray-700">
                    <span className="font-medium">{range}:</span> Rate:{" "}
                    {rate.rate}, Cash Receipt: {rate.cashReceipt}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {giftcard.instructions && (
          <div className="border-b border-gray-100 pb-4">
            <DetailItem label="Instructions" value={giftcard.instructions} />
          </div>
        )}

        {giftcard.imageUrl && (
          <div className="border-b border-gray-100 pb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">Card Image</p>
            <div className="w-32 h-32 relative rounded-md overflow-hidden border">
              <Image
                src={giftcard.imageUrl}
                alt="Giftcard Image"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailItem
            label="Created At"
            value={new Date(giftcard.createdAt).toLocaleString()}
          />
          <DetailItem
            label="Updated At"
            value={new Date(giftcard.updatedAt).toLocaleString()}
          />
        </div>
      </div>
    </div>
  );
}
