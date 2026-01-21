import PageHeader from "@/components/ui/PageHeader";
import ResultState from "@/components/ui/ResultState";
import { getVouchers } from "@/lib/api/voucher";
import DataTableClient from "./DataTableClient";

export const dynamic = "force-dynamic";

export default async function VoucherPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getVouchers(page, 50);

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch vouchers."
        showRefresh
      />
    );
  }

  const payload = res.data;

  if (!payload) {
    return <ResultState type="empty" message="No vouchers found." />;
  }

  return (
    <>
      <PageHeader
        title="Vouchers"
        description="View all vouchers and their status"
        buttonText="Create Bulk Vouchers"
        modalTypeToOpen={"create-bulk-vouchers"}
      />
      <DataTableClient
        initialData={payload}
        initialPage={payload.pagination?.currentPage || 1}
        totalPages={payload.pagination?.totalPages || 1}
      />
    </>
  );
}
