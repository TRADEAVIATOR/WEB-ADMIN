import { useState, useEffect, useCallback } from "react";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { CryptoRate, GiftCardRate } from "@/types/rates";
import { db } from "@/lib/api/config/firebase";

export function useCryptoRates() {
  const [rates, setRates] = useState<CryptoRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "cryptoRates"),
      (snap) => {
        const data = snap.docs.map(
          (d) => ({ id: d.id, ...d.data() }) as CryptoRate,
        );
        setRates(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    return () => unsub();
  }, []);

  const upsertRate = useCallback(
    async (id: string, data: Omit<CryptoRate, "id">) => {
      await setDoc(doc(db, "cryptoRates", id), data, { merge: true });
    },
    [],
  );

  const deleteRate = useCallback(async (id: string) => {
    await deleteDoc(doc(db, "cryptoRates", id));
  }, []);

  return { rates, loading, error, upsertRate, deleteRate };
}

export function useGiftCardRates() {
  const [rates, setRates] = useState<GiftCardRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "giftCardRates"),
      (snap) => {
        const data = snap.docs.map(
          (d) => ({ id: d.id, ...d.data() }) as GiftCardRate,
        );
        setRates(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    return () => unsub();
  }, []);

  const upsertRate = useCallback(
    async (id: string, data: Omit<GiftCardRate, "id">) => {
      await setDoc(doc(db, "giftCardRates", id), data, { merge: true });
    },
    [],
  );

  const deleteRate = useCallback(async (id: string) => {
    await deleteDoc(doc(db, "giftCardRates", id));
  }, []);

  return { rates, loading, error, upsertRate, deleteRate };
}
