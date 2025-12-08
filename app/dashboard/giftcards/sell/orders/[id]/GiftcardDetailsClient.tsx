"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import DetailItem from "@/components/shared/DetailItem";
import { ChevronLeft } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import Image from "next/image";

export default function GiftcardDetailsClient() {
  const router = useRouter();
  const { openModal } = useModal();

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      <button
        onClick={() => router.back()}
        className="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium mb-6 transition">
        <ChevronLeft size={18} />
        <span>Back</span>
      </button>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="ID" value="#TA-231001" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Amount" value="$200" />
            <DetailItem label="Transaction ID" value="#TA-231001" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Type" value="No receipt" />
            <DetailItem label="Note" value="—" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Date" value="Sep 7, 2025 — 12:24 PM" />
            <DetailItem label="Promo Code" value="—" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Giftcard Images
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-full h-28 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  className="w-full h-full object-cover"
                  src={`/images/giftcards/sample-${i}.jpg`}
                  alt={`Giftcard Image ${i}`}
                  width={300}
                  height={200}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
          <Button
            variant="danger"
            size="md"
            className="px-8"
            onClick={() => openModal("reject-giftcard")}>
            Reject
          </Button>

          <Button
            variant="primary"
            size="md"
            className="px-8"
            onClick={() => openModal("approve-giftcard")}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
