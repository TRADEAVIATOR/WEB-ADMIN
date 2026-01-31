import PageHeader from "@/components/ui/PageHeader";
import DataTableClient from "./DataTableClient";
import ResultState from "@/components/ui/ResultState";
import { getCustomers } from "@/lib/api/customers";

export const dynamic = "force-dynamic";

export default async function UsersPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getCustomers(page, 50);

  let content;

  if (!res || res.error) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch customers."
        showRefresh
      />
    );
  } else {
    const payload = res.data?.data;

    if (!payload) {
      content = (
        <ResultState
          type="error"
          message="Invalid server response. Please try again later."
        />
      );
    } else if (!payload.customers || payload.customers.length === 0) {
      content = <ResultState type="empty" message="No customers found." />;
    } else {
      content = (
        <DataTableClient
          initialData={payload.customers}
          initialPage={payload.pagination.currentPage}
          totalPages={payload.pagination.totalPages}
        />
      );
    }
  }

  return (
    <>
      <PageHeader
        title="Users"
        description="Manage all registered users and their details"
      />
      {content}
    </>
  );
}
