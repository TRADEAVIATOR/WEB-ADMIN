"use client";

import DataTable from "@/components/ui/Table";
import { MenuItem, RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import toast from "react-hot-toast";
import { deleteTaglineClient } from "@/lib/api/taglines";
import { useModal } from "@/context/ModalContext";
import PageHeader from "@/components/ui/PageHeader";
import { handleApiError } from "@/lib/utils/errorHandler";
import { FiPlus } from "react-icons/fi";

export default function DataTableClient({
  initialData = [],
}: DataTableClientProps<string>) {
  const { openModal } = useModal();

  const columns = [{ key: "tagline", label: "Tagline" }];

  const rows: RowData[] = initialData.map((tagline, index) => ({
    id: index,
    tagline,
  }));

  const handleDeleteTagline = async (index: number) => {
    const toastId = toast.loading("Deleting tagline...");

    try {
      const res = await deleteTaglineClient(index);

      if (res?.success) {
        toast.success("Tagline deleted successfully!", { id: toastId });
      } else {
        toast.error(res?.message || "Failed to delete tagline.", {
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
      label: "Edit",
      onClick: (row) =>
        openModal("edit-tagline", {
          index: Number(row.id),
          tagline: row.tagline,
        }),
    },
    {
      label: "Delete",
      color: "text-red-600",
      onClick: (row) => handleDeleteTagline(Number(row.id)),
    },
  ];

  return (
    <>
      <PageHeader
        buttonIcon={<FiPlus size={16} />}
        buttonText="Add new tagline"
        description="Manage and create reusable taglines for notifications or campaigns"
        modalTypeToOpen="create-tagline"
        title="Taglines"
      />
      <DataTable columns={columns} data={rows} menuItems={menuItems} />
    </>
  );
}
