import PageHeader from "@/components/ui/PageHeader";
import ResultState from "@/components/ui/ResultState";
import { getAllCryptoPairRates } from "@/lib/api/giftcards";
import DataTableClient from "./DataTableClient";
import { FiPlus } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function CryptoRatesPage() {
  const res = await getAllCryptoPairRates();

  if (!res || res.error) {
    return <ResultState type="error" message="Unable to fetch crypto rates." />;
  }

  const payload = res.data as any[] | undefined;

  if (!payload) {
    return (
      <ResultState
        type="error"
        message="Invalid server response. Please try again later."
      />
    );
  }

  if (payload.length === 0) {
    return (
      <>
        <PageHeader />
        <ResultState type="empty" message="No crypto rates found." />
      </>
    );
  }

  return (
    <>
      <PageHeader
        buttonIcon={<FiPlus size={16} />}
        buttonText="Add new crypto rate"
        modalTypeToOpen="add-crypto-rate"
      />
      <DataTableClient initialData={payload} />
    </>
  );
}
