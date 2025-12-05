"use client";

import DataTableClient from "./DataTableClient";
import PageHeader from "@/components/ui/PageHeader";
import Image from "next/image";

import OrdersIcon from "@/assets/icons/orders.svg";
import SuccessRateIcon from "@/assets/icons/success-rate.svg";
import AverageValueIcon from "@/assets/icons/average-value.svg";

export default function Page() {
  const stats = [
    {
      label: "Total Orders",
      value: "1,000",
      icon: OrdersIcon,
    },
    {
      label: "Success Rate",
      value: "100%",
      icon: SuccessRateIcon,
    },
    {
      label: "Average Order Value",
      value: "₦1,000",
      icon: AverageValueIcon,
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

      <PageHeader />
      <DataTableClient />
    </>
  );
}
