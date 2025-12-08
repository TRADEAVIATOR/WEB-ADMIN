"use client";

import { useRouter } from "next/navigation";
import DetailItem from "@/components/shared/DetailItem";
import { GiftCardOrder } from "@/types/models";
import { ChevronLeft } from "lucide-react";

export default function OrderDetails({ order }: { order: GiftCardOrder }) {
  const router = useRouter();

  const createdAt = new Date(order.createdAt).toLocaleString();
  const updatedAt = new Date(order.updatedAt).toLocaleString();

  const user = order.user ?? { fullname: "-", email: "-", phone: "-" };
  const codes = order.codes ?? [];

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
            <DetailItem label="Order ID" value={order.id} />
            <DetailItem label="Order Reference" value={order.orderReference} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Status" value={order.status} />
            <DetailItem label="Payment Method" value={order.paymentMethod} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Card Type" value={order.cardType} />
            <DetailItem label="Country" value={order.country} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Denomination" value={order.denomination} />
            <DetailItem label="Quantity" value={String(order.quantity)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Rate" value={order.rate} />
            <DetailItem
              label="Card Total"
              value={`₦${Number(order.cardTotal).toLocaleString()}`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem
              label="Fee"
              value={`₦${Number(order.fee).toLocaleString()}`}
            />
            <DetailItem
              label="Naira Value"
              value={`₦${Number(order.nairaValue).toLocaleString()}`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="User Name" value={user.fullname} />
            <DetailItem label="Email" value={user.email} />
          </div>

          {user.phone && (
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
              <DetailItem label="Phone" value={user.phone} />
            </div>
          )}

          {order.transaction && (
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
              <DetailItem label="Transaction ID" value={order.transaction.id} />
              <DetailItem
                label="Transaction Amount"
                value={`₦${Number(order.transaction.amount).toLocaleString()}`}
              />
            </div>
          )}

          {codes.length > 0 && (
            <div className="border-b border-gray-100 pb-4">
              <p className="text-sm font-medium text-gray-600 mb-2">Codes</p>

              <div className="flex flex-col gap-2">
                {codes.map((c, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-md border-b border-gray-100 text-sm text-gray-800">
                    <p>
                      <span className="font-medium">Code:</span> {c.code}
                    </p>
                    {c.serial && (
                      <p>
                        <span className="font-medium">Serial:</span> {c.serial}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAILURE REASON */}
          {order.failureReason && (
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 pb-4">
              <DetailItem label="Failure Reason" value={order.failureReason} />
            </div>
          )}

          {/* DATES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
            <DetailItem label="Created At" value={createdAt} />
            <DetailItem label="Updated At" value={updatedAt} />
          </div>
        </div>
      </div>
    </div>
  );
}
