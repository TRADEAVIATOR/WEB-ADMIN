"use client";

import { Dispute } from "@/types/models";
import DetailItem from "@/components/shared/DetailItem";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils/format";

export default function DisputeDetailsClient({
  dispute,
}: {
  dispute: Dispute;
}) {
  const router = useRouter();

  const amountNumber = Number(dispute.amount) || 0;
  const createdAt = dispute.createdAt
    ? new Date(dispute.createdAt).toLocaleString()
    : "-";
  const updatedAt = dispute.updatedAt
    ? new Date(dispute.updatedAt).toLocaleString()
    : "-";

  const user = dispute.user ?? { fullname: "-", email: "-", phone: "-" };
  const disputeInfo = dispute.disputes?.[0] || {
    reason: "-",
    status: "-",
    category: "-",
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
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem
              label="Transaction ID"
              value={dispute.disputes[0].transactionId}
            />
            <DetailItem label="Reference" value={dispute.reference || "-"} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Amount" value={formatCurrency(amountNumber)} />
            <DetailItem label="Type" value={dispute.type || "-"} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Status" value={dispute.status || "-"} />
            <DetailItem label="Channel" value={dispute.channel || "-"} />
          </div>

          {dispute.provider && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
              <DetailItem label="Provider" value={dispute.provider} />
              <DetailItem
                label="Internal Ref"
                value={dispute.internalRef || "-"}
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="User Name" value={user.fullname} />
            <DetailItem label="Email" value={user.email} />
          </div>

          {user.phone && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
              <DetailItem label="Phone" value={user.phone} />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Dispute Category" value={disputeInfo.category} />
            <DetailItem label="Dispute Reason" value={disputeInfo.reason} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Dispute Status" value={disputeInfo.status} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Created At" value={createdAt} />
            <DetailItem label="Updated At" value={updatedAt} />
          </div>

          {dispute.narration && (
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
              <DetailItem label="Narration" value={dispute.narration} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
