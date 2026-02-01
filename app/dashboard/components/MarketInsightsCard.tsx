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
      <h3 className="font-semibold text-xl mb-4">{title}</h3>

      <div className="grid grid-cols-3 text-xs text-gray-400 font-semibold pb-2 border-b border-gray-100 uppercase">
        <span>Name</span>
        <span className="text-right">Price</span>
        <span className="text-right">Percent Change</span>
      </div>

      <div className="divide-y divide-gray-100">
        {data.map((coin) => {
          const isNegative = coin.priceChange24h < 0;

          return (
            <div
              key={coin.symbol}
              className="grid grid-cols-3 items-center py-3">
              <div className="flex items-center gap-3">
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-sm">{coin.name}</p>
                  <p className="text-xs text-gray-400 uppercase">
                    {coin.symbol}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-sm">
                  {formatCurrency(coin.currentPrice, {
                    currency: "USD",
                    locale: "en-US",
                  })}
                </p>
              </div>

              <div
                className={`text-right font-medium text-sm ${
                  isNegative ? "text-red-500" : "text-green-500"
                }`}>
                {isNegative ? "" : "+"}
                {coin.priceChange24h.toFixed(2)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
