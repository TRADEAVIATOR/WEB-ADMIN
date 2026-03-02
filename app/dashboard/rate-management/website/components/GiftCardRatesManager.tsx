"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, CreditCard } from "lucide-react";
import { useGiftCardRates } from "@/hooks/useRates";
import { GiftCardRate } from "@/types/rates";
import Pagination from "@/components/ui/Pagination";
import RateFormModal from "@/components/modals/RateFormModal";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { formatCurrency } from "@/lib/utils/format";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import ResultState from "@/components/ui/ResultState";
import { SkeletonTable } from "./SkeletonTable";

const PAGE_SIZE = 8;

const countryColors: Record<string, string> = {
  USD: "bg-green-50 text-green-700",
  EUR: "bg-blue-50 text-blue-700",
  GBP: "bg-purple-50 text-purple-700",
  CAD: "bg-red-50 text-red-700",
};

export default function GiftCardRatesManager() {
  const { rates, loading, error, upsertRate, deleteRate } = useGiftCardRates();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<{
    open: boolean;
    rate: GiftCardRate | null;
  }>({
    open: false,
    rate: null,
  });
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = rates.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.country.toLowerCase().includes(search.toLowerCase()),
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openAdd = () => setModal({ open: true, rate: null });
  const openEdit = (rate: GiftCardRate) => setModal({ open: true, rate });
  const closeModal = () => setModal({ open: false, rate: null });

  const handleDelete = async (id: string) => {
    await deleteRate(id);
    setConfirmDelete(null);
  };

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 border-b border-gray-100 gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
            <CreditCard size={18} className="text-secondary" />
          </span>
          <div>
            <h2 className="text-base font-semibold text-secondary">
              Gift Card Rates
            </h2>
            <p className="text-xs text-gray-400">{rates.length} cards</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <FormField
            type="search"
            placeholder="Search cards…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-64"
            required={false}
          />

          <Button
            onClick={openAdd}
            variant="secondary"
            rounded="lg"
            size="md"
            icon={<Plus size={16} />}
            iconPosition="left"
            className="w-full sm:w-auto">
            Add Rate
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <SkeletonTable cols={5} rows={5} />
        ) : error ? (
          <ResultState type="error" message={error} />
        ) : filtered.length === 0 ? (
          <ResultState type="empty" message="No gift card rates found" />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                {[
                  "Card",
                  "Country",
                  "Buy (₦)",
                  "Sell (₦)",
                  "Margin",
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
                const margin = (
                  ((rate.buyRate - rate.sellRate) / rate.buyRate) *
                  100
                ).toFixed(1);
                const badgeClass =
                  countryColors[rate.country] ?? "bg-gray-100 text-gray-600";
                return (
                  <tr
                    key={rate.id}
                    className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 font-medium text-secondary">
                      {rate.name}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-md px-2.5 py-1 text-xs font-bold ${badgeClass}`}>
                        {rate.country}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      {formatCurrency(rate.buyRate)}
                    </td>

                    <td className="px-6 py-4 text-red-500 font-semibold">
                      {formatCurrency(rate.sellRate)}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{margin}%</td>
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
        type="giftcard"
        initial={modal.rate}
        onClose={closeModal}
        onSubmit={upsertRate}
      />

      {confirmDelete && (
        <ConfirmationModal
          isOpen={!!confirmDelete}
          onClose={() => setConfirmDelete(null)}
          onConfirm={() => handleDelete(confirmDelete)}
          title="Delete Gift Card Rate"
          description="Are you sure you want to delete this gift card rate? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
        />
      )}
    </div>
  );
}
