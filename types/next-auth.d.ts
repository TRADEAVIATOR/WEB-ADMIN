import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      email?: string | null;
      name?: string | null;
    } & DefaultSession["user"];
    accessToken: string;
    refreshToken: string;
  }

  interface User extends DefaultUser {
    role: string;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    email?: string | null;
    name?: string | null;
    accessToken: string;
    refreshToken: string;
  }
}
