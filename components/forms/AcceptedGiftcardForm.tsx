"use client";

import { useState, ChangeEvent } from "react";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import Image from "next/image";

export interface AcceptedGiftcardFormValues {
  cardName: string;
  cardType: string;
  country: string;
  countryCode: string;
  currency: string;
  brand: string;
  availableRanges: string[];
  receiptTypes: string[];
  minValue: number;
  maxValue: number;
  imageUrl?: string;
  instructions: string;
  isActive: boolean;
  rates: Record<string, { rate: number; cashReceipt?: number } | number>;
}

interface AcceptedGiftcardFormProps {
  initialValues?: Partial<AcceptedGiftcardFormValues>;
  onSubmit: (values: AcceptedGiftcardFormValues) => void;
  isLoading?: boolean;
}

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
    brand: initialValues?.brand || "",
    availableRanges: initialValues?.availableRanges || [],
    receiptTypes: initialValues?.receiptTypes || [],
    minValue: initialValues?.minValue || 0,
    maxValue: initialValues?.maxValue || 0,
    imageUrl: initialValues?.imageUrl || "",
    instructions: initialValues?.instructions || "",
    isActive: initialValues?.isActive ?? true,
    rates: initialValues?.rates || {},
  });

  const handleChange = (
    field: keyof AcceptedGiftcardFormValues,
    value: any
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (
    field: "availableRanges" | "receiptTypes",
    index: number,
    value: string
  ) => {
    const updatedArray = [...values[field]];
    updatedArray[index] = value;
    setValues((prev) => ({ ...prev, [field]: updatedArray }));
  };

  const addArrayItem = (field: "availableRanges" | "receiptTypes") => {
    setValues((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (
    field: "availableRanges" | "receiptTypes",
    index: number
  ) => {
    const updatedArray = values[field].filter((_, i) => i !== index);
    setValues((prev) => ({ ...prev, [field]: updatedArray }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setValues((prev) => ({ ...prev, imageUrl: url }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Card Name"
        placeholder="Enter card name"
        value={values.cardName}
        onChange={(e) => handleChange("cardName", e.target.value)}
        required
      />

      <FormField
        label="Card Type"
        placeholder="Enter card type"
        value={values.cardType}
        onChange={(e) => handleChange("cardType", e.target.value)}
        required
      />

      <FormField
        label="Brand"
        placeholder="Enter brand"
        value={values.brand}
        onChange={(e) => handleChange("brand", e.target.value)}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Country"
          placeholder="Enter country"
          value={values.country}
          onChange={(e) => handleChange("country", e.target.value)}
          required
        />
        <FormField
          label="Country Code"
          placeholder="Enter country code"
          value={values.countryCode}
          onChange={(e) => handleChange("countryCode", e.target.value)}
          required
        />
      </div>

      <FormField
        label="Currency"
        placeholder="Enter currency"
        value={values.currency}
        onChange={(e) => handleChange("currency", e.target.value)}
        required
      />

      <FormField
        label="Instructions"
        placeholder="Enter instructions"
        value={values.instructions}
        onChange={(e) => handleChange("instructions", e.target.value)}
        as="textarea"
        rows={4}
        required
      />

      <FormField
        label="Minimum Value"
        type="number"
        value={values.minValue}
        onChange={(e) => handleChange("minValue", Number(e.target.value))}
        required
      />

      <FormField
        label="Maximum Value"
        type="number"
        value={values.maxValue}
        onChange={(e) => handleChange("maxValue", Number(e.target.value))}
        required
      />

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Available Ranges</span>
          <Button type="button" onClick={() => addArrayItem("availableRanges")}>
            Add Range
          </Button>
        </div>
        {values.availableRanges.map((range, i) => (
          <div key={i} className="flex gap-2 items-center">
            <FormField
              placeholder="Range"
              value={range}
              onChange={(e) =>
                handleArrayChange("availableRanges", i, e.target.value)
              }
              required
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

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Receipt Types</span>
          <Button type="button" onClick={() => addArrayItem("receiptTypes")}>
            Add Type
          </Button>
        </div>
        {values.receiptTypes.map((type, i) => (
          <div key={i} className="flex gap-2 items-center">
            <FormField
              placeholder="Receipt Type"
              value={type}
              onChange={(e) =>
                handleArrayChange("receiptTypes", i, e.target.value)
              }
              required
            />
            <Button
              type="button"
              variant="danger"
              onClick={() => removeArrayItem("receiptTypes", i)}>
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <FormField label="Image" type="file" onChange={handleImageChange} />
        {values.imageUrl && (
          <div className="w-32 h-32 relative">
            <Image
              src={values.imageUrl}
              alt="Card Image"
              fill
              className="object-cover rounded"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="isActive"
          type="checkbox"
          checked={values.isActive}
          onChange={(e) => handleChange("isActive", e.target.checked)}
          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
        />
        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
          Active Status
        </label>
      </div>

      <Button type="submit" isLoading={isLoading}>
        Save Giftcard
      </Button>
    </form>
  );
}
