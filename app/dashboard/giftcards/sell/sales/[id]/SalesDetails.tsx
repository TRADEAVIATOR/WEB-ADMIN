"use client";

import { useRouter } from "next/navigation";
import DetailItem from "@/components/shared/DetailItem";
import { GiftCardSale } from "@/types/models";
import { ChevronLeft } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";
import Image from "next/image";
import GiftCardActions from "./GiftCardActions";

export default function SalesDetails({ sale }: { sale: GiftCardSale }) {
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
          <DetailItem label="Sale ID" value={sale.id} />
          <DetailItem label="User ID" value={sale.userId} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
          <DetailItem label="Status" value={sale.status} />
          <DetailItem label="Payment Method" value={sale.paymentMethod} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
          <DetailItem label="Card Type" value={sale.cardType} />
          <DetailItem
            label="Country"
            value={`${sale.country} (${sale.countryCode})`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
          <DetailItem label="Card Range" value={sale.cardRange} />
          <DetailItem
            label="Card Value"
            value={`${sale.cardValue} ${sale.cardCurrency}`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
          <DetailItem label="Quantity" value={String(sale.quantity)} />
          <DetailItem label="Receipt Type" value={sale.receiptType} />
        </div>

        {sale.cardImages && sale.cardImages.length > 0 && (
          <div className="border-b border-gray-100 pb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">
              Card Images:
            </p>
            <div className="flex gap-4 flex-wrap">
              {sale.cardImages.map((img, i) => (
                <div
                  key={i}
                  className="w-28 h-28 relative rounded-md border overflow-hidden">
                  <Image
                    src={img}
                    alt="Card Image"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
          <DetailItem label="Buying Rate" value={`₦${sale.buyingRate}`} />
          <DetailItem
            label="Total Card Value"
            value={`${sale.totalCardValue} ${sale.cardCurrency}`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
          <DetailItem
            label="Payout Amount"
            value={formatCurrency(sale.payoutAmount)}
          />
          <DetailItem
            label="Promo Discount"
            value={sale.promoDiscount ?? "0"}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
          <DetailItem label="Promo Code" value={sale.promoCode ?? "-"} />
          <DetailItem label="User Notes" value={sale.userNotes ?? "-"} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
          <DetailItem label="Reviewed By" value={sale.reviewedBy ?? "-"} />
          <DetailItem label="Reviewed At" value={sale.reviewedAt ?? "-"} />
        </div>

        <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
          <DetailItem label="Review Notes" value={sale.reviewNotes ?? "-"} />
          <DetailItem
            label="Rejection Reason"
            value={sale.rejectionReason ?? "-"}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
          <DetailItem
            label="Transaction ID"
            value={sale.transactionId ?? "-"}
          />
          <DetailItem label="Paid At" value={sale.paidAt ?? "-"} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
          <DetailItem label="Card Code" value={sale.cardCode ?? "-"} />
          <DetailItem label="Card PIN" value={sale.cardPin ?? "-"} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailItem
            label="Created At"
            value={new Date(sale.createdAt).toLocaleString()}
          />
          <DetailItem
            label="Updated At"
            value={new Date(sale.updatedAt).toLocaleString()}
          />
        </div>
        <GiftCardActions saleId={sale.id} />
      </div>
    </div>
  );
}
