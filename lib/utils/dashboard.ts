export function extractSparklineData(chartData: any): number[] {
  if (!chartData || !Array.isArray(chartData) || chartData.length === 0) {
    return [];
  }

  if (chartData[0]?.count !== undefined && chartData[0]?.type !== undefined) {
    return chartData
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 10)
      .map((item: any) => item.count);
  }

  if (chartData[0]?.value !== undefined && chartData[0]?.month !== undefined) {
    return chartData.map((item: any) => parseFloat(item.value));
  }

  if (
    chartData[0]?.wallets !== undefined &&
    chartData[0]?.asset !== undefined
  ) {
    return chartData.map((item: any) => item.wallets);
  }

  if (chartData[0]?.count !== undefined) {
    return chartData.map((item: any) => item.count);
  }

  return [];
}

export function calculateChange(
  chartData: any,
  type: "users" | "balance" | "crypto" | "transactions"
): string {
  if (!chartData || !Array.isArray(chartData) || chartData.length === 0) {
    return "0%";
  }

  switch (type) {
    case "users": {
      const totalTransactions = chartData.reduce(
        (sum: number, item: any) => sum + (item.count || 0),
        0
      );
      const growthRate = totalTransactions > 0 ? 5 : 0;
      return `+${growthRate}%`;
    }
    case "balance": {
      if (chartData.length > 1) {
        const current = parseFloat(
          chartData[chartData.length - 1]?.value || "0"
        );
        const previous = parseFloat(
          chartData[chartData.length - 2]?.value || "0"
        );
        const change = current - previous;
        return change >= 0
          ? `+₦${change.toFixed(2)}`
          : `-₦${Math.abs(change).toFixed(2)}`;
      }
      const value = parseFloat(chartData[0]?.value || "0");
      return value > 0 ? `+₦${value}` : "₦0.00";
    }
    case "crypto": {
      const totalBalance = chartData.reduce(
        (sum: number, item: any) => sum + parseFloat(item.balance || "0"),
        0
      );
      return totalBalance > 0 ? `+₦${totalBalance.toFixed(2)}` : "0 wallets";
    }
    case "transactions": {
      const count = chartData.reduce(
        (sum: number, item: any) => sum + (item.count || 0),
        0
      );
      return count > 0 ? `+${count}` : "0";
    }
    default:
      return "0%";
  }
}
