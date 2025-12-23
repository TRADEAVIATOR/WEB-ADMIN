"use client";

import GiftIcon from "@/assets/icons/gift.svg";
import SupportTicketIcon from "@/assets/icons/support-ticket.svg";
import ArrowGoIcon from "@/assets/icons/arrow-go.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface ActionRequiredCardProps {
  giftcards: number;
  pending: number;
}

function AttentionDot({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
    </span>
  );
}

export default function ActionRequiredCard({
  giftcards,
  pending,
}: ActionRequiredCardProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col gap-4 border border-gray-100">
      <h2 className="text-base font-semibold text-gray-800">Action Required</h2>

      <button
        type="button"
        onClick={() =>
          router.push("/dashboard/giftcards/sell/sales?status=SUBMITTED")
        }
        className={clsx(
          "flex items-center justify-between rounded-xl p-3 transition",
          "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20",
          giftcards > 0 && "bg-red-50/40"
        )}>
        <div className="flex items-center gap-3">
          <Image src={GiftIcon} alt="Giftcard" width={20} height={20} />
          <div className="leading-tight">
            <p className="text-sm font-medium text-gray-800">
              Giftcard Trade ({giftcards})
            </p>
            <p className="text-xs text-gray-500">Pending approval</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AttentionDot show={giftcards > 0} />
          <Image src={ArrowGoIcon} alt="Go" width={16} height={16} />
        </div>
      </button>

      <button
        type="button"
        onClick={() => router.push("/dashboard/disputes?status=PENDING")}
        className={clsx(
          "flex items-center justify-between rounded-xl p-3 transition",
          "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20",
          pending > 0 && "bg-red-50/40"
        )}>
        <div className="flex items-center gap-3">
          <Image
            src={SupportTicketIcon}
            alt="Support Ticket"
            width={20}
            height={20}
          />
          <div className="leading-tight">
            <p className="text-sm font-medium text-gray-800">
              Transactions ({pending})
            </p>
            <p className="text-xs text-gray-500">Disputes pending</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AttentionDot show={pending > 0} />
          <Image src={ArrowGoIcon} alt="Go" width={16} height={16} />
        </div>
      </button>
    </div>
  );
}
