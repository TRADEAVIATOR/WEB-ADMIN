import { formatCurrency } from "@/lib/utils/format";
import Image from "next/image";

type MarketInsight = {
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChange24h: number;
  marketCap: number;
};

type Props = {
  title: string;
  data: MarketInsight[];
  className?: string;
};

export default function MarketInsightsCard({ title, data, className }: Props) {
  return (
    <div className={`bg-white rounded-xl p-4 ${className}`}>
      <h3 className="font-semibold text-lg mb-4">{title}</h3>

      <div className="space-y-3">
        {data.map((coin) => {
          const isNegative = coin.priceChange24h < 0;

          return (
            <div
              key={coin.symbol}
              className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                  priority={false}
                />
                <div>
                  <p className="font-medium text-sm">
                    {coin.name}
                    <span className="text-gray-400 ml-1 text-xs">
                      ({coin.symbol})
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    MCap: {formatCurrency(coin.marketCap)}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-sm">
                  {formatCurrency(coin.currentPrice)}
                </p>
                <p
                  className={`text-xs ${
                    isNegative ? "text-red-500" : "text-green-500"
                  }`}>
                  {isNegative ? "" : "+"}
                  {coin.priceChange24h.toFixed(2)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
