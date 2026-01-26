"use client";

import { useRouter } from "next/navigation";
import DetailItem from "@/components/shared/DetailItem";
import Badge, { colorClasses } from "@/components/ui/Badge";
import { ChevronLeft, Copy } from "lucide-react";
import { toast } from "react-hot-toast";
import { formatCurrency, formatDateTime } from "@/lib/utils/format";

export default function TransactionDetails({
  transaction,
}: {
  transaction: any;
}) {
  const router = useRouter();

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

  const getCategoryColor = () => "blue";

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
          {transaction.id && (
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
              {transaction.type && (
                <DetailItem
                  label="Type"
                  value={
                    <Badge
                      text={transaction.type}
                      color={getTypeColor(transaction.type)}
                    />
                  }
                />
              )}
            </div>
          )}

          {transaction.amount && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
              <DetailItem
                label="Amount"
                value={formatCurrency(Number(transaction.amount))}
              />
              {transaction.currency && (
                <DetailItem
                  label="Currency"
                  value={transaction.currency.toUpperCase()}
                />
              )}
              {transaction.status && (
                <DetailItem
                  label="Status"
                  value={
                    <Badge
                      text={transaction.status}
                      color={getStatusColor(transaction.status)}
                    />
                  }
                />
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            {transaction.category && (
              <DetailItem
                label="Category"
                value={
                  <Badge
                    text={transaction.category}
                    color={getCategoryColor() as keyof typeof colorClasses}
                  />
                }
              />
            )}
            {user.fullname && (
              <DetailItem label="User Name" value={user.fullname} />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            {user.email && <DetailItem label="Email" value={user.email} />}
            {user.phone && <DetailItem label="Phone" value={user.phone} />}
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
                      onClick={() => copyToClipboard(transaction.reference)}
                    />
                  </div>
                }
              />
            </div>
          )}

          {(transaction.provider || transaction.channel) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
              {transaction.provider && (
                <DetailItem label="Provider" value={transaction.provider} />
              )}
              {transaction.channel && (
                <DetailItem label="Channel" value={transaction.channel} />
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            {transaction.createdAt && (
              <DetailItem
                label="Created At"
                value={formatDateTime(transaction.createdAt)}
              />
            )}
            {(transaction.updatedAt || transaction.createdAt) && (
              <DetailItem
                label="Completed At"
                value={formatDateTime(
                  transaction.updatedAt || transaction.createdAt,
                )}
              />
            )}
          </div>

          {transaction.narration && (
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
              <DetailItem label="Narration" value={transaction.narration} />
            </div>
          )}

          {transaction.internalRef && (
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
              <DetailItem
                label="Internal Ref"
                value={transaction.internalRef}
              />
            </div>
          )}

          {transaction.usdValue && (
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
              <DetailItem
                label="USD Value"
                value={formatCurrency(transaction.usdValue, {
                  currency: "USD",
                  locale: "en-US",
                })}
              />
            </div>
          )}

          {transaction.rate && (
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
              <DetailItem
                label="Rate"
                value={formatCurrency(Number(transaction.rate), {
                  currency: "NGN",
                })}
              />
            </div>
          )}

          {transaction.transactionValue && (
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
              <DetailItem
                label="Transaction Value"
                value={transaction.transactionValue}
              />
            </div>
          )}

          {transaction.txHash && (
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
              <DetailItem label="Tx Hash" value={transaction.txHash} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
