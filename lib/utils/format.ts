export const formatNaira = (
  amount: number | string | null | undefined,
  options?: { compact?: boolean }
) => {
  if (amount == null || amount === "" || isNaN(Number(amount))) return "₦0";

  const num = Number(amount);

  if (options?.compact) {
    return new Intl.NumberFormat("en-NG", {
      notation: "compact",
      compactDisplay: "short",
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(num);
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(num);
};
