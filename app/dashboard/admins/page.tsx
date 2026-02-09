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

  const res = await getAdmins(page, 50);

  let content;

  if (!res || res.error) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch administrators."
        showRefresh
      />
    );
  } else {
    const admins = res.data?.data;

    if (!admins || admins.length === 0) {
      content = <ResultState type="empty" message="No administrators found." />;
    } else {
      content = (
        <DataTableClient
          initialData={admins}
          initialPage={page}
          totalPages={res.data?.meta?.totalPages || 1}
        />
      );
    }
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
      {content}
    </>
  );
}
