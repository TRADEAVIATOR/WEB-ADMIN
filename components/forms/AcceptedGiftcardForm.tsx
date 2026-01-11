"use client";

import { useState, ChangeEvent } from "react";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { Country } from "country-state-city";
import currencyCodes from "currency-codes";
import Image from "next/image";
import toast from "react-hot-toast";
import SelectField from "../ui/SelectField";

export interface AcceptedGiftcardFormValues {
  cardName: string;
  cardType: string;
  country: string;
  countryCode: string;
  currency: string;
  availableRanges: string[];
  receiptTypes: string[];
  rates: Record<string, Record<string, number>>;
  image?: File | null;
  isActive: boolean;
}

interface AcceptedGiftcardFormProps {
  initialValues?: Partial<AcceptedGiftcardFormValues>;
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

const RECEIPT_TYPE_OPTIONS = [
  { label: "E-Code", value: "E-CODE" },
  { label: "Physical Receipt", value: "PHYSICAL" },
];

export default function AcceptedGiftcardForm({
  initialValues,
  onSubmit,
  isLoading = false,
}: AcceptedGiftcardFormProps) {
  const [values, setValues] = useState<AcceptedGiftcardFormValues>({
    cardName: initialValues?.cardName || "",
    cardType: initialValues?.cardType || "",
    country: initialValues?.country || "",
    countryCode: initialValues?.countryCode || "",
    currency: initialValues?.currency || "",
    availableRanges: initialValues?.availableRanges || [""],
    receiptTypes: initialValues?.receiptTypes || [],
    rates: initialValues?.rates || {},
    image: null,
    isActive: initialValues?.isActive ?? true,
  });

  const countries = Country.getAllCountries();
  const countryOptions = countries.map((c) => ({
    label: c.name,
    value: c.name,
  }));
  const countryCodeOptions = countries.map((c) => ({
    label: `${c.name} (+${c.phonecode})`,
    value: c.isoCode,
  }));
  const currencyOptions = currencyCodes.data.map((c) => ({
    label: `${c.code} – ${c.currency}`,
    value: c.code,
  }));

  const handleChange = (
    field: keyof AcceptedGiftcardFormValues,
    value: any
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (
    field: "availableRanges",
    index: number,
    value: string
  ) => {
    const updated = [...values[field]];
    updated[index] = value;
    setValues((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayItem = (field: "availableRanges") => {
    setValues((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field: "availableRanges", index: number) => {
    const updated = values[field].filter((_, i) => i !== index);
    setValues((prev) => ({ ...prev, [field]: updated }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setValues((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!values.availableRanges.length || !values.availableRanges[0]) {
      toast.error("At least one available range is required");
      return;
    }
    if (!values.receiptTypes.length) {
      toast.error("At least one receipt type is required");
      return;
    }

    const formData = new FormData();
    formData.append("cardName", values.cardName);
    formData.append("cardType", values.cardType);
    formData.append("country", values.country);
    formData.append("countryCode", values.countryCode);
    formData.append("currency", values.currency);
    formData.append("isActive", String(values.isActive));

    values.availableRanges.forEach((range) =>
      formData.append("availableRanges[]", range)
    );
    values.receiptTypes.forEach((type) =>
      formData.append("receiptTypes[]", type)
    );
    formData.append("rates", JSON.stringify(values.rates || {}));
    if (values.image) formData.append("image", values.image);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Card Name"
        required
        value={values.cardName}
        onChange={(e) => handleChange("cardName", e.target.value)}
      />

      <FormField
        label="Card Type"
        required
        value={values.cardType}
        onChange={(e) => handleChange("cardType", e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          id="country"
          label="Country"
          value={
            values.country
              ? { label: values.country, value: values.country }
              : null
          }
          onChange={(option) =>
            handleChange(
              "country",
              (option as { label: string; value: string }).value
            )
          }
          options={[{ label: "Select country", value: "" }, ...countryOptions]}
          required
        />

        <SelectField
          id="country-code"
          label="Country Code"
          value={
            values.countryCode
              ? { label: values.countryCode, value: values.countryCode }
              : null
          }
          onChange={(option) =>
            handleChange(
              "countryCode",
              (option as { label: string; value: string }).value
            )
          }
          options={[
            { label: "Select country code", value: "" },
            ...countryCodeOptions,
          ]}
          required
        />
      </div>

      <SelectField
        id="currency"
        label="Currency"
        value={
          values.currency
            ? { label: values.currency, value: values.currency }
            : null
        }
        onChange={(option) =>
          handleChange(
            "currency",
            (option as { label: string; value: string }).value
          )
        }
        options={[{ label: "Select currency", value: "" }, ...currencyOptions]}
        required
      />

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-semibold">Available Ranges *</span>
          <Button type="button" onClick={() => addArrayItem("availableRanges")}>
            Add
          </Button>
        </div>
        {values.availableRanges.map((v, i) => (
          <div key={i} className="flex gap-2">
            <FormField
              value={v}
              required
              placeholder="e.g., $50-$100"
              onChange={(e) =>
                handleArrayChange("availableRanges", i, e.target.value)
              }
            />
            <Button
              type="button"
              variant="danger"
              onClick={() => removeArrayItem("availableRanges", i)}>
              Remove
            </Button>
          </div>
        ))}
      </div>

      <SelectField
        id="receipt-types"
        label="Receipt Types"
        isMulti
        value={values.receiptTypes.map((rt) => ({ label: rt, value: rt }))}
        onChange={(options) =>
          handleChange(
            "receiptTypes",
            (options as { label: string; value: string }[]).map(
              (opt) => opt.value
            )
          )
        }
        options={RECEIPT_TYPE_OPTIONS}
        required
      />

      <div className="space-y-2">
        <h3 className="font-semibold">Rates by Range *</h3>
        {values.availableRanges
          .filter((range) => range.trim())
          .map((range, i) => {
            const rateData = values.rates[range] || {};
            return (
              <div key={i} className="p-4 border rounded space-y-3">
                <h4 className="font-medium">{range}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {values.receiptTypes.map((receiptType) => (
                    <FormField
                      key={receiptType}
                      label={receiptType}
                      type="number"
                      value={rateData[receiptType] || 0}
                      onChange={(e) => {
                        const newRates = { ...values.rates };
                        if (!newRates[range]) {
                          newRates[range] = {};
                        }
                        newRates[range] = {
                          ...newRates[range],
                          [receiptType]: Number(e.target.value),
                        };
                        setValues((prev) => ({ ...prev, rates: newRates }));
                      }}
                      required
                    />
                  ))}
                </div>
              </div>
            );
          })}
      </div>

      <FormField label="Image" type="file" onChange={handleImageChange} />
      {values.image && (
        <div className="w-32 h-32 relative">
          <Image
            src={URL.createObjectURL(values.image)}
            alt="Preview"
            fill
            className="object-cover rounded"
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={values.isActive}
          onChange={(e) => handleChange("isActive", e.target.checked)}
        />
        <span className="text-sm">Active</span>
      </div>

      <Button type="submit" isLoading={isLoading} disabled={isLoading}>
        Save Giftcard
      </Button>
    </form>
  );
}
