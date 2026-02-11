"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import FormField from "@/components/ui/FormField";
import { useModal } from "@/context/ModalContext";
import Button from "@/components/ui/Button";
import SelectField, { SelectOption } from "../ui/SelectField";
import { getAllCryptoPairRatesClient } from "@/lib/api/crypto";

interface AddCryptoRateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCryptoRateModal({
  isOpen,
  onClose,
}: AddCryptoRateModalProps) {
  const [cryptoOptions, setCryptoOptions] = useState<SelectOption[]>([]);
  const [loadingAssets, setLoadingAssets] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    baseAsset: SelectOption | null;
    valueNGN: string;
  }>({
    baseAsset: null,
    valueNGN: "",
  });

  const CRYPTO_ORDER = [
    "BTC",
    "ETH",
    "USDT",
    "USDC",
    "BNB",
    "TRX",
    "BCH",
    "DOGE",
    "LTC",
    "POL",
    "SHIB",
    "SOL",
  ];

  const { openModal } = useModal();

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;

    const fetchAssets = async () => {
      setLoadingAssets(true);
      setError(null);

      try {
        const res = await getAllCryptoPairRatesClient();

        if (!Array.isArray(res)) {
          throw new Error("Invalid crypto assets response");
        }

        const options = res
          .filter((asset) => asset?.isActive)
          .sort((a, b) => {
            const aIndex = CRYPTO_ORDER.indexOf(a.code);
            const bIndex = CRYPTO_ORDER.indexOf(b.code);

            if (aIndex === -1) return 1;
            if (bIndex === -1) return -1;

            return aIndex - bIndex;
          })
          .map((asset) => ({
            value: asset.code,
            label: `${asset.code} — ${asset.name}`,
          }));

        if (isMounted) {
          setCryptoOptions(options);
        }
      } catch (err) {
        console.error("Failed to fetch crypto assets:", err);

        if (isMounted) {
          setCryptoOptions([]);
          setError("Failed to load crypto assets. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoadingAssets(false);
        }
      }
    };

    fetchAssets();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.baseAsset || !formData.valueNGN) return;

    openModal("confirm-new-crypto-rate", {
      baseAsset: formData.baseAsset.value,
      valueNGN: formData.valueNGN,
    });
  };

  const isSubmitDisabled =
    loadingAssets || !formData.baseAsset || !formData.valueNGN;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Crypto Rate"
      desc="Create new crypto rate">
      <form onSubmit={handleSubmit} className="space-y-4">
        <SelectField
          id="baseAsset"
          label="Select Crypto"
          options={cryptoOptions}
          value={formData.baseAsset}
          placeholder={
            loadingAssets
              ? "Loading assets..."
              : error
                ? "Unable to load assets"
                : "Select crypto"
          }
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              baseAsset: val as SelectOption,
            }))
          }
          required
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <FormField
          label="Set Rate (NGN)"
          type="number"
          placeholder="Enter rate (e.g. 1500)"
          name="valueNGN"
          value={formData.valueNGN}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              valueNGN: e.target.value,
            }))
          }
          required
        />

        <Button
          type="submit"
          disabled={isSubmitDisabled}
          className="ml-auto block">
          Proceed
        </Button>
      </form>
    </Modal>
  );
}
