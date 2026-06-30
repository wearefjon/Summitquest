"use client";

import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await adminApi.getStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load admin stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]">Loading Platform Metrics...</div>;
  if (!stats) return <div className="text-error p-4">Failed to load platform metrics.</div>;

  return (
    <div>
      <header className="mb-12 mt-8 md:mt-0">
        <h2 className="font-headline-md text-headline-md text-primary mb-2">Platform Metrics</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">System-wide performance overview.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-8">
        <div className="bg-surface-container-lowest rounded-[24px] p-6 ambient-shadow border border-outline-variant/30 flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
            <span className="material-symbols-outlined text-[28px]">group</span>
          </div>
          <div>
            <div className="font-display-md text-display-md text-primary mb-1">{stats.total_users}</div>
            <div className="font-label-md text-label-md text-on-surface-variant">Total Users</div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-[24px] p-6 ambient-shadow border border-outline-variant/30 flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
            <span className="material-symbols-outlined text-[28px]">storefront</span>
          </div>
          <div>
            <div className="font-display-md text-display-md text-primary mb-1">{stats.total_operators}</div>
            <div className="font-label-md text-label-md text-on-surface-variant">Operators</div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-[24px] p-6 ambient-shadow border border-outline-variant/30 flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined text-[28px]">confirmation_number</span>
          </div>
          <div>
            <div className="font-display-md text-display-md text-primary mb-1">{stats.total_active_bookings}</div>
            <div className="font-label-md text-label-md text-on-surface-variant">Confirmed Bookings</div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-[24px] p-6 ambient-shadow border border-outline-variant/30 flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-success-container flex items-center justify-center text-on-success-container">
            <span className="material-symbols-outlined text-[28px]">account_balance</span>
          </div>
          <div>
            <div className="font-display-md text-display-md text-primary mb-1">₹{stats.total_revenue.toLocaleString('en-IN')}</div>
            <div className="font-label-md text-label-md text-on-surface-variant">Total Revenue</div>
          </div>
        </div>
      </div>
    </div>
  );
}
