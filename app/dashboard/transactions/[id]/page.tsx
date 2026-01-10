import ResultState from "@/components/ui/ResultState";
import TransactionDetails from "./TransactionDetails";
import { getTransaction } from "@/lib/api/transactions";
import { Transaction } from "@/types/models";

export const dynamic = "force-dynamic";

export default async function TransactionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getTransaction(id);

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch transaction details."
        showRefresh
      />
    );
  }

  const transaction = res.data?.data?.transaction as Transaction | undefined;

  if (!transaction) {
    return (
      <ResultState
        type="error"
        message="Invalid server response. Please try again later."
      />
    );
  }

  return <TransactionDetails transaction={transaction} />;
}
