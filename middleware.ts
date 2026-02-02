import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const superAdminPaths = [
      "/dashboard/promocodes",
      "/dashboard/voucher",
      "/dashboard/admins",
    ];

    const isSuperAdminPath = superAdminPaths.some((path) =>
      req.nextUrl.pathname.startsWith(path),
    );

    if (isSuperAdminPath && token.role !== "superAdmin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
