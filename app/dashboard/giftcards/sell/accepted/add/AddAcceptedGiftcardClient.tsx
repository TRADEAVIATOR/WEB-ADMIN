"use client";

import { ChevronLeft } from "lucide-react";
import { createAcceptedGiftcard } from "@/lib/api/giftcards";
import AcceptedGiftcardForm from "@/components/forms/AcceptedGiftcardForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { handleApiError } from "@/lib/utils/errorHandler";

export default function AddAcceptedGiftcardClient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: FormData) => {
    setIsLoading(true);
    const toastId = toast.loading("Creating giftcard...");

    try {
      const res = await createAcceptedGiftcard(values);

      if (res?.error) {
        toast.error(res?.message || "Failed to create accepted giftcard", {
          id: toastId,
        });
        return;
      }

      toast.success(
        res?.data?.message || "Accepted giftcard created successfully!",
        { id: toastId }
      );

      router.push("/dashboard/giftcards/sell/accepted");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
      handleApiError(error);
    } finally {
      setIsLoading(false);
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
        <AcceptedGiftcardForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
