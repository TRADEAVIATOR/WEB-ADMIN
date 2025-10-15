import { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Admin Login | Dashboard",
  description: "Login to the admin dashboard to manage your application",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
