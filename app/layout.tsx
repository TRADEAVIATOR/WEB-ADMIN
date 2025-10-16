import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/shared/AuthProvider";
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
      <body>
        <AuthProvider>
          {children}
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        </AuthProvider>
      </body>
    </html>
  );
}
