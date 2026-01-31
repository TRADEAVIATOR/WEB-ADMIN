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

  let content;

  if (!res || res.error) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch promo codes."
        showRefresh
      />
    );
  } else {
    const payload = res.data?.data;

    if (!payload || !payload.results) {
      content = <ResultState type="error" message="Invalid server response." />;
    } else if (payload.results.length === 0) {
      content = <ResultState type="empty" message="No promo codes found." />;
    } else {
      content = (
        <DataTableClient
          initialData={payload.results}
          initialPage={payload.pagination.currentPage}
          totalPages={payload.pagination.totalPages}
        />
      );
    }
  }

  return (
    <>
      <PageHeader
        title="Promo Codes"
        description="Manage discounts, bonuses, and promotional campaigns"
        buttonHref="/dashboard/promocodes/create"
        buttonText="Add Promo Code"
      />
      {content}
    </>
  );
}
