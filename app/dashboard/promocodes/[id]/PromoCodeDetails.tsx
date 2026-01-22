"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import DetailItem from "@/components/shared/DetailItem";
import Badge from "@/components/ui/Badge";

export default function PromoCodeDetails({
  promo,
  stats,
}: {
  promo: any;
  stats: any;
}) {
  const router = useRouter();

  const createdAt = new Date(promo.createdAt).toLocaleString();
  const updatedAt = new Date(promo.updatedAt).toLocaleString();
  const validFrom = new Date(promo.validFrom).toLocaleString();
  const validUntil = promo.validUntil
    ? new Date(promo.validUntil).toLocaleString()
    : "No expiry";

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium mb-6 transition">
        <ChevronLeft size={18} />
        <span>Back</span>
      </button>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Promo details */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Promo Code ID" value={promo.id} />
            <DetailItem label="Code" value={promo.code} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Bonus Type" value={promo.bonusType} />
            <DetailItem
              label="Bonus Amount"
              value={
                promo.bonusType === "PERCENTAGE"
                  ? `${promo.bonusAmount}%`
                  : `₦${promo.bonusAmount}`
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem
              label="Applicable For"
              value={promo.applicableFor.replaceAll("_", " ")}
            />
            <DetailItem
              label="Minimum Sale Amount"
              value={promo.minSaleAmount ? `₦${promo.minSaleAmount}` : "None"}
            />
          </div>

          {promo.description && (
            <div className="border-b border-gray-100 pb-4">
              <DetailItem label="Description" value={promo.description} />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem
              label="Status"
              value={
                <Badge
                  text={promo.isActive ? "Active" : "Inactive"}
                  color={promo.isActive ? "green" : "red"}
                />
              }
            />
            <DetailItem label="Usage" value={`${promo.currentUses} uses`} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Valid From" value={validFrom} />
            <DetailItem label="Valid Until" value={validUntil} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem label="Created At" value={createdAt} />
            <DetailItem label="Updated At" value={updatedAt} />
          </div>
        </div>

        {/* Stats section */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Promo Code Statistics
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem label="Current Uses" value={stats.currentUses} />
            <DetailItem label="Max Uses" value={stats.maxUses} />
            <DetailItem label="Remaining Uses" value={stats.remainingUses} />
            <DetailItem
              label="Expired"
              value={
                <Badge
                  text={stats.isExpired ? "Yes" : "No"}
                  color={stats.isExpired ? "red" : "gray"}
                />
              }
            />
            <DetailItem
              label="Not Yet Valid"
              value={
                <Badge
                  text={stats.isNotYetValid ? "Yes" : "No"}
                  color={stats.isNotYetValid ? "yellow" : "gray"}
                />
              }
            />
            <DetailItem
              label="Maxed Out"
              value={
                <Badge
                  text={stats.isMaxedOut ? "Yes" : "No"}
                  color={stats.isMaxedOut ? "red" : "gray"}
                />
              }
            />
            <DetailItem
              label="Can Be Used"
              value={
                <Badge
                  text={stats.canBeUsed ? "Yes" : "No"}
                  color={stats.canBeUsed ? "green" : "gray"}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
