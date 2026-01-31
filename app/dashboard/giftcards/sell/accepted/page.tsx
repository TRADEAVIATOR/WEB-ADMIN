import PageHeader from "@/components/ui/PageHeader";
import DataTableClient from "./DataTableClient";
import ResultState from "@/components/ui/ResultState";
import { getAcceptedGiftCards } from "@/lib/api/giftcards";
import SuccessRateIcon from "@/assets/icons/success-rate.svg";
import OrdersIcon from "@/assets/icons/orders.svg";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function AcceptedGiftCardsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getAcceptedGiftCards(page, 50);

  let content;
  let stats: { label: string; value: number; icon: any }[] = [];

  if (!res || res.error) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch accepted gift cards. Please try again."
      />
    );
  } else {
    const payload = res.data;

    if (!payload || !payload.data) {
      content = (
        <ResultState
          type="error"
          message="Invalid server response. Please try again later."
        />
      );
    } else if (payload.data.length === 0) {
      content = (
        <ResultState type="empty" message="No accepted gift cards found." />
      );
    } else {
      stats = [
        {
          label: "Total Sales",
          value: payload.pagination.totalItems,
          icon: OrdersIcon,
        },
        {
          label: "Total Pages",
          value: payload.pagination.totalPages,
          icon: SuccessRateIcon,
        },
      ];

      content = (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white p-5 rounded-2xl border border-gray-100">
                <h3 className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Image
                    src={stat.icon}
                    alt={stat.label}
                    width={20}
                    height={20}
                  />
                  {stat.label}
                </h3>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <DataTableClient
            initialData={payload.data}
            initialPage={payload.pagination.currentPage}
            totalPages={payload.pagination.totalPages}
          />
        </>
      );
    }
  }

  return (
    <>
      <PageHeader
        title="Accepted Gift Cards"
        description="Manage all accepted gift cards"
        buttonIcon={<FiPlus size={16} />}
        buttonText="Add Accepted Giftcard"
        buttonHref="/dashboard/giftcards/sell/accepted/add"
      />
      {content}
    </>
  );
}
