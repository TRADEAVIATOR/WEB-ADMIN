"use client";

import { Sparklines, SparklinesLine } from "react-sparklines";
import { StatCardProps } from "@/types/props";
import FormField from "@/components/ui/FormField";

export default function StatCard({
  label,
  value,
  change,
  data = [],
  bgColor,
  selectOptions,
}: StatCardProps) {
  const sparklineData = data.length > 0 ? data : [0, 0, 0, 0, 0];
  const hasValidData = data.length > 0 && data.some((val) => val > 0);

  const numericChange =
    typeof change === "number"
      ? change
      : Number(change.replace(/[^0-9.-]/g, ""));

  const isPositive = numericChange >= 0;

  const formattedChange =
    typeof change === "string"
      ? change
      : `${isPositive ? "+" : ""}${numericChange}`;

  const changeColor = bgColor
    ? "text-white/70"
    : isPositive
    ? "text-green-600"
    : "text-red-600";

  return (
    <div
      className="relative rounded-2xl p-5 flex flex-col gap-3 overflow-hidden border border-gray-100"
      style={{ backgroundColor: bgColor || "white" }}>
      <div className="flex justify-between items-center">
        <span
          className={`text-sm font-medium ${
            bgColor ? "text-white/90" : "text-gray-500"
          }`}>
          {label}
        </span>

        {selectOptions && (
          <FormField
            as="select"
            options={selectOptions.map((opt: string) => ({
              label: opt,
              value: opt,
            }))}
            className="w-40"
          />
        )}
      </div>

      <div className="space-y-0.5">
        <span
          className={`text-2xl font-bold leading-tight ${
            bgColor ? "text-white" : "text-gray-800"
          }`}>
          {value}
        </span>

        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${changeColor}`}>
            {formattedChange}
          </span>
          <span
            className={`text-xs ${
              bgColor ? "text-white/60" : "text-gray-400"
            }`}>
            Today
          </span>
        </div>
      </div>

      {hasValidData && (
        <div className="absolute bottom-3 right-3 w-32 h-16 opacity-50">
          <Sparklines data={sparklineData} width={150} height={80}>
            <SparklinesLine
              color={bgColor ? "#FFFFFF" : "#FE7F32"}
              style={{
                fill: bgColor ? "#FFFFFF" : "#FE7F32",
                fillOpacity: 0.3,
                strokeWidth: 2,
                strokeLinejoin: "round",
                strokeLinecap: "round",
              }}
            />
          </Sparklines>
        </div>
      )}
    </div>
  );
}
