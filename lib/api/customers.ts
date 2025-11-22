import { tryServer } from "@/lib/utils/tryServer";
import { api } from "@/lib/axios";

export const getCustomers = async () => {
  return tryServer(api.get("/customers").then((r) => r.data));
};
