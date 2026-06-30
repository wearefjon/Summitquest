"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/useAuth";
import { dashboardApi } from "@/lib/api";

export default function OperatorDashboard() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "operator") {
      router.push("/customer");
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
  }, [user, authLoading, router]);

  if (authLoading || loading || !user) {
    return <div className="flex min-h-screen items-center justify-center">Loading dashboard...</div>;
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const analytics = data?.analytics || { total_revenue: 0, active_bookings: 0, total_adventures: 0 };
  const recentBookings = data?.recent_bookings || [];

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
          <div className="w-10 h-10 rounded-full bg-brand-coral text-white flex items-center justify-center font-bold text-lg">
            {user.full_name?.charAt(0) || "O"}
          </div>
          <div>
            <div className="font-label-md text-label-md font-bold text-on-surface">{user.full_name}</div>
            <div className="font-label-sm text-label-sm text-on-surface-variant">Operator</div>
          </div>
        </div>
        
        <div className="flex flex-col gap-1 flex-1">
          <Link href="/operator" className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold font-label-md text-label-md translate-x-1 duration-200">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            Dashboard
          </Link>
          <Link href="/operator/tours" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl transition-all font-label-md text-label-md">
            <span className="material-symbols-outlined">map</span>
            My Tours
          </Link>
          <Link href="/operator/bookings" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl transition-all font-label-md text-label-md">
            <span className="material-symbols-outlined">calendar_today</span>
            Bookings
          </Link>
          <Link href="/operator/earnings" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl transition-all font-label-md text-label-md">
            <span className="material-symbols-outlined">payments</span>
            Earnings
          </Link>
        </div>
        
        <div className="border-t border-outline-variant/30 pt-4 flex flex-col gap-1">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl transition-all font-label-md text-label-md w-full text-left">
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 w-full min-h-screen p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto pb-32">
        
        {/* Page Header */}
        <header className="mb-8 mt-4 md:mt-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display-lg-mobile md:font-display-lg text-primary mb-2">Morning, {user.full_name?.split(" ")[0]}!</h2>
            <p className="font-body-lg text-on-surface-variant">Here's what's happening with your tours today.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-secondary text-white rounded-[16px] font-label-md text-label-md hover:bg-primary transition-colors flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">add</span> New Tour
            </button>
          </div>
        </header>

        {/* Key Metrics Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-8">
          {/* Active Bookings Stat */}
          <div className="bg-white rounded-[24px] p-6 ambient-shadow border border-outline-variant/20 flex-1 hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2 text-on-surface-variant">
              <span className="material-symbols-outlined bg-tertiary-fixed text-on-tertiary-fixed p-2 rounded-full" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
              <span className="font-label-md text-label-md uppercase tracking-wider">Active Bookings</span>
            </div>
            <div className="font-headline-md text-headline-md text-primary mt-2">{analytics.active_bookings}</div>
            <div className="font-label-sm text-label-sm text-secondary mt-1 flex items-center gap-1">
              Currently confirmed
            </div>
          </div>
          
          {/* Revenue Stat */}
          <div className="bg-white rounded-[24px] p-6 ambient-shadow border border-outline-variant/20 flex-1 hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2 text-on-surface-variant">
              <span className="material-symbols-outlined bg-secondary-container text-on-secondary-container p-2 rounded-full" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
              <span className="font-label-md text-label-md uppercase tracking-wider">Total Revenue</span>
            </div>
            <div className="font-headline-md text-headline-md text-primary mt-2">₹{analytics.total_revenue.toLocaleString('en-IN')}</div>
            <div className="font-label-sm text-label-sm text-secondary mt-1 flex items-center gap-1">
              All time earnings
            </div>
          </div>

          {/* Adventures Stat */}
          <div className="bg-white rounded-[24px] p-6 ambient-shadow border border-outline-variant/20 flex-1 hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2 text-on-surface-variant">
              <span className="material-symbols-outlined bg-surface-variant text-on-surface-variant p-2 rounded-full" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
              <span className="font-label-md text-label-md uppercase tracking-wider">Total Adventures</span>
            </div>
            <div className="font-headline-md text-headline-md text-primary mt-2">{analytics.total_adventures}</div>
            <div className="font-label-sm text-label-sm text-secondary mt-1 flex items-center gap-1">
              Published on platform
            </div>
          </div>
        </div>

        {/* Active Bookings Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mt-8">
          <div className="lg:col-span-3 bg-white rounded-[24px] p-6 ambient-shadow border border-outline-variant/20 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-sm text-headline-sm text-primary">Recent Bookings</h3>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/30">
                    <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium">Booking ID</th>
                    <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium">Adventure ID</th>
                    <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium">Date</th>
                    <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium">Guests</th>
                    <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium">Status</th>
                    <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="font-body-md text-primary">
                  {recentBookings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-on-surface-variant">No recent bookings found.</td>
                    </tr>
                  ) : (
                    recentBookings.map((booking: any) => (
                      <tr key={booking.id} className="border-b border-outline-variant/10 hover:bg-surface-off-white transition-colors">
                        <td className="py-4">
                          <div className="font-semibold">#{booking.id.slice(0, 8)}</div>
                        </td>
                        <td className="py-4 text-on-surface-variant">{booking.adventure_id.slice(0, 8)}</td>
                        <td className="py-4">{new Date(booking.booking_date).toLocaleDateString()}</td>
                        <td className="py-4">{booking.guests} Guests</td>
                        <td className="py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm ${
                            booking.status === 'confirmed' ? 'bg-secondary-container text-on-secondary-container' : 
                            booking.status === 'pending' ? 'bg-tertiary-fixed text-tertiary-container' :
                            'bg-surface-variant text-on-surface-variant'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-4 text-right font-medium">₹{booking.total_price.toLocaleString('en-IN')}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
