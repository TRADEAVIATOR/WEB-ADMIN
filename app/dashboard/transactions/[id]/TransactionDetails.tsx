"use client";

import { useRouter } from "next/navigation";
import DetailItem from "@/components/shared/DetailItem";
import Badge from "@/components/ui/Badge";
import { Transaction } from "@/types/models";
import { ChevronLeft, Copy } from "lucide-react";
import { toast } from "react-hot-toast";

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
  const updatedAt = transaction.updatedAt
    ? new Date(transaction.updatedAt).toLocaleString()
    : "-";

  const user = transaction.user || { fullname: "-", email: "-", phone: "-" };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "green";
      case "PENDING":
        return "yellow";
      case "FAILED":
      case "CANCELLED":
        return "red";
      default:
        return "yellow";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "CREDIT":
        return "green";
      case "DEBIT":
        return "red";
      default:
        return "gray";
    }
  };

  const getCategoryColor = (category: string) => {
    const categoryMap: Record<string, string> = {
      DEPOSIT: "blue",
      OUTWARDS: "yellow",
      WITHDRAWAL: "purple",
      TRANSFER: "indigo",
      REVERSAL: "pink",
      GIFTCARDS: "orange",
      CRYPTO: "teal",
      DATA: "cyan",
      AIRTIME: "emerald",
      CABLE: "rose",
      SPORTS: "fuchsia",
      ELECTRICITY: "lime",
      EVENTS: "amber",
      EDUCATION: "violet",
      CASHBACK: "green",
      REFERRAL_BONUS: "sky",
      CARD_CREATION: "stone",
      VOUCHER: "gray",
      CARD_FUNDING: "brown",
    };
    return categoryMap[category] || "gray";
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
        {/* Main Transaction Info */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem
              label="Transaction ID"
              value={
                <div className="flex items-center gap-2">
                  <span>{transaction.id}</span>
                  <Copy
                    className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600"
                    onClick={() => copyToClipboard(transaction.id)}
                  />
                </div>
              }
            />
            <DetailItem
              label="Type"
              value={
                <Badge
                  text={transaction.type || "-"}
                  color={getTypeColor(transaction.type || "")}
                />
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem
              label="Amount"
              value={`${transaction.currency.toUpperCase()} ${amountNumber.toLocaleString()}`}
            />
            <DetailItem
              label="Status"
              value={
                <Badge
                  text={transaction.status || "-"}
                  color={getStatusColor(transaction.status || "")}
                />
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem
              label="Category"
              value={
                <Badge
                  text={transaction.category}
                  color={getCategoryColor(transaction.category)}
                />
              }
            />
            <DetailItem label="User Name" value={user.fullname || "-"} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Email" value={user.email || "-"} />
            <DetailItem label="Phone" value={user.phone || "-"} />
          </div>

          {transaction.reference && (
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
              <DetailItem
                label="Reference"
                value={
                  <div className="flex items-center gap-2">
                    <span>{transaction.reference}</span>
                    <Copy
                      className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600"
                      onClick={() => copyToClipboard(transaction.reference!)}
                    />
                  </div>
                }
              />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Created At" value={createdAt} />
            <DetailItem label="Completed At" value={updatedAt} />
          </div>

          {transaction.narration && (
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
              <DetailItem label="Narration" value={transaction.narration} />
            </div>
          )}

          {transaction.meta?.data?.orderNo && (
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
              <DetailItem
                label="Order No"
                value={transaction.meta.data.orderNo}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
