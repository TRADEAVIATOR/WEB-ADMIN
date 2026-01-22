"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import Badge from "@/components/ui/Badge";
import { MenuItem, RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import toast from "react-hot-toast";
import { handleApiError } from "@/lib/utils/errorHandler";
import { deletePromoCode } from "@/lib/api/promocodes";

interface PromoCode {
  id: string;
  code: string;
  description: string;
  bonusAmount: string;
  bonusType: "FIXED" | "PERCENTAGE";
  applicableFor: string;
  minSaleAmount: string | null;
  maxUses: number | null;
  currentUses: number;
  isActive: boolean;
  validFrom: string;
  validUntil: string | null;
}

export default function DataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps<PromoCode>) {
  const router = useRouter();

  const columns = [
    { key: "code", label: "Code" },
    { key: "description", label: "Description" },
    { key: "bonus", label: "Bonus" },
    { key: "applicableFor", label: "Applicable For" },
    { key: "usage", label: "Usage" },
    { key: "status", label: "Status" },
    { key: "validity", label: "Validity" },
  ];

  const rows: RowData[] = initialData.map((promo) => ({
    id: promo.id,
    code: promo.code,
    description: promo.description,
    bonus:
      promo.bonusType === "PERCENTAGE"
        ? `${promo.bonusAmount}%`
        : `₦${promo.bonusAmount}`,
    applicableFor: promo.applicableFor.replaceAll("_", " "),
    usage: promo.maxUses
      ? `${promo.currentUses} / ${promo.maxUses}`
      : `${promo.currentUses} / ∞`,
    status: (
      <Badge
        text={promo.isActive ? "Active" : "Inactive"}
        color={promo.isActive ? "green" : "red"}
      />
    ),
    validity: `${new Date(promo.validFrom).toLocaleDateString()} ${
      promo.validUntil
        ? `– ${new Date(promo.validUntil).toLocaleDateString()}`
        : "– No expiry"
    }`,
  }));

  const handleDeletePromoCode = async (id: string) => {
    const toastId = toast.loading("Deactivating promo code...");

    try {
      const res = await deletePromoCode(id);

      if (!res?.error) {
        toast.success("Promo code deactivated successfully!", { id: toastId });
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to deactivate promo code.", {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred.", { id: toastId });
      handleApiError(error);
    }
  };

  const menuItems: MenuItem<RowData>[] = [
    {
      label: "View",
      onClick: (row) => router.push(`/dashboard/promocodes/${row.id}`),
    },
    {
      label: "Edit",
      onClick: (row) => router.push(`/dashboard/promocodes/${row.id}/edit`),
    },
    {
      label: "Delete",
      color: "text-red-600",
      onClick: (row) => handleDeletePromoCode(String(row.id)),
    },
  ];

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/promocodes?page=${page}`);
  };

  return (
    <>
      <DataTable columns={columns} data={rows} menuItems={menuItems} />
      <Pagination
        currentPage={initialPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
