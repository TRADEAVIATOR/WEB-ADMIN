"use client";

import { useState } from "react";
import PromoCodeForm, {
  PromoCodeFormValues,
} from "@/components/forms/PromoCodeForm";
import { handleApiError } from "@/lib/utils/errorHandler";
import { updatePromoCode } from "@/lib/api/promocodes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ChevronLeft } from "lucide-react";

export default function EditPromoCodeClient({
  id,
  initialValues,
}: {
  id: string;
  initialValues: any;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (values: PromoCodeFormValues) => {
    setIsLoading(true);
    try {
      const res = await updatePromoCode(id, values);

      if (res?.error) {
        toast.error(res?.message || "Failed to update promo code");
        return;
      }

      toast.success(res?.data?.message || "Promo code updated successfully!");
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
        disabled={isLoading}
        className="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium mb-6 transition disabled:opacity-60 disabled:cursor-not-allowed">
        <ChevronLeft size={18} />
        <span>Back</span>
      </button>

      <div className="max-w-4xl mx-auto">
        <PromoCodeForm
          onSubmit={handleUpdate}
          initialValues={initialValues}
          isLoading={isLoading}
          mode="edit"
        />
      </div>
    </div>
  );
}
