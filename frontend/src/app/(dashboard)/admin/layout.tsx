"use client";

import { useAuth } from "@/lib/store/useAuth";
import { notFound } from "next/navigation";
import Link from "next/link";
import DashboardMobileNav from "@/components/layout/DashboardMobileNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();

  // Show nothing while loading to prevent flash of 404
  if (authLoading) return null;

  // Security: Return 404 instead of 401/403 to obfuscate admin panel existence from scanners
  if (!user || user.role !== "admin") {
    notFound();
  }

  return (
    <div className="bg-background text-on-background font-body-md text-body-md flex min-h-screen">
      {/* SideNavBar */}
      <nav className="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-surface shadow-md bg-surface-container-low flex-col p-4 gap-2 z-50 border-r border-outline-variant/20">
        <div className="mb-8 px-4 mt-4">
          <Link href="/">
            <h1 className="font-headline-sm text-headline-sm font-bold text-primary">SummitQuest</h1>
          </Link>
        </div>
        <div className="flex items-center gap-4 px-4 py-3 mb-6 bg-surface-container rounded-xl">
          <div className="w-10 h-10 rounded-full bg-error text-on-error flex items-center justify-center font-bold text-lg">
            {user.full_name?.charAt(0) || "A"}
          </div>
          <div>
            <div className="font-label-md text-label-md font-bold text-on-surface">{user.full_name}</div>
            <div className="font-label-sm text-label-sm text-on-surface-variant">Admin</div>
          </div>
        </div>
        
        <div className="flex flex-col gap-1 flex-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface rounded-xl transition-all font-label-md text-label-md">
            <span className="material-symbols-outlined">monitoring</span>
            Platform Metrics
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface rounded-xl transition-all font-label-md text-label-md">
            <span className="material-symbols-outlined">group</span>
            User Directory
          </Link>
          <Link href="/admin/operators" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface rounded-xl transition-all font-label-md text-label-md">
            <span className="material-symbols-outlined">storefront</span>
            Verification
          </Link>
          <Link href="/admin/adventures" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface rounded-xl transition-all font-label-md text-label-md">
            <span className="material-symbols-outlined">map</span>
            Content Moderation
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 w-full min-h-screen p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto pb-32">
        {children}
      </main>

      <DashboardMobileNav />
    </div>
  );
}
