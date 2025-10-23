"use client";

import Image from "next/image";
import Select from "@/components/ui/Select";
import { Sparklines, SparklinesLine } from "react-sparklines";
import VirtualCardChart from "./VirtualCardChart";

export default function PerformanceCard() {
  const data = [50, 70, 65, 90, 75, 100, 80, 110, 95, 105, 120, 100];

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-medium text-gray-600">Performance</p>
        <Select options={["All time"]} />
      </div>

      <div className="mb-6">
        <p className="text-gray-500 text-sm">Total Balance</p>
        <p className="text-3xl font-bold text-gray-800">₦1,000,000,000</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 border-r-2 border-gray-100 pr-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center gap-3">
              <Image src="/icons/deposit.svg" alt="" width={22} height={22} />
              <div>
                <p className="text-gray-500 text-sm">Total Deposit</p>
                <p className="font-bold text-lg text-gray-800">
                  ₦1,000,000,000
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/icons/withdrawal.svg"
                alt=""
                width={22}
                height={22}
              />
              <div>
                <p className="text-gray-500 text-sm">Total Withdrawal</p>
                <p className="font-bold text-lg text-gray-800">
                  ₦1,000,000,000
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Image src="/icons/people.svg" alt="" width={22} height={22} />
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="font-bold text-lg text-gray-800">200,000</p>
              </div>
            </div>
          </div>

          <div className="w-full h-24">
            <Sparklines data={data}>
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
              {[
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
              ].map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:pl-8">
          <VirtualCardChart />
        </div>
      </div>
    </div>
  );
}
