import type { Metadata } from "next";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Company Admin Dashboard built with Next.js and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        <div className="flex min-h-screen relative">
          <div className="hidden md:block fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-40">
            <Sidebar />
          </div>

          <main className="flex-1 flex flex-col w-full md:ml-64 transition-all duration-300 overflow-hidden">
            <Topbar />
            <div className="flex-1 p-4 sm:p-6 md:p-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
