"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, TrendingUp } from "lucide-react";
import { useCryptoRates } from "@/hooks/useRates";
import { CryptoRate } from "@/types/rates";
import RateFormModal from "@/components/modals/RateFormModal";
import Pagination from "@/components/ui/Pagination";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { formatCurrency } from "@/lib/utils/format";
import Button from "@/components/ui/Button";
import ResultState from "@/components/ui/ResultState";
import { SkeletonTable } from "./SkeletonTable";

const PAGE_SIZE = 8;

export default function CryptoRatesManager() {
  const { rates, loading, error, upsertRate, deleteRate } = useCryptoRates();
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<{
    open: boolean;
    rate: CryptoRate | null;
  }>({
    open: false,
    rate: null,
  });
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const totalPages = Math.ceil(rates.length / PAGE_SIZE);
  const paged = rates.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openAdd = () => setModal({ open: true, rate: null });
  const openEdit = (rate: CryptoRate) => setModal({ open: true, rate });
  const closeModal = () => setModal({ open: false, rate: null });

  const handleDelete = async (id: string) => {
    await deleteRate(id);
    setConfirmDelete(null);
  };

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 border-b border-gray-100 gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-primary/10">
            <TrendingUp size={18} className="text-primary" />
          </span>
          <div>
            <h2 className="text-base font-semibold text-secondary">
              Crypto Rates
            </h2>
            <p className="text-xs text-gray-400">{rates.length} assets</p>
          </div>
        </div>

        <Button
          onClick={openAdd}
          variant="primary"
          rounded="lg"
          size="md"
          icon={<Plus size={16} />}
          iconPosition="left"
          className="self-start sm:self-auto">
          Add Rate
        </Button>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <SkeletonTable cols={5} rows={5} />
        ) : error ? (
          <ResultState type="error" message={error} />
        ) : rates.length === 0 ? (
          <ResultState type="empty" message="No crypto rates yet" />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                {[
                  "Symbol",
                  "Name",
                  "Buy (₦)",
                  "Sell (₦)",
                  "Spread",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paged.map((rate) => {
                const spread = rate.usdToNgnBuy - rate.usdToNgnSell;
                return (
                  <tr
                    key={rate.id}
                    className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-md bg-secondary/5 px-2.5 py-1 text-xs font-bold text-secondary">
                        {rate.symbol}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-secondary">
                      {rate.name}
                    </td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      {formatCurrency(rate.usdToNgnBuy)}
                    </td>

                    <td className="px-6 py-4 text-red-500 font-semibold">
                      {formatCurrency(rate.usdToNgnSell)}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {formatCurrency(spread)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(rate)}
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-primary/10 hover:text-primary transition-colors">
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(rate.id)}
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      <RateFormModal
        isOpen={modal.open}
        type="crypto"
        initial={modal.rate}
        onClose={closeModal}
        onSubmit={upsertRate}
      />

      {confirmDelete && (
        <ConfirmationModal
          isOpen={!!confirmDelete}
          onClose={() => setConfirmDelete(null)}
          onConfirm={() => handleDelete(confirmDelete)}
          title="Delete Crypto Rate"
          description="Are you sure you want to delete this crypto rate? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
        />
      )}
    </div>
  );
}
