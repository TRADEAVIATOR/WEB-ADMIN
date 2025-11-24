import DataTableClient from "./DataTableClient";
import PageHeader from "@/components/ui/PageHeader";
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
  const res = await getCustomers(page);

  if (!res || res.error) {
    return <ResultState type="error" message="Unable to fetch customers." />;
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
        <PageHeader />
        <ResultState type="empty" message="No customers found." />
      </>
    );
  }

  return (
    <>
      <PageHeader />
      <DataTableClient
        initialData={payload.customers}
        initialPage={payload.pagination.currentPage}
        totalPages={payload.pagination.totalPages}
      />
    </>
  );
}
