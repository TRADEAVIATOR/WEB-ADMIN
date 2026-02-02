"use client";

import Image from "next/image";
import Link from "next/link";
import { sidebarLinks, sidebarBottomLinks } from "@/constants/sidebarLinks";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { useState, useRef, useEffect } from "react";
import Logo from "@/assets/logo.svg";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const { openModal } = useModal();
  const navRef = useRef<HTMLElement | null>(null);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  const renderLink = (
    link: (typeof sidebarLinks)[0],
    isChild = false,
    index: number,
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
        <Link
          key={index}
          href={link.href}
          className={classes}
          data-active={isActive ? "true" : undefined}>
          {isChild ? (
            <span
              className={`w-2 h-2 rounded-full ${
                isActive ? "bg-primary" : "bg-gray-400"
              }`}
            />
          ) : (
            <Image
              src={link.icon}
              alt={link.label}
              width={18}
              height={18}
              className="object-contain flex-shrink-0"
            />
          )}
          <span className="truncate">{link.label}</span>
        </Link>
      );
    }

    return (
      <button
        key={index}
        className={classes}
        onClick={() => openModal("logout")}>
        {isChild ? (
          <span
            className={`w-2 h-2 rounded-full ${
              isActive ? "bg-primary" : "bg-gray-400"
            }`}
          />
        ) : (
          <Image
            src={link.icon}
            alt={link.label}
            width={18}
            height={18}
            className="object-contain flex-shrink-0"
          />
        )}
        <span className="truncate">{link.label}</span>
      </button>
    );
  };

  useEffect(() => {
    if (!navRef.current) return;
    const activeEl = navRef.current.querySelector<HTMLElement>(
      "[data-active='true']",
    );
    if (activeEl)
      activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [pathname, openMenus]);

  const superAdminOnly = [
    "/dashboard/promocodes",
    "/dashboard/voucher",
    "/dashboard/admins",
  ];

  const filteredLinks = sidebarLinks
    .map((link) => {
      if (link.children) {
        const children = link.children.filter(
          (child) =>
            !superAdminOnly.includes(child.href || "") || role === "superAdmin",
        );
        if (children.length > 0) return { ...link, children };
        return null;
      }
      if (superAdminOnly.includes(link.href || "") && role !== "superAdmin")
        return null;
      return link;
    })
    .filter(Boolean) as typeof sidebarLinks;

  return (
    <aside className="fixed md:static z-40 h-screen bg-white border-r border-gray-200 flex flex-col justify-between w-64">
      <div className="flex flex-col h-full overflow-hidden">
        <div className="px-6 py-6 flex items-center justify-center flex-shrink-0">
          <Image
            src={Logo}
            alt="Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        <div className="flex-1 min-h-0">
          <nav
            ref={navRef}
            className="h-full overflow-y-auto px-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent py-4 space-y-2">
            {filteredLinks.map((link, index) => {
              if (link.children) {
                const isOpenMenu = openMenus.includes(link.label);
                const isAnyChildActive = link.children.some(
                  (c) =>
                    pathname === c.href ||
                    (c.href && pathname.startsWith(c.href)),
                );
                return (
                  <div key={index} className="px-6">
                    <button
                      onClick={() => toggleMenu(link.label)}
                      className={`flex items-center justify-between w-full py-3.5 text-sm font-medium rounded-md transition-colors ${
                        isOpenMenu || isAnyChildActive
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}>
                      <div className="flex items-center gap-3">
                        <Image
                          src={link.icon}
                          alt={link.label}
                          width={18}
                          height={18}
                          className="object-contain flex-shrink-0"
                        />
                        <span className="truncate">{link.label}</span>
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
                          renderLink(child, true, idx),
                        )}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <div key={index} className="px-6">
                  {renderLink(link, false, index)}
                </div>
              );
            })}
            <div className="h-20" />
          </nav>
        </div>

        <div className="pb-6 mt-4 pt-4 border-t border-gray-100 flex-shrink-0 px-6">
          {sidebarBottomLinks.map((link, index) => (
            <div key={index}>{renderLink(link, false, index)}</div>
          ))}
        </div>
      </div>
    </aside>
  );
}
