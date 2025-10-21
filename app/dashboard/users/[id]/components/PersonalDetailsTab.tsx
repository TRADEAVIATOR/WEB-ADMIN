"use client";

import { FaCheckCircle } from "react-icons/fa";

export default function PersonalDetailsTab() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
        <DetailItem label="First Name" value="Seiyefa" />
        <DetailItem label="Last Name" value="Amakiri" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
        <VerifiedItem
          label="Email address"
          value="imranrosheed2019@gmail.com"
        />
        <VerifiedItem label="Phone number" value="2348104452286" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
        <DetailItem label="Account type" value="User" />
        <DetailItem label="Tag" value="Amakiri" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DetailItem label="Date Joined" value="Jan 15, 2025" />
        <DetailItem label="Referral" value="-" />
      </div>
    </div>
  );
}

interface DetailItemProps {
  label: string;
  value: string;
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-900 mt-0.5 break-words">{value}</p>
    </div>
  );
}

interface VerifiedItemProps {
  label: string;
  value: string;
}

function VerifiedItem({ label, value }: VerifiedItemProps) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
        <p className="font-medium text-gray-900 break-all">{value}</p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
          <FaCheckCircle size={14} />
          <span>Verified</span>
        </div>
      </div>
    </div>
  );
}
