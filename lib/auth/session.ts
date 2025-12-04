import { getServerSession } from "next-auth/next";
import { authOptions } from "./options";

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return null;

    return session;
  } catch (error) {
    console.error(error);
    return null;
  }
};
