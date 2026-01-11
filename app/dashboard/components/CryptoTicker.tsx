"use client";

import { FiArrowUpRight } from "react-icons/fi";
import { formatCurrency } from "@/lib/utils/format";

interface Crypto {
  code: string;
  name: string;
  buyRate: string | number;
  imageUrl: string;
  isActive: boolean;
}

interface CryptoTickerProps {
  cryptos: Crypto[];
}

export default function CryptoTicker({ cryptos }: CryptoTickerProps) {
  if (!cryptos || cryptos.length === 0) return null;

  const activeCryptos = cryptos.filter((c) => c.isActive);

  const scrollItems = [...activeCryptos, ...activeCryptos];

  return (
    <div className="overflow-hidden relative w-full">
      <div className="animate-scroll whitespace-nowrap flex gap-4">
        {scrollItems.map((crypto, idx) => (
          <div
            key={`${crypto.code}-${idx}`}
            className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 min-w-[120px]">
            <img
              src={crypto.imageUrl}
              alt={crypto.name}
              className="w-6 h-6 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{crypto.code}</span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                {formatCurrency(Number(crypto.buyRate), { currency: "USD" })}
                <FiArrowUpRight className="w-3 h-3 text-green-500" />
              </span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: inline-flex;
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
