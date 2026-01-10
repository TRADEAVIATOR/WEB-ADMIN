import { getTransactions } from "@/lib/api/transactions";
import DataTableClient from "./DataTableClient";
import ResultState from "@/components/ui/ResultState";
import { TransactionsResponse } from "@/types/api";

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; limit?: string; status?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;
  const limit = params?.limit ? Number(params.limit) : 50;
  const status = params?.status || "";

  const res = await getTransactions(page, limit, status);

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch transactions."
        showRefresh
      />
    );
  }

  const payload = res.data?.data as TransactionsResponse | undefined;

  if (!payload) {
    return (
      <ResultState
        type="error"
        message="Invalid server response. Please try again later."
      />
    );
  }

  if (!payload.transactions || payload.transactions.length === 0) {
    return <ResultState type="empty" message="No transactions found." />;
  }

  return (
    <DataTableClient
      initialData={payload.transactions}
      initialPage={payload.pagination.currentPage}
      totalPages={payload.pagination.totalPages}
    />
  );
}
