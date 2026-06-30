"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/store/useAuth";

export default function DashboardMobileNav() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const isOperator = user.role === "operator";
  const isAdmin = user.role === "admin";

  const customerLinks = [
    { href: "/customer", icon: "dashboard", label: "Dashboard" },
    { href: "/customer/bookings", icon: "calendar_today", label: "Bookings" },
    { href: "/", icon: "home", label: "Home" }
  ];

  const operatorLinks = [
    { href: "/operator", icon: "dashboard", label: "Dashboard" },
    { href: "/operator/tours", icon: "map", label: "Tours" },
    { href: "/operator/bookings", icon: "calendar_today", label: "Bookings" },
    { href: "/operator/earnings", icon: "payments", label: "Earnings" }
  ];

  const adminLinks = [
    { href: "/admin", icon: "monitoring", label: "Metrics" },
    { href: "/admin/users", icon: "group", label: "Users" },
    { href: "/admin/operators", icon: "storefront", label: "Verify" },
    { href: "/admin/adventures", icon: "map", label: "Moderation" }
  ];

  const links = isAdmin ? adminLinks : isOperator ? operatorLinks : customerLinks;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-low border-t border-outline-variant/30 flex justify-around items-center p-3 z-50 ambient-shadow">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center gap-1 min-w-[64px] ${isActive ? "text-primary" : "text-on-surface-variant"}`}
          >
            <div className={`px-4 py-1 rounded-full ${isActive ? "bg-secondary-container text-on-secondary-container" : ""}`}>
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                {link.icon}
              </span>
            </div>
            <span className={`text-[10px] font-medium ${isActive ? "font-bold text-on-surface" : ""}`}>
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
