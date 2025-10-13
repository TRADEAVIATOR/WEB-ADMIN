"use client";

import Image from "next/image";
import Link from "next/link";
import { sidebarLinks, sidebarBottomLinks } from "@/constants/sidebarLinks";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <>
      <aside
        className={`fixed md:static z-40 h-full md:h-auto bg-white border-r border-gray-200 flex flex-col justify-between transition-all duration-300 overflow-hidden`}>
        <div>
          <div className="px-6 py-6 flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>

          <nav className="space-y-2 mt-6">
            {sidebarLinks.map((link) => {
              const isActive = pathname.startsWith(link.href || "");
              const isOpenMenu = openMenus.includes(link.label);

              if (link.children) {
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => toggleMenu(link.label)}
                      className={`flex items-center justify-between w-full px-6 py-3.5 text-sm font-medium rounded-md transition-colors ${
                        isOpenMenu
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}>
                      <div className="flex items-center gap-3">
                        <Image
                          src={link.icon}
                          alt={link.label}
                          width={18}
                          height={18}
                          className="object-contain"
                        />
                        {link.label}
                      </div>
                      {isOpenMenu ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>

                    {isOpenMenu && (
                      <div className="pl-10 space-y-1.5 mt-1">
                        {link.children.map((child) => {
                          const isChildActive = pathname.startsWith(
                            child.href || ""
                          );
                          return (
                            <Link
                              key={child.href}
                              href={child.href!}
                              className={`flex items-center gap-3 py-2 text-sm font-medium transition-colors ${
                                isChildActive
                                  ? "text-primary"
                                  : "text-gray-600 hover:text-gray-800"
                              }`}>
                              <Image
                                src={child.icon}
                                alt={child.label}
                                width={16}
                                height={16}
                                className="object-contain"
                              />
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={`flex items-center gap-3 px-6 py-3.5 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}>
                  <Image
                    src={link.icon}
                    alt={link.label}
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pb-8 space-y-2 mt-4 pt-4">
          {sidebarBottomLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href!}
              className="flex items-center gap-3 px-6 py-3.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md">
              <Image
                src={link.icon}
                alt={link.label}
                width={18}
                height={18}
                className="object-contain"
              />
              {link.label}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}
