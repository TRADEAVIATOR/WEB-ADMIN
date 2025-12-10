"use client";

import { createAcceptedGiftcard } from "@/lib/api/giftcards";
import AcceptedGiftcardForm, {
  AcceptedGiftcardFormValues,
} from "@/components/forms/AcceptedGiftcardForm";
import { ChevronLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddAcceptedGiftcardClient() {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.accessToken ?? "";

  const handleSubmit = async (values: AcceptedGiftcardFormValues) => {
    const res = await createAcceptedGiftcard(values, token);
    if (res?.error) {
      toast.error("Failed to create accepted giftcard");
      return;
    }
    toast.success(
      res?.data?.message || "Accepted giftcard created successfully!"
    );
    router.push("/dashboard/giftcards/sell/accepted");
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
        <AcceptedGiftcardForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
