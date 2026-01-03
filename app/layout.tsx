import { Metadata } from "next";
import AuthProvider from "@/app/providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import { ModalProvider } from "@/context/ModalContext";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Admin Login | Dashboard",
  description: "Login to the admin dashboard to manage your application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <AuthProvider>
            <ModalProvider>
              {children}
              <Toaster />
            </ModalProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
