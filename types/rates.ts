export interface CryptoRate {
  id: string;
  name: string;
  symbol: string;
  usdToNgnBuy: number;
  usdToNgnSell: number;
}

export interface GiftCardRate {
  id: string;
  name: string;
  country: string;
  buyRate: number;
  sellRate: number;
}

export type RateType = "crypto" | "giftcard";
