"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/useAuth";
import { dashboardApi } from "@/lib/api";

export default function OperatorBookingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "operator") {
      router.push("/login");
      return;
    }

    async function load() {
      try {
        const dashboardData = await dashboardApi.getOperatorDashboard();
        setData(dashboardData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user, router]);

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center">Loading bookings...</div>;
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const recentBookings = data?.recent_bookings || [];

  return (
    <div className="bg-background text-on-background font-body-md text-body-md flex min-h-screen">
      {/* SideNavBar */}
      <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface shadow-md p-4 gap-2 z-40 border-r border-outline-variant/30">
        <div className="mb-8 px-4 mt-4">
          <Link href="/">
            <h1 className="font-headline-sm text-headline-sm font-bold text-primary">SummitQuest</h1>
          </Link>
        </div>
        <div className="flex items-center gap-4 px-4 py-3 mb-6 bg-surface-container rounded-xl">
          <div className="w-10 h-10 rounded-full bg-brand-coral text-white flex items-center justify-center font-bold text-lg">
            {user.full_name?.charAt(0) || "O"}
          </div>
          <div>
            <div className="font-label-md text-label-md font-bold text-on-surface">{user.full_name}</div>
            <div className="font-label-sm text-label-sm text-on-surface-variant">Operator</div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col gap-1">
          <Link href="/operator" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-variant/50 transition-all font-label-md text-label-md">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>
          <Link href="/operator/bookings" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary-container text-on-secondary-container font-bold font-label-md text-label-md translate-x-1 duration-200">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
            Bookings
          </Link>
          <Link href="/operator/earnings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-variant/50 transition-all font-label-md text-label-md">
            <span className="material-symbols-outlined">payments</span>
            Earnings
          </Link>
        </div>
        
        <div className="border-t border-outline-variant/30 pt-4 flex flex-col gap-1">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-variant/50 transition-all font-label-md text-label-md w-full text-left">
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 w-full min-h-screen p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto pb-24">
        
        {/* Header Section */}
        <header className="mb-12 md:mb-16 mt-8 md:mt-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary mb-2">Bookings</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Manage bookings for your adventures.</p>
          </div>
          <Link href="/operator/tours/new" className="px-6 py-3 rounded-2xl bg-primary text-white font-label-md text-label-md font-bold hover:bg-on-primary-fixed-variant transition-colors ambient-shadow flex items-center gap-2">
            <span className="material-symbols-outlined">add</span>
            Create Adventure
          </Link>
        </header>

        {/* Bookings List */}
        <section className="mb-16">
          {recentBookings.length === 0 ? (
             <div className="bg-surface-container-lowest rounded-[24px] p-8 text-center border border-outline-variant/30">
               <p className="text-on-surface-variant">No bookings found for your adventures.</p>
             </div>
          ) : (
            <div className="bg-surface-off-white rounded-[24px] premium-shadow p-6 overflow-x-auto border border-outline-variant/30">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-outline-variant/30">
                    <th className="text-left font-label-sm text-label-sm text-outline pb-4 font-normal">Booking ID</th>
                    <th className="text-left font-label-sm text-label-sm text-outline pb-4 font-normal">Adventure</th>
                    <th className="text-left font-label-sm text-label-sm text-outline pb-4 font-normal">Date</th>
                    <th className="text-left font-label-sm text-label-sm text-outline pb-4 font-normal">Guests</th>
                    <th className="text-left font-label-sm text-label-sm text-outline pb-4 font-normal">Amount</th>
                    <th className="text-left font-label-sm text-label-sm text-outline pb-4 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b: any) => (
                    <tr key={b.id} className="border-b border-outline-variant/10 hover:bg-surface-variant/20 transition-colors">
                      <td className="py-4 font-body-md text-primary">#{b.id.substring(0, 8)}</td>
                      <td className="py-4 font-body-md text-on-surface-variant">{b.adventure_id.substring(0, 8)}...</td>
                      <td className="py-4 font-body-md text-on-surface-variant">{new Date(b.booking_date).toLocaleDateString()}</td>
                      <td className="py-4 font-body-md text-on-surface-variant">{b.guests}</td>
                      <td className="py-4 font-body-md text-primary font-bold">₹{b.total_price.toLocaleString('en-IN')}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full font-label-sm text-[12px] border ${
                          b.status === 'confirmed' ? 'bg-secondary-container/50 text-on-secondary-container border-secondary/20' :
                          'bg-surface-variant text-on-surface-variant border-outline-variant/30'
                        }`}>
                          {b.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
