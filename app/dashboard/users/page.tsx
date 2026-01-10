import PageHeader from "@/components/ui/PageHeader";
import DataTableClient from "./DataTableClient";
import ResultState from "@/components/ui/ResultState";
import { getCustomers } from "@/lib/api/customers";
import { CustomersResponse } from "@/types/api";

export const dynamic = "force-dynamic";

export default async function UsersPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;
  const res = await getCustomers(page, 50);

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch customers."
        showRefresh
      />
    );
  }

  const payload = res.data?.data as CustomersResponse | undefined;

  if (!payload) {
    return (
      <ResultState
        type="error"
        message="Invalid server response. Please try again later."
      />
    );
  }

  if (!payload.customers || payload.customers.length === 0) {
    return (
      <>
        <ResultState type="empty" message="No customers found." />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Users"
        description="Manage all registered users and their details"
      />
      <DataTableClient
        initialData={payload.customers}
        initialPage={payload.pagination.currentPage}
        totalPages={payload.pagination.totalPages}
      />
    </>
  );
}
