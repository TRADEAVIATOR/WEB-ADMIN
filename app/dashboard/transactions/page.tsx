import PageHeader from "@/components/ui/PageHeader";
import { getTransactions } from "@/lib/api/transactions";
import DataTableClient from "./DataTableClient";
import ResultState from "@/components/ui/ResultState";

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
    status?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;
  const limit = params?.limit ? Number(params.limit) : 50;
  const status = params?.status || "";
  const search = params?.search || "";

  const res = await getTransactions(page, limit, status, search);

  let content;

  if (!res || res.error) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch transactions."
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
    } else if (!payload.transactions || payload.transactions.length === 0) {
      content = <ResultState type="empty" message="No transactions found." />;
    } else {
      content = (
        <DataTableClient
          initialData={payload.transactions}
          initialPage={payload.pagination.currentPage}
          totalPages={payload.pagination.totalPages}
        />
      );
    }
  }

  return (
    <>
      <PageHeader
        title="Transactions"
        description="View and manage all user transactions"
        enableSearch
        filterFields={[
          {
            label: "Transaction Status",
            name: "status",
            type: "checkbox",
            options: [
              { label: "Successful", value: "SUCCESS" },
              { label: "Failed", value: "FAILED" },
              { label: "Pending", value: "PENDING" },
            ],
          },
        ]}
      />
      {content}
    </>
  );
}
