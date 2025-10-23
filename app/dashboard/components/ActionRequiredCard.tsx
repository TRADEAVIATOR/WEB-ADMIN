import Image from "next/image";

export default function ActionRequiredCard() {
  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col gap-5">
      <h2 className="text-base font-semibold text-gray-800">Action Required</h2>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/icons/gift.svg" alt="Giftcard" width={20} height={20} />
          <div className="leading-tight">
            <p className="text-sm font-medium text-gray-800">
              Giftcard Trade (20)
            </p>
            <p className="text-xs text-gray-500">Pending Transaction</p>
          </div>
        </div>
        <Image src="/icons/arrow-go.svg" alt="Go" width={16} height={16} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/icons/support-ticket.svg"
            alt="Support Ticket"
            width={20}
            height={20}
          />
          <div className="leading-tight">
            <p className="text-sm font-medium text-gray-800">
              Support Ticket (12)
            </p>
            <p className="text-xs text-gray-500">Action Required</p>
          </div>
        </div>
        <Image src="/icons/arrow-go.svg" alt="Go" width={16} height={16} />
      </div>
    </div>
  );
}
