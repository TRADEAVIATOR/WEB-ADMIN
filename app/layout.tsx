import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/shared/AuthProvider";
import { ModalProvider } from "@/context/ModalContext";
import ReactQueryProvider from "./providers/ReactQueryProvider";
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
        <ReactQueryProvider>
          <AuthProvider>
            <ModalProvider>
              {children}
              <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            </ModalProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
