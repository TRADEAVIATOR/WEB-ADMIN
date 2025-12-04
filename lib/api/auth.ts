import { tryServer } from "../utils/tryServer";
import { api } from "../axios";

export const adminLogin = async (email: string, password: string) => {
  return tryServer(
    api.post("/admin/auth/login", { email, password }).then((r) => r.data)
  );
};
