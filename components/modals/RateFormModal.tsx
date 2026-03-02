"use client";

import { useState, useEffect, FormEvent } from "react";
import { CryptoRate, GiftCardRate, RateType } from "@/types/rates";
import Button from "../ui/Button";
import FormField from "../ui/FormField";
import Modal from "../ui/Modal";

interface Props {
  isOpen: boolean;
  type: RateType;
  initial?: CryptoRate | GiftCardRate | null;
  onClose: () => void;
  onSubmit: (id: string, data: any) => Promise<void>;
}

export default function RateFormModal({
  isOpen,
  type,
  initial,
  onClose,
  onSubmit,
}: Props) {
  const isCrypto = type === "crypto";
  const isEdit = !!initial;

  const [form, setForm] = useState({
    name: "",
    symbol: "",
    country: "",
    buyRate: "",
    sellRate: "",
    usdToNgnBuy: "",
    usdToNgnSell: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initial) return;

    if (isCrypto) {
      const r = initial as CryptoRate;
      setForm((f) => ({
        ...f,
        name: r.name,
        symbol: r.symbol,
        usdToNgnBuy: String(r.usdToNgnBuy),
        usdToNgnSell: String(r.usdToNgnSell),
      }));
    } else {
      const r = initial as GiftCardRate;
      setForm((f) => ({
        ...f,
        name: r.name,
        country: r.country,
        buyRate: String(r.buyRate),
        sellRate: String(r.sellRate),
      }));
    }
  }, [initial, isCrypto]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (isCrypto) {
        const id = isEdit
          ? (initial as CryptoRate).id
          : form.symbol.toUpperCase();

        if (!id) throw new Error("Symbol is required");

        await onSubmit(id, {
          name: form.name,
          symbol: form.symbol.toUpperCase(),
          usdToNgnBuy: Number(form.usdToNgnBuy),
          usdToNgnSell: Number(form.usdToNgnSell),
        });
      } else {
        const id = isEdit
          ? (initial as GiftCardRate).id
          : `${form.name}_${form.country}`.replace(/\s+/g, "_");

        if (!form.name || !form.country) {
          throw new Error("Name and country are required");
        }

        await onSubmit(id, {
          name: form.name,
          country: form.country.toUpperCase(),
          buyRate: Number(form.buyRate),
          sellRate: Number(form.sellRate),
        });
      }

      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${isEdit ? "Edit" : "Add"} ${
        isCrypto ? "Crypto Rate" : "Gift Card Rate"
      }`}
      desc={
        isCrypto
          ? "Update crypto USD to NGN rates."
          : "Update gift card buy and sell rates."
      }
      width="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-600">
            {error}
          </div>
        )}

        {isCrypto ? (
          <>
            <FormField
              label="Name"
              name="name"
              placeholder="e.g. Cardano"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />

            <FormField
              label="Symbol"
              name="symbol"
              placeholder="e.g. ADA"
              value={form.symbol}
              disabled={isEdit}
              onChange={(e) =>
                setForm((f) => ({ ...f, symbol: e.target.value }))
              }
              required
            />

            <FormField
              label="USD → NGN Buy Rate"
              name="usdToNgnBuy"
              type="number"
              placeholder="e.g. 1420"
              value={form.usdToNgnBuy}
              onChange={(e) =>
                setForm((f) => ({ ...f, usdToNgnBuy: e.target.value }))
              }
              required
            />

            <FormField
              label="USD → NGN Sell Rate"
              name="usdToNgnSell"
              type="number"
              placeholder="e.g. 1362"
              value={form.usdToNgnSell}
              onChange={(e) =>
                setForm((f) => ({ ...f, usdToNgnSell: e.target.value }))
              }
              required
            />
          </>
        ) : (
          <>
            <FormField
              label="Gift Card Name"
              name="name"
              placeholder="e.g. Amazon"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />

            <FormField
              label="Country / Currency"
              name="country"
              placeholder="e.g. EUR, USD, GBP"
              value={form.country}
              disabled={isEdit}
              onChange={(e) =>
                setForm((f) => ({ ...f, country: e.target.value }))
              }
              required
            />

            <FormField
              label="Buy Rate (NGN)"
              name="buyRate"
              type="number"
              placeholder="e.g. 1650"
              value={form.buyRate}
              onChange={(e) =>
                setForm((f) => ({ ...f, buyRate: e.target.value }))
              }
              required
            />

            <FormField
              label="Sell Rate (NGN)"
              name="sellRate"
              type="number"
              placeholder="e.g. 1500"
              value={form.sellRate}
              onChange={(e) =>
                setForm((f) => ({ ...f, sellRate: e.target.value }))
              }
              required
            />
          </>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            size="md"
            rounded="lg"
            onClick={onClose}
            disabled={saving}
            className="flex-1">
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            rounded="lg"
            isLoading={saving}
            className="flex-1">
            {isEdit ? "Save Changes" : "Add Rate"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
