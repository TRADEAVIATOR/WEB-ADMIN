import PageHeader from "@/components/ui/PageHeader";
import ResultState from "@/components/ui/ResultState";
import DataTableClient from "./DataTableClient";
import { getAdmins } from "@/lib/api/auth";
import { FiPlus } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function AdminsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getAdmins(page);

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch administrators."
        showRefresh
      />
    );
  }

  const admins = res.data?.admins;

  if (!admins || admins.length === 0) {
    return <ResultState type="empty" message="No administrators found." />;
  }

  return (
    <>
      <PageHeader
        title="Administrators"
        description="Manage your platform administrators and their roles"
        buttonIcon={<FiPlus size={16} />}
        buttonText="Add new administrator"
        modalTypeToOpen="add-new-administrator"
      />
      <DataTableClient
        initialData={admins}
        initialPage={page}
        totalPages={res.data?.pagination?.totalPages || 1}
      />
    </>
  );
}
