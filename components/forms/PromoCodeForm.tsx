"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import FormField from "../ui/FormField";
import SelectField from "../ui/SelectField";
import toast from "react-hot-toast";

export type PromoCodeFormValues = {
  code: string;
  description: string;
  bonusAmount: string;
  bonusType: "FIXED" | "PERCENTAGE";
  minSaleAmount?: string;
  maxUses?: string;
  validFrom: string;
  validUntil?: string;
  isActive?: boolean;
};

interface PromoCodeFormProps {
  initialValues?: Partial<PromoCodeFormValues>;
  onSubmit: (values: PromoCodeFormValues) => void;
  isLoading?: boolean;
}

const BONUS_TYPE_OPTIONS = [
  { label: "Fixed", value: "FIXED" },
  { label: "Percentage", value: "PERCENTAGE" },
];

export default function PromoCodeForm({
  initialValues,
  onSubmit,
  isLoading = false,
}: PromoCodeFormProps) {
  const [values, setValues] = useState<PromoCodeFormValues>({
    code: initialValues?.code || "",
    description: initialValues?.description || "",
    bonusAmount: initialValues?.bonusAmount?.toString() || "",
    bonusType: initialValues?.bonusType || "FIXED",
    minSaleAmount: initialValues?.minSaleAmount?.toString() || "",
    maxUses: initialValues?.maxUses?.toString() || "",
    validFrom: initialValues?.validFrom || "",
    validUntil: initialValues?.validUntil || "",
    isActive: initialValues?.isActive ?? true,
  });

  const handleChange = (field: keyof PromoCodeFormValues, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!values.code) {
      toast.error("Code is required");
      return;
    }

    if (!values.validFrom) {
      toast.error("Valid From date is required");
      return;
    }

    const payload = {
      ...values,
      validFrom: new Date(values.validFrom).toISOString(),
      validUntil: values.validUntil
        ? new Date(values.validUntil).toISOString()
        : undefined,
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Code"
        required
        value={values.code}
        onChange={(e) => handleChange("code", e.target.value)}
      />

      <FormField
        label="Description"
        value={values.description}
        onChange={(e) => handleChange("description", e.target.value)}
        as="textarea"
        rows={3}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Bonus Amount"
          type="number"
          min={0}
          value={values.bonusAmount}
          onChange={(e) => handleChange("bonusAmount", Number(e.target.value))}
          required
        />

        <SelectField
          id="bonusType"
          label="Bonus Type"
          value={BONUS_TYPE_OPTIONS.find(
            (opt) => opt.value === values.bonusType,
          )}
          onChange={(option) =>
            handleChange(
              "bonusType",
              (option as { label: string; value: "FIXED" | "PERCENTAGE" })
                .value,
            )
          }
          options={BONUS_TYPE_OPTIONS}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Minimum Sale Amount"
          type="number"
          min={0}
          value={values.minSaleAmount}
          onChange={(e) =>
            handleChange("minSaleAmount", Number(e.target.value))
          }
        />

        <FormField
          label="Maximum Uses"
          type="number"
          min={0}
          value={values.maxUses}
          onChange={(e) => handleChange("maxUses", Number(e.target.value))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Valid From"
          type="datetime-local"
          value={values.validFrom}
          onChange={(e) => handleChange("validFrom", e.target.value)}
          required
        />

        <FormField
          label="Valid Until"
          type="datetime-local"
          value={values.validUntil}
          onChange={(e) => handleChange("validUntil", e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={values.isActive}
          onChange={(e) => handleChange("isActive", e.target.checked)}
        />
        <span className="text-sm">Active</span>
      </div>

      <Button type="submit" isLoading={isLoading} disabled={isLoading}>
        Save Promo Code
      </Button>
    </form>
  );
}
