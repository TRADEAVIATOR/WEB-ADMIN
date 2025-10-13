"use client";

import Image from "next/image";
import { sidebarLinks, sidebarBottomLinks } from "@/constants/sidebarLinks";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const findCurrentPage = (path: string) => {
    for (const link of sidebarLinks) {
      if (link.href === path) return link.label;
      if (link.children) {
        for (const child of link.children) {
          if (child.href === path) return child.label;
        }
      }
    }
    return "Dashboard";
  };

  const currentPage = findCurrentPage(pathname);

  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-md hover:bg-gray-100 md:hidden">
          <Menu size={22} className="text-gray-700" />
        </button>

        <h1 className="text-xl font-semibold text-secondary">{currentPage}</h1>
      </div>

      <div className="flex items-center gap-5">
        <button>
          <Image
            src="/icons/topbar-settings.svg"
            alt="Settings"
            width={22}
            height={22}
            className="object-contain"
          />
        </button>

        <button className="flex items-center gap-2">
          <Image
            src="/icons/avatar.svg"
            alt="Profile"
            width={32}
            height={32}
            className="object-contain rounded-full"
          />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white border-t border-gray-200 shadow-md flex flex-col p-4 space-y-3 md:hidden animate-slide-down">
          {sidebarLinks.map((link, index) => (
            <div key={link.href || link.label || index}>
              <Link
                href={link.href || "#"}
                className="text-gray-700 text-sm font-medium hover:text-primary transition block"
                onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>

              {link.children && (
                <div className="pl-4 mt-1 space-y-1">
                  {link.children.map((child, childIndex) => (
                    <Link
                      key={child.href || child.label || childIndex}
                      href={child.href || "#"}
                      className="text-gray-600 text-sm font-normal hover:text-primary transition block"
                      onClick={() => setMenuOpen(false)}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <hr className="my-2" />

          {sidebarBottomLinks.map((link, index) => (
            <Link
              key={link.href || link.label || index}
              href={link.href || "#"}
              className="text-red-600 text-sm font-medium hover:text-red-700 transition block"
              onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
