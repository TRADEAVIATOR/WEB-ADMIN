"use client";

import { useRouter } from "next/navigation";
import DetailItem from "@/components/shared/DetailItem";
import { ChevronLeft } from "lucide-react";
import { formatCurrency, formatDateTime } from "@/lib/utils/format";
import Image from "next/image";
import GiftCardActions from "./GiftCardActions";
import Badge from "@/components/ui/Badge";

const downloadImage = async (url: string, filename: string) => {
  const res = await fetch(url);
  const blob = await res.blob();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
};

export default function SalesDetails({ sale }: { sale: any }) {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "SUCCESS":
        return "green";
      case "FAILED":
        return "red";
      case "PENDING":
        return "yellow";
      case "ACTIVE":
        return "blue";
      default:
        return "gray";
    }
  };

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
          <DetailItem label="Sale Reference" value={sale.saleReference} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
          <DetailItem label="User ID" value={sale.userId} />
          <DetailItem label="Full Name" value={sale.user?.fullname || "-"} />
          <DetailItem label="Email" value={sale.user?.email || "-"} />
          <DetailItem label="Username" value={sale.user?.username || "-"} />
          <DetailItem label="Phone" value={sale.user?.phone || "-"} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
          <DetailItem
            label="Status"
            value={
              <Badge text={sale.status} color={getStatusColor(sale.status)} />
            }
          />
          <DetailItem label="Quantity" value={String(sale.quantity)} />
          <DetailItem label="Card Type" value={sale.cardType} />
          <DetailItem label="Card Range" value={sale.cardRange} />
          <DetailItem
            label="Card Value"
            value={formatCurrency(Number(sale.cardValue), {
              currency: "USD",
              locale: "en-US",
            })}
          />
          <DetailItem
            label="Payout Amount"
            value={formatCurrency(Number(sale.payoutAmount))}
          />
          <DetailItem label="Country" value={sale.country} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
          <DetailItem label="Reviewed By" value={sale.reviewedBy || "-"} />
          <DetailItem
            label="Reviewed At"
            value={sale.reviewedAt ? formatDateTime(sale.reviewedAt) : "-"}
          />
          <DetailItem
            label="Rejection Reason"
            value={sale.rejectionReason || "-"}
          />
          <DetailItem label="Review Notes" value={sale.reviewNotes || "-"} />
        </div>

        {sale.images && sale.images.length > 0 && (
          <div className="border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Card Images</p>
              <button
                onClick={() =>
                  Promise.all(
                    sale.images.map((img, i) =>
                      downloadImage(img, `card-${sale.id}-${i + 1}.jpg`)
                    )
                  )
                }
                className="text-xs text-primary hover:underline">
                Download all
              </button>
            </div>

            <div className="flex gap-4 flex-wrap">
              {sale.images.map((img, i) => (
                <div
                  key={i}
                  className="relative group w-28 h-28 rounded-md border overflow-hidden">
                  <Image
                    src={img}
                    alt="Card Image"
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() =>
                      downloadImage(img, `card-${sale.id}-${i + 1}.jpg`)
                    }
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 text-white text-xs font-medium flex items-center justify-center transition">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailItem
            label="Created At"
            value={formatDateTime(sale.createdAt)}
          />
          <DetailItem
            label="Updated At"
            value={formatDateTime(sale.updatedAt)}
          />
        </div>

        <GiftCardActions saleId={sale.id} />
      </div>
    </div>
  );
}
