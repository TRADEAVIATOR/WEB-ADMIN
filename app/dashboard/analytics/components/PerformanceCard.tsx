"use client";

import Image from "next/image";
import { Sparklines, SparklinesLine } from "react-sparklines";
import VirtualCardChart from "./VirtualCardChart";
import DepositIcon from "@/assets/icons/deposit.svg";
import WithdrawalIcon from "@/assets/icons/withdrawal.svg";
import PeopleIcon from "@/assets/icons/people.svg";
import FormField from "@/components/ui/FormField";

interface PerformanceCardProps {
  data?: {
    overview?: {
      totalBalance: number;
      totalUsers: number;
    };
    volumes?: {
      deposits: string;
      withdrawals: string;
    };
    charts?: {
      cryptoVolumeByMonth?: Array<{ month: string; value: string }>;
      cardsDistribution?: Array<{ count: number; percentage: string }>;
    };
  };
}

export default function PerformanceCard({ data }: PerformanceCardProps) {
  const { overview, volumes, charts } = data || {};

  const cryptoMonthlyData = charts?.cryptoVolumeByMonth || [];
  const sparklineData =
    cryptoMonthlyData.length > 0
      ? cryptoMonthlyData.map((item) => parseFloat(item.value || "0"))
      : [50, 70, 65, 90, 75, 100, 80, 110, 95, 105, 120, 100];

  const monthLabels =
    cryptoMonthlyData.length > 0
      ? cryptoMonthlyData.map((item) => item.month)
      : [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-medium text-gray-600">Performance</p>
        <FormField
          as="select"
          options={[{ label: "All time", value: "All time" }]}
          className="w-40"
        />
      </div>

      <div className="mb-6">
        <p className="text-gray-500 text-sm">Total Balance</p>
        <p className="text-3xl font-bold text-gray-800">
          ₦
          {(overview?.totalBalance || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 border-r-0 lg:border-r-2 border-gray-100 lg:pr-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center gap-3">
              <Image src={DepositIcon} alt="Deposit" width={22} height={22} />
              <div>
                <p className="text-gray-500 text-sm">Total Deposit</p>
                <p className="font-bold text-lg text-gray-800">
                  ₦
                  {parseFloat(volumes?.deposits || "0").toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Image
                src={WithdrawalIcon}
                alt="Withdrawal"
                width={22}
                height={22}
              />
              <div>
                <p className="text-gray-500 text-sm">Total Withdrawal</p>
                <p className="font-bold text-lg text-gray-800">
                  ₦
                  {parseFloat(volumes?.withdrawals || "0").toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Image src={PeopleIcon} alt="Users" width={22} height={22} />
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="font-bold text-lg text-gray-800">
                  {(overview?.totalUsers || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-24">
            <Sparklines data={sparklineData}>
              <SparklinesLine
                color="#FE7F32"
                style={{
                  fill: "none",
                  strokeWidth: 1.8,
                  strokeLinejoin: "round",
                  strokeLinecap: "round",
                }}
              />
            </Sparklines>
            <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
              {monthLabels.map((month, index) => (
                <span key={index}>{month}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:pl-8">
          <VirtualCardChart cardsData={charts?.cardsDistribution} />
        </div>
      </div>
    </div>
  );
}
