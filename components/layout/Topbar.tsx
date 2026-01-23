"use client";

import Image from "next/image";
import Link from "next/link";
import { sidebarLinks, sidebarBottomLinks } from "@/constants/sidebarLinks";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import NotificationsPanel from "./NotificationsPanel";
import { useState, useEffect } from "react";
import notificationIcon from "@/assets/icons/notification.svg";
import avatarIcon from "@/assets/icons/avatar.svg";
import { getUnreadNotificationsCount } from "@/lib/api/notifications";
import { handleApiError } from "@/lib/utils/errorHandler";

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const pathname = usePathname();
  const { openModal } = useModal();

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

  useEffect(() => {
    let mounted = true;
    const fetchUnreadCount = async () => {
      try {
        const count = await getUnreadNotificationsCount();
        if (mounted) setUnreadCount(count);
      } catch (error) {
        handleApiError(error);
        if (mounted) setUnreadCount(0);
      }
    };

    fetchUnreadCount();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setShowNotifications(false);
  }, [pathname]);

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
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative flex items-center gap-2">
          <Image
            src={notificationIcon}
            alt="Notifications"
            width={24}
            height={24}
            className="object-contain cursor-pointer hover:opacity-80 transition"
            priority
          />

          {unreadCount > 0 && (
            <span
              className="
                absolute -top-1 -right-1
                flex items-center justify-center
                w-4 h-4 text-[10px] font-semibold
                rounded-full
                bg-primary text-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>

        <button className="flex items-center gap-2">
          <Link href={"/dashboard/profile"}>
            <Image
              src={avatarIcon}
              alt="Profile"
              width={32}
              height={32}
              className="object-contain cursor-pointer hover:opacity-80 transition"
              priority
            />
          </Link>
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white border-t border-gray-200 shadow-md flex flex-col p-4 space-y-3 md:hidden animate-slide-down">
          {sidebarLinks.map((link, index) => (
            <div key={index}>
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
                      key={childIndex}
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
              key={index}
              href={link.href || "#"}
              className="text-red-600 text-sm font-medium hover:text-red-700 transition block"
              onClick={() => openModal("logout")}>
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {showNotifications && (
        <NotificationsPanel onClose={() => setShowNotifications(false)} />
      )}
    </header>
  );
}
