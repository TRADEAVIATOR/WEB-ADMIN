"use client";

import Image from "next/image";
import Link from "next/link";
import { sidebarLinks, sidebarBottomLinks } from "@/constants/sidebarLinks";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const { openModal } = useModal();

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const renderLink = (
    link: (typeof sidebarLinks)[0],
    isChild = false,
    index: number
  ) => {
    const isActive =
      pathname === link.href ||
      (link.href &&
        link.href !== "/dashboard" &&
        pathname.startsWith(link.href));

    const classes = `${
      isChild
        ? `flex items-center gap-3 py-2 text-sm font-medium transition-colors ${
            isActive ? "text-primary" : "text-gray-600 hover:text-gray-800"
          }`
        : `flex items-center gap-3 px-6 py-3.5 text-sm font-medium rounded-md transition-colors ${
            isActive
              ? "bg-primary/10 text-primary"
              : "text-gray-700 hover:bg-gray-50"
          }`
    }`;

    if (link.href) {
      return (
        <Link key={index} href={link.href} className={classes}>
          <Image
            src={link.icon}
            alt={link.label}
            width={isChild ? 16 : 18}
            height={isChild ? 16 : 18}
            className="object-contain"
          />
          {link.label}
        </Link>
      );
    }

    return (
      <button
        key={index}
        className={classes}
        onClick={() => openModal("logout")}>
        <Image
          src={link.icon}
          alt={link.label}
          width={isChild ? 16 : 18}
          height={isChild ? 16 : 18}
          className="object-contain"
        />
        {link.label}
      </button>
    );
  };

  return (
    <aside
      className="
        fixed md:static z-40 
        h-full md:h-auto 
        bg-white border-r border-gray-200 
        flex flex-col justify-between 
        transition-all duration-300
      ">
      <div className="flex flex-col h-full overflow-hidden">
        <div className="px-6 py-6 flex items-center justify-center flex-shrink-0">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent px-0">
          <nav className="space-y-2 mt-2 pb-6">
            {sidebarLinks.map((link, index) => {
              if (link.children) {
                const isOpenMenu = openMenus.includes(link.label);
                return (
                  <div key={index}>
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
                        {link.children.map((child, idx) =>
                          renderLink(child, true, idx)
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              return renderLink(link, false, index);
            })}
          </nav>
        </div>

        <div className="pb-8 space-y-2 mt-4 pt-4 border-t border-gray-100 flex-shrink-0 px-0">
          {sidebarBottomLinks.map((link, index) =>
            renderLink(link, false, index)
          )}
        </div>
      </div>
    </aside>
  );
}
