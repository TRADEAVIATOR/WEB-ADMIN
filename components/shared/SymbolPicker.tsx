"use client";

import { useRef, useEffect } from "react";

export const CURRENCIES = [
  { symbol: "₦", name: "Nigerian Naira", code: "NGN" },
  { symbol: "$", name: "US Dollar", code: "USD" },
  { symbol: "£", name: "British Pound", code: "GBP" },
  { symbol: "€", name: "Euro", code: "EUR" },
  { symbol: "¥", name: "Japanese Yen", code: "JPY" },
  { symbol: "₹", name: "Indian Rupee", code: "INR" },
  { symbol: "₩", name: "South Korean Won", code: "KRW" },
  { symbol: "₣", name: "Swiss Franc", code: "CHF" },
  { symbol: "C$", name: "Canadian Dollar", code: "CAD" },
  { symbol: "A$", name: "Australian Dollar", code: "AUD" },
  { symbol: "R$", name: "Brazilian Real", code: "BRL" },
  { symbol: "₺", name: "Turkish Lira", code: "TRY" },
  { symbol: "₴", name: "Ukrainian Hryvnia", code: "UAH" },
  { symbol: "₱", name: "Philippine Peso", code: "PHP" },
  { symbol: "₭", name: "Lao Kip", code: "LAK" },
  { symbol: "฿", name: "Thai Baht", code: "THB" },
  { symbol: "د.إ", name: "UAE Dirham", code: "AED" },
  { symbol: "﷼", name: "Saudi Riyal", code: "SAR" },
  { symbol: "₫", name: "Vietnamese Dong", code: "VND" },
  { symbol: "R", name: "South African Rand", code: "ZAR" },
];

export const ARROWS = [
  { symbol: "↑", name: "Up Arrow" },
  { symbol: "↓", name: "Down Arrow" },
  { symbol: "→", name: "Right Arrow" },
  { symbol: "←", name: "Left Arrow" },

  { symbol: "➝", name: "Right Arrow (Heavy)" },
  { symbol: "➜", name: "Right Arrow (Bold)" },
  { symbol: "➤", name: "Right Arrow (Pointer)" },
  { symbol: "➔", name: "Right Arrow (Rounded)" },
  { symbol: "➡", name: "Right Arrow (Thick)" },
  { symbol: "⟶", name: "Right Arrow (Long)" },
  { symbol: "⇢", name: "Right Arrow (Double Line)" },
  { symbol: "⇨", name: "Right Arrow (Heavy Double)" },
  { symbol: "»", name: "Double Chevron Right" },

  { symbol: "↗", name: "Up Right Arrow" },
  { symbol: "↘", name: "Down Right Arrow" },
];

interface SymbolPickerProps {
  onSelect: (symbol: string) => void;
  onClose: () => void;
}

export default function SymbolPicker({ onSelect, onClose }: SymbolPickerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const renderSection = (
    title: string,
    items: { symbol: string; name: string; code?: string }[],
  ) => (
    <div className="mb-4 last:mb-0">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-1">
        {title}
      </p>

      <div className="grid grid-cols-4 gap-1.5">
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            title={item.code ? `${item.name} (${item.code})` : item.name}
            onClick={() => onSelect(item.symbol)}
            className="flex flex-col items-center justify-center gap-0.5 p-2 rounded-xl 
                       hover:bg-primary/10 hover:text-primary 
                       transition-colors group">
            <span className="text-lg font-semibold leading-none">
              {item.symbol}
            </span>

            {item.code && (
              <span
                className="text-[9px] text-gray-400 
                               group-hover:text-primary/70 
                               font-medium leading-none">
                {item.code}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 z-50 
                 bg-white border border-gray-200 
                 rounded-2xl shadow-xl p-3 w-72 max-h-72 overflow-y-auto">
      {renderSection("Currencies", CURRENCIES)}
      {renderSection("Arrows", ARROWS)}
    </div>
  );
}
