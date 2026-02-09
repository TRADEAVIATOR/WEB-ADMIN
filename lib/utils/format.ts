export const formatCurrency = (
  amount: number | string | null | undefined,
  options?: {
    compact?: boolean;
    currency?: string;
    locale?: string;
  },
) => {
  if (amount == null || amount === "" || isNaN(Number(amount))) return "0";

  const num = Number(amount);
  const currency = options?.currency || "NGN";
  const locale = options?.locale || "en-NG";

  if (options?.compact) {
    return new Intl.NumberFormat(locale, {
      notation: "compact",
      compactDisplay: "short",
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(num);
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(num);
};

export const formatDateTime = (dateString: string) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
