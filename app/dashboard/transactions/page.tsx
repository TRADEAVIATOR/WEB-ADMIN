import { getTransactions } from "@/lib/api/transactions";
import DataTableClient from "./DataTableClient";
import ResultState from "@/components/ui/ResultState";

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getTransactions(page);

  if (!res || res.error) {
    return <ResultState type="error" message="Unable to fetch transactions." />;
  }

  const payload = res.data?.data as
    | {
        transactions: any[];
        pagination: {
          currentPage: number;
          totalPages: number;
          totalItems: number;
          limit: number;
          hasMore: boolean;
        };
      }
    | undefined;

  if (!payload) {
    return (
      <ResultState
        type="error"
        message="Invalid server response. Please try again later."
      />
    );
  }

  if (!payload.transactions || payload.transactions.length === 0) {
    return (
      <>
        <ResultState type="empty" message="No transactions found." />
      </>
    );
  }

  return (
    <DataTableClient
      initialData={payload.transactions}
      initialPage={payload.pagination.currentPage}
      totalPages={payload.pagination.totalPages}
    />
  );
}
