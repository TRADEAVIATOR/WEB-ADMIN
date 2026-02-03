"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import ResetAdminPasswordModal from "@/components/modals/ResetAdminPasswordModal";
import { deleteAdmin, suspendAdmin } from "@/lib/api/auth";
import { MenuItem, RowData } from "@/types/common";
import Badge from "@/components/ui/Badge";
import { handleApiError } from "@/lib/utils/errorHandler";
import toast from "react-hot-toast";

type Admin = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  isAdmin: boolean;
  isSuper: boolean;
  isActive: boolean;
};

type DataTableClientProps = {
  initialData: Admin[];
  initialPage: number;
  totalPages: number;
};

export default function DataTableClient({
  initialData = [],
  initialPage = 1,
  totalPages = 1,
}: DataTableClientProps) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<string>("");

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "createdAt", label: "Date Added" },
  ];

  const rows: RowData[] = initialData.map((admin) => ({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: (
      <Badge
        text={admin.isSuper ? "Super Admin" : "Admin"}
        color={admin.isSuper ? "purple" : "blue"}
      />
    ),
    createdAt: new Date(admin.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    isActive: admin.isActive,
  }));

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/admins?page=${page}`);
  };

  const handleSuspendAdmin = async (adminId: string, isActive: boolean) => {
    const toastId = toast.loading(
      `${isActive ? "Activating" : "Suspending"} admin...`,
    );

    try {
      const res = await suspendAdmin(adminId, isActive);

      if (!res?.error) {
        toast.success(
          `Admin ${isActive ? "activated" : "suspended"} successfully!`,
          { id: toastId },
        );
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update admin status.", {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred.", { id: toastId });
      handleApiError(error);
    }
  };

  const handleDeleteAdmin = async (adminId: string) => {
    const toastId = toast.loading("Deleting admin...");

    try {
      const res = await deleteAdmin(adminId);

      if (!res?.error) {
        toast.success("Admin deleted successfully!", { id: toastId });
      } else {
        toast.error(res?.message || "Failed to delete admin.", { id: toastId });
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred.", { id: toastId });
      handleApiError(error);
    }
  };

  const handleOpenResetModal = (adminId: string) => {
    setSelectedAdminId(adminId);
    setModalOpen(true);
  };

  const adminMenuItems: MenuItem<RowData>[] = [
    {
      label: "Suspend Admin",
      color: "text-red-600",
      onClick: (row) => {
        if (confirm("Are you sure you want to suspend this admin?")) {
          handleSuspendAdmin(String(row.id), false);
        }
      },
      hidden: (row) => !row.isActive,
    },
    {
      label: "Activate Admin",
      color: "text-green-600",
      onClick: (row) => {
        handleSuspendAdmin(String(row.id), true);
      },
      hidden: (row) => Boolean(row.isActive),
    },
    {
      label: "Reset Password",
      onClick: (row) => handleOpenResetModal(String(row.id)),
    },
    {
      label: "Delete Admin",
      color: "text-red-600",
      onClick: (row) => {
        if (confirm("Are you sure you want to delete this admin?")) {
          handleDeleteAdmin(String(row.id));
        }
      },
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={rows} menuItems={adminMenuItems} />
      <Pagination
        currentPage={initialPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <ResetAdminPasswordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        adminId={selectedAdminId}
      />
    </>
  );
}
