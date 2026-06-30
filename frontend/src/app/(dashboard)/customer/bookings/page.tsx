"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/useAuth";
import { dashboardApi } from "@/lib/api";

export default function CustomerBookingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role === "operator") {
      router.push("/login");
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
  }, [user, router]);

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center">Loading bookings...</div>;
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const allBookings = [...(data?.upcoming_bookings || []), ...(data?.past_bookings || [])];

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
          <Link href="/customer" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl transition-all font-label-md text-label-md">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>
          <Link href="/customer/bookings" className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold font-label-md text-label-md translate-x-1 duration-200">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
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
            <h2 className="font-headline-md text-headline-md text-primary mb-2">My Bookings</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">View and manage your upcoming and past adventures.</p>
          </div>
        </header>

        {/* Bookings List */}
        <section className="mb-16">
          {allBookings.length === 0 ? (
             <div className="bg-surface-container-lowest rounded-[24px] p-8 text-center border border-outline-variant/30">
               <p className="text-on-surface-variant mb-4">You have no bookings yet.</p>
               <Link href="/adventures" className="text-secondary font-bold hover:underline">Find your next trek</Link>
             </div>
          ) : (
            <div className="space-y-6">
              {allBookings.map((booking: any) => (
                <article key={booking.id} className="lg:col-span-12 bg-surface-off-white rounded-[24px] premium-shadow border border-outline-variant/20 overflow-hidden flex flex-col md:flex-row card-hover transition-all duration-300 mt-4">
                  <div className="p-6 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">{booking.guests} Guests</p>
                          <h3 className="font-headline-sm text-[20px] text-primary">Booking #{booking.id.slice(0, 8)}</h3>
                        </div>
                        <span className="bg-surface-variant text-on-surface-variant px-3 py-1 rounded-full font-label-sm text-label-sm border border-outline-variant/20">
                          {booking.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-on-surface-variant font-body-md text-body-md mb-4 mt-4">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                          {new Date(booking.booking_date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[18px]">payments</span>
                          ₹{booking.total_price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-4">
                      {booking.status === 'pending' && (
                         <button className="bg-primary text-on-primary font-label-md text-label-md px-5 py-2.5 rounded-[16px] hover:bg-secondary transition-colors">
                           Confirm Booking
                         </button>
                      )}
                      <Link href={`/adventures/${booking.adventure_id}`} className="bg-transparent text-secondary border-[1.5px] border-secondary font-label-md text-label-md px-5 py-2.5 rounded-[16px] hover:bg-secondary/5 transition-colors">
                          View Details
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
