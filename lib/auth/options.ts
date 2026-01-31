import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { adminLogin } from "../api/auth";
import { refreshAccessToken } from "./refresh-token";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await adminLogin(credentials.email, credentials.password);
          const admin = res?.data?.admin;
          const accessToken = res?.data?.accessToken;
          const refreshToken = res?.data?.refreshToken;

          if (!admin || !accessToken || !refreshToken) {
            return null;
          }

          return {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: "admin",
            accessToken,
            refreshToken,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          email: user.email ?? null,
          name: user.name ?? null,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 55 * 60 * 1000,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      try {
        const refreshedTokens = await refreshAccessToken(token.refreshToken);

        return {
          ...token,
          accessToken: refreshedTokens.accessToken,
          refreshToken: refreshedTokens.refreshToken,
          accessTokenExpires: refreshedTokens.accessTokenExpires,
        };
      } catch (error) {
        console.error("Error refreshing access token:", error);

        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email ?? null;
      session.user.name = token.name ?? null;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.error = token.error;

      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/",
    error: "/",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
