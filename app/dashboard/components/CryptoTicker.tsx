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
  ngnRate: number | null;
}

export default function CryptoTicker({ cryptos, ngnRate }: CryptoTickerProps) {
  const activeCryptos = cryptos?.filter((c) => c.isActive) || [];

  if (activeCryptos.length === 0 && !ngnRate) return null;

  const scrollItems = [...activeCryptos, ...activeCryptos];

  return (
    <div className="flex gap-4 w-full items-center">
      {activeCryptos.length > 0 && (
        <div className="flex-1 overflow-hidden">
          <div className="animate-scroll whitespace-nowrap inline-flex gap-4">
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
                    {formatCurrency(Number(crypto.buyRate), {
                      currency: "USD",
                    })}
                    <FiArrowUpRight className="w-3 h-3 text-green-500" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
