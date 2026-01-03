"use client";

import Badge from "@/components/ui/Badge";
import DetailItem from "@/components/shared/DetailItem";
import { Customer } from "@/types/models";
import { FaCheckCircle } from "react-icons/fa";

export default function PersonalDetailsTab({
  customer,
}: {
  customer: Customer;
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
        <DetailItem label="Full Name" value={customer.fullname} />
        <DetailItem label="Username" value={customer.username} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
        <VerifiedItem label="Email" value={customer.email} />
        <VerifiedItem label="Phone" value={customer.phone} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
        <DetailItem
          label="Account Status"
          value={
            customer.isActive ? (
              <Badge text="Active" color="green" />
            ) : (
              <Badge text="Inactive" color="red" />
            )
          }
        />
        <DetailItem label="Referral Code" value={customer.referralCode} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DetailItem
          label="Date Joined"
          value={new Date(customer.createdAt).toLocaleDateString()}
        />
      </div>
    </div>
  );
}

function VerifiedItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <div className="flex items-center gap-2 mt-0.5">
        <p className="font-medium text-gray-900 break-all">{value || "-"}</p>
        {value && (
          <div className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
            <FaCheckCircle size={14} />
            <span>Verified</span>
          </div>
        )}
      </div>
    </div>
  );
}
