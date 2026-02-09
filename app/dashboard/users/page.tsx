import PageHeader from "@/components/ui/PageHeader";
import DataTableClient from "./DataTableClient";
import ResultState from "@/components/ui/ResultState";
import { getCustomers } from "@/lib/api/customers";

export const dynamic = "force-dynamic";

export default async function UsersPage({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;
  const limit = params?.limit ? Number(params.limit) : 50;
  const search = params?.search || "";

  const response = await getCustomers(page, limit, search);

  let content;

  if (!response || response.error) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch customers."
        showRefresh
      />
    );
  } else {
    const { data, meta } = response.data;

    if (!data) {
      content = (
        <ResultState
          type="error"
          message="Invalid server response. Please try again later."
        />
      );
    } else if (!data || data.length === 0) {
      content = <ResultState type="empty" message="No customers found." />;
    } else {
      content = (
        <DataTableClient
          initialData={data}
          totalPages={meta.totalPages}
          initialPage={meta.page}
        />
      );
    }
  }

  return (
    <>
      <PageHeader
        title="Users"
        description="Manage all registered users and their details"
        enableSearch
      />
      {content}
    </>
  );
}
