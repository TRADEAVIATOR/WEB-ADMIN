import ResultState from "@/components/ui/ResultState";
import DataTableClient from "./DataTableClient";
import { FiPlus } from "react-icons/fi";
import PageHeader from "@/components/ui/PageHeader";
import { getAllCryptoPairRates, getNgnRate } from "@/lib/api/crypto";
import NgnDisplay from "../../components/NgnDisplay";

export const dynamic = "force-dynamic";

export default async function CryptoRatesPage() {
  const [cryptoRes, ngnRes] = await Promise.allSettled([
    getAllCryptoPairRates(),
    getNgnRate(),
  ]);

  const cryptoData =
    cryptoRes.status === "fulfilled" &&
    cryptoRes.value &&
    !cryptoRes.value.error
      ? cryptoRes.value.data
      : null;

  const ngnRate =
    ngnRes.status === "fulfilled" &&
    ngnRes.value &&
    !ngnRes.value.error &&
    typeof ngnRes.value.data === "number"
      ? ngnRes.value.data
      : null;

  let content;

  if (!cryptoData) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch crypto rates."
        showRefresh
      />
    );
  } else if (cryptoData.length === 0) {
    content = <ResultState type="empty" message="No crypto rates found." />;
  } else {
    content = <DataTableClient initialData={cryptoData} />;
  }

  return (
    <>
      <PageHeader
        title="Crypto Rates"
        description="Manage and add new cryptocurrency rates"
        buttonIcon={<FiPlus size={16} />}
        buttonText="Add new crypto rate"
        modalTypeToOpen="add-crypto-rate"
      />

      <div className="mb-3 flex justify-end">
        <NgnDisplay rate={ngnRate!} />
      </div>

      {content}
    </>
  );
}
