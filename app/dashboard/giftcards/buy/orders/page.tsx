import PageHeader from "@/components/ui/PageHeader";
import DataTableClient from "./DataTableClient";
import ResultState from "@/components/ui/ResultState";
import { getGiftCardOrders } from "@/lib/api/giftcards";
import OrdersIcon from "@/assets/icons/orders.svg";
import SuccessRateIcon from "@/assets/icons/success-rate.svg";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function GiftCardOrdersPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getGiftCardOrders(page);

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch gift card orders. Please try again."
      />
    );
  }

  const payload = res.data;

  if (!payload) {
    return (
      <ResultState
        type="error"
        message="Invalid server response. Please try again later."
      />
    );
  }

  if (!payload.data || payload.data.length === 0) {
    return <ResultState type="empty" message="No gift card orders found." />;
  }

  const stats = [
    {
      label: "Total Orders",
      value: payload.pagination.totalItems,
      icon: OrdersIcon,
    },
    {
      label: "Total Pages",
      value: payload.pagination.totalPages,
      icon: SuccessRateIcon,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-5 rounded-2xl border border-gray-100">
            <h3 className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Image src={stat.icon} alt={stat.label} width={20} height={20} />
              {stat.label}
            </h3>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <PageHeader
        title="Gift Card Orders"
        description="Track and manage all gift card orders"
      />
      <DataTableClient
        initialData={payload.data}
        initialPage={payload.pagination.currentPage}
        totalPages={payload.pagination.totalPages}
      />
    </>
  );
}
