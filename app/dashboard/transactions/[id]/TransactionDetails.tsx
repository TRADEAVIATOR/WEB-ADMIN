"use client";

import { useRouter } from "next/navigation";
import DetailItem from "@/components/shared/DetailItem";
import { Transaction } from "@/types/models";
import { ChevronLeft } from "lucide-react";

interface TransactionDetailsProps {
  transaction: Transaction;
}

export default function TransactionDetails({
  transaction,
}: TransactionDetailsProps) {
  const router = useRouter();

  const amountNumber = Number(transaction.amount) || 0;
  const createdAt = transaction.createdAt
    ? new Date(transaction.createdAt).toLocaleString()
    : "-";
  const completedAt = transaction.updatedAt
    ? new Date(transaction.updatedAt).toLocaleString()
    : "-";

  const user = transaction.user || { fullname: "-", email: "-" };

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
            <DetailItem label="Transaction ID" value={transaction.id} />
            <DetailItem label="Type" value={transaction.type || "-"} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem
              label="Amount"
              value={`₦${amountNumber.toLocaleString()}`}
            />
            <DetailItem label="Status" value={transaction.status || "-"} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="User Name" value={user.fullname || "-"} />
            <DetailItem label="Email" value={user.email || "-"} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Created At" value={createdAt} />
            <DetailItem label="Completed At" value={completedAt} />
          </div>

          {transaction.narration && (
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
              <DetailItem label="Narration" value={transaction.narration} />
            </div>
          )}

          {transaction.reference && (
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
              <DetailItem label="Reference" value={transaction.reference} />
            </div>
          )}

          {(transaction.provider || transaction.channel) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
              <DetailItem
                label="Provider"
                value={transaction.provider || "-"}
              />
              <DetailItem label="Channel" value={transaction.channel || "-"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
