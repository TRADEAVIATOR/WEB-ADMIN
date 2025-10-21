"use client";

import Image from "next/image";

interface VirtualCardHeaderProps {
  cardNumber: string;
  expiry: string;
  cardType: string;
}

export default function VirtualCardHeader({
  cardNumber,
  expiry,
  cardType,
}: VirtualCardHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:gap-6">
      <div className="relative w-[320px] h-[200px] sm:w-[400px] sm:h-[230px] rounded-3xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f97316] to-[#f59e0b]" />

        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#331300] rounded-t-[40px]" />

        <div className="relative z-10 flex flex-col justify-between h-full p-6 text-white">
          <div className="flex justify-between items-center">
            <Image
              src="/icons/chip.svg"
              alt="Card Chip"
              width={40}
              height={30}
              className="object-contain"
            />

            <Image
              src="/icons/brand-logo.svg"
              alt="Platform Logo"
              width={90}
              height={35}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="tracking-widest text-lg font-mono">{cardNumber}</p>
            <div className="flex justify-between items-center text-sm">
              <p>{expiry}</p>
              <Image
                src="/icons/mastercard.svg"
                alt={cardType}
                width={42}
                height={42}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
