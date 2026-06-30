"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/useAuth";
import { dashboardApi } from "@/lib/api";

export default function CustomerDashboard() {
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
    if (user.role === "operator") {
      router.push("/operator");
      return;
    }

    async function load() {
      try {
        const dashboardData = await dashboardApi.getCustomerDashboard();
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

  const tripsTaken = data?.past_bookings?.length || 0;
  const upcomingCount = data?.upcoming_bookings?.length || 0;

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
          <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-lg">
            {user.full_name?.charAt(0) || "U"}
          </div>
          <div>
            <div className="font-label-md text-label-md font-bold text-on-surface">{user.full_name}</div>
            <div className="font-label-sm text-label-sm text-on-surface-variant">Traveller</div>
          </div>
        </div>
        
        <div className="flex flex-col gap-1 flex-1">
          <Link href="/customer" className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold font-label-md text-label-md translate-x-1 duration-200">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            Dashboard
          </Link>
          <Link href="/customer/bookings" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl transition-all font-label-md text-label-md">
            <span className="material-symbols-outlined">calendar_today</span>
            Bookings
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
      <main className="flex-1 md:ml-64 w-full min-h-screen p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto pb-24">
        
        {/* Header Section */}
        <header className="mb-12 md:mb-16 mt-8 md:mt-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary mb-2">Welcome back, {user.full_name?.split(" ")[0]}!</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Ready for your next adventure?</p>
          </div>
          <Link href="/adventures" className="bg-primary text-on-primary px-6 py-3 rounded-[16px] font-label-md text-label-md hover:bg-secondary transition-colors ambient-shadow flex items-center gap-2 max-w-fit">
            <span className="material-symbols-outlined">search</span>
            Explore Destinations
          </Link>
        </header>

        {/* Quick Stats Bento Grid */}
        <section className="mb-16">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-6">Quick Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="bg-surface-container-lowest rounded-[24px] p-6 ambient-shadow border border-outline-variant/30 flex items-center gap-6 transform hover:scale-[1.02] transition-transform">
              <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined text-[28px]">hiking</span>
              </div>
              <div>
                <div className="font-display-lg text-display-lg text-primary mb-1">{tripsTaken}</div>
                <div className="font-label-md text-label-md text-on-surface-variant">Past Trips</div>
              </div>
            </div>
            
            <div className="bg-surface-container-lowest rounded-[24px] p-6 ambient-shadow border border-outline-variant/30 flex items-center gap-6 transform hover:scale-[1.02] transition-transform">
              <div className="w-14 h-14 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                <span className="material-symbols-outlined text-[28px]">map</span>
              </div>
              <div>
                <div className="font-display-lg text-display-lg text-primary mb-1">{upcomingCount}</div>
                <div className="font-label-md text-label-md text-on-surface-variant">Upcoming Trips</div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Bookings */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Upcoming Bookings</h3>
          </div>
          
          {data?.upcoming_bookings?.length === 0 ? (
             <div className="bg-surface-container-lowest rounded-[24px] p-8 text-center border border-outline-variant/30">
               <p className="text-on-surface-variant mb-4">You have no upcoming adventures.</p>
               <Link href="/adventures" className="text-secondary font-bold hover:underline">Find your next trek</Link>
             </div>
          ) : (
            <div className="space-y-6">
              {data?.upcoming_bookings?.map((booking: any) => (
                <div key={booking.id} className="bg-surface-container-lowest rounded-[24px] overflow-hidden ambient-shadow border border-outline-variant/30 flex flex-col md:flex-row group hover:shadow-xl transition-shadow">
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-headline-sm text-headline-sm text-primary">Booking #{booking.id.slice(0, 8)}</h4>
                        <span className="px-3 py-1 bg-secondary-fixed-dim/30 text-on-secondary-fixed rounded-full font-label-sm text-label-sm uppercase tracking-wider">{booking.status}</span>
                      </div>
                      
                      <div className="flex gap-6 mb-6 mt-6">
                        <div>
                          <div className="font-label-sm text-label-sm text-outline mb-1">Date</div>
                          <div className="font-label-md text-label-md text-on-surface">{new Date(booking.booking_date).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="font-label-sm text-label-sm text-outline mb-1">Guests</div>
                          <div className="font-label-md text-label-md text-on-surface">{booking.guests}</div>
                        </div>
                        <div>
                          <div className="font-label-sm text-label-sm text-outline mb-1">Total Paid</div>
                          <div className="font-label-md text-label-md text-on-surface">₹{booking.total_price.toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
