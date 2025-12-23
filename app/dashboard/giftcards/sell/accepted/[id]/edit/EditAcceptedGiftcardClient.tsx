"use client";

import { ChevronLeft } from "lucide-react";
import { updateAcceptedGiftcard } from "@/lib/api/giftcards";
import AcceptedGiftcardForm from "@/components/forms/AcceptedGiftcardForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { handleApiError } from "@/lib/utils/errorHandler";

export default function EditAcceptedGiftcardClient({ initialValues, id }) {
  const router = useRouter();

  const handleSubmit = async (values: FormData) => {
    try {
      const res = await updateAcceptedGiftcard(id, values);

      if (res?.error) {
        toast.error("Failed to update accepted giftcard");
        return;
      }

      toast.success(
        res?.data?.message || "Accepted giftcard updated successfully!"
      );
      router.push("/dashboard/giftcards/sell/accepted");
    } catch (error: any) {
      handleApiError(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      <button
        onClick={() => router.back()}
        className="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium mb-6 transition">
        <ChevronLeft size={18} />
        <span>Back</span>
      </button>

      <div className="max-w-4xl mx-auto">
        <AcceptedGiftcardForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
