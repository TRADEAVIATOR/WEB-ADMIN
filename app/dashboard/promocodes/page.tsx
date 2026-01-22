import PageHeader from "@/components/ui/PageHeader";
import ResultState from "@/components/ui/ResultState";
import { getPromoCodes } from "@/lib/api/promocodes";
import DataTableClient from "./DataTableClient";

export const dynamic = "force-dynamic";

export default async function PromoCodesPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getPromoCodes({ page, limit: 50 });

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch promo codes."
        showRefresh
      />
    );
  }

  const payload = res.data?.data;

  if (!payload || !payload.results) {
    return <ResultState type="error" message="Invalid server response." />;
  }

  if (payload.results.length === 0) {
    return <ResultState type="empty" message="No promo codes found." />;
  }

  return (
    <>
      <PageHeader
        title="Promo Codes"
        description="Manage discounts, bonuses, and promotional campaigns"
        buttonHref="/dashboard/promocodes/create"
        buttonText="Add Promo Code"
      />

      <DataTableClient
        initialData={payload.results}
        initialPage={payload.pagination.currentPage}
        totalPages={payload.pagination.totalPages}
      />
    </>
  );
}
