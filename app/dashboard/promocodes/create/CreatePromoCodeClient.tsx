"use client";

import { useState } from "react";
import PromoCodeForm, {
  PromoCodeFormValues,
} from "@/components/forms/PromoCodeForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createPromoCode } from "@/lib/api/promocodes";
import { handleApiError } from "@/lib/utils/errorHandler";
import { ChevronLeft } from "lucide-react";

export default function CreatePromoCodeClient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (values: PromoCodeFormValues) => {
    setIsLoading(true);

    try {
      const res = await createPromoCode(values);

      if (res?.error) {
        toast.error(res?.message || "Failed to create promo code");
        return;
      }

      toast.success(res?.data?.message || "Promo code created successfully!");
      router.push("/dashboard/promocodes");
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      <button
        onClick={() => window.history.back()}
        className="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium mb-6 transition"
        disabled={isLoading}>
        <ChevronLeft size={18} />
        <span>Back</span>
      </button>

      <div className="max-w-4xl mx-auto">
        <PromoCodeForm onSubmit={handleCreate} isLoading={isLoading} />
      </div>
    </div>
  );
}
