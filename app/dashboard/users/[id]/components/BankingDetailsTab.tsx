"use client";

import DetailItem from "@/components/shared/DetailItem";
import { formatCurrency } from "@/lib/utils/format";
import { Customer } from "@/types/models";

interface BankingDetailsTabProps {
  customer: Customer;
}

export default function BankingDetailsTab({
  customer,
}: BankingDetailsTabProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-md font-semibold text-gray-700">Virtual Accounts</h3>
      {customer.virtualAccounts?.length > 0 ? (
        customer.virtualAccounts.map((account, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
            <DetailItem label="Bank Name" value={account.bankName || "-"} />
            <DetailItem
              label="Account Name"
              value={account.accountName || "-"}
            />
            <DetailItem
              label="Account Number"
              value={account.accountNumber || "-"}
            />
            <DetailItem
              label="Account Balance"
              value={formatCurrency(account.balance)}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-500">No virtual accounts available.</p>
      )}

      <h3 className="text-md font-semibold text-gray-700">Wallets</h3>
      {customer.wallets?.length > 0 ? (
        customer.wallets.map((wallet, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-4 pb-4">
            <DetailItem
              label="Deposit Balance"
              value={formatCurrency(wallet.depositBalance)}
            />
            <DetailItem
              label="Referral Balance"
              value={formatCurrency(wallet.referralBalance)}
            />
            <DetailItem
              label="Cashback Balance"
              value={formatCurrency(wallet.cashBackBalance)}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-500">No wallets available.</p>
      )}
    </div>
  );
}
