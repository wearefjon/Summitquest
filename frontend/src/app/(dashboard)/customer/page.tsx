"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/useAuth";
import { dashboardApi } from "@/lib/api";
import { useRecentlyViewed } from "@/lib/hooks/useRecentlyViewed";
import { 
  Mountain, 
  LayoutDashboard, 
  Calendar, 
  LogOut, 
  Map, 
  Tent, 
  ChevronRight, 
  User,
  Compass,
  ArrowRight
} from "lucide-react";

export default function CustomerDashboard() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { recentAdventures } = useRecentlyViewed();

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
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
          <p className="text-sm font-medium text-slate-500 animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const tripsTaken = data?.past_bookings?.length || 0;
  const upcomingCount = data?.upcoming_bookings?.length || 0;

  return (
    <div className="bg-slate-50/50 flex min-h-screen font-sans selection:bg-emerald-500/30">
      
      {/* SideNavBar */}
      <nav className="hidden md:flex h-screen w-[280px] fixed left-0 top-0 bg-white/80 backdrop-blur-xl flex-col p-6 gap-2 z-50 border-r border-slate-200/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="mb-10 px-2 mt-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-emerald-600 p-2 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-md shadow-emerald-600/20">
              <Mountain className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">SummitQuest</h1>
          </Link>
        </div>
        
        <div className="flex items-center gap-4 p-3 mb-8 bg-slate-50/80 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md hover:bg-white">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 text-white flex items-center justify-center font-bold text-lg shadow-inner ring-2 ring-white">
            {user.full_name?.charAt(0) || <User size={20} />}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="font-bold text-slate-800 truncate">{user.full_name}</div>
            <div className="text-xs font-semibold tracking-wide text-emerald-600 uppercase">Traveller</div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 flex-1">
          <Link href="/customer" className="flex items-center gap-3 px-4 py-3.5 bg-emerald-50 text-emerald-700 rounded-xl font-semibold transition-all shadow-sm ring-1 ring-emerald-500/20 group">
            <LayoutDashboard size={20} className="group-hover:scale-110 transition-transform" />
            <span>Dashboard</span>
          </Link>
          <Link href="/customer/bookings" className="flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 rounded-xl font-medium transition-all group">
            <Calendar size={20} className="group-hover:scale-110 transition-transform" />
            <span>Bookings</span>
          </Link>
        </div>
        
        <div className="border-t border-slate-200/60 pt-4 flex flex-col gap-2">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50/80 rounded-xl font-medium transition-all w-full text-left group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[280px] w-full min-h-screen p-6 md:p-10 lg:p-12 max-w-[1400px] mx-auto pb-24">
        
        {/* Header Section */}
        <header className="mb-12 mt-4 md:mt-0 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              Welcome back, <span className="text-emerald-600">{user.full_name?.split(" ")[0]}!</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium">Ready for your next great adventure?</p>
          </div>
          <Link href="/adventures" className="group bg-slate-900 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 transition-all flex items-center justify-center gap-2 max-w-fit">
            <Compass size={18} className="group-hover:rotate-45 transition-transform duration-500" />
            Explore Destinations
          </Link>
        </header>

        {/* Quick Stats Bento Grid */}
        <section className="mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Upcoming Trips Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60 flex items-center gap-6 group hover:shadow-md hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 z-0"></div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 shadow-inner flex items-center justify-center text-white z-10 rotate-3 group-hover:rotate-6 transition-transform">
                <Tent size={28} />
              </div>
              <div className="z-10">
                <div className="text-4xl font-extrabold text-slate-800 mb-1 tracking-tight">{upcomingCount}</div>
                <div className="text-sm font-semibold tracking-wide text-slate-500 uppercase">Upcoming Trips</div>
              </div>
            </div>

            {/* Past Trips Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60 flex items-center gap-6 group hover:shadow-md hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 z-0"></div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 shadow-inner flex items-center justify-center text-white -rotate-3 group-hover:-rotate-6 transition-transform">
                <Map size={28} />
              </div>
              <div className="z-10">
                <div className="text-4xl font-extrabold text-slate-800 mb-1 tracking-tight">{tripsTaken}</div>
                <div className="text-sm font-semibold tracking-wide text-slate-500 uppercase">Past Adventures</div>
              </div>
            </div>

          </div>
        </section>

        {/* Upcoming Bookings */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              Upcoming Bookings
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                {upcomingCount}
              </span>
            </h3>
          </div>
          
          {data?.upcoming_bookings?.length === 0 ? (
             <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 border-dashed shadow-sm">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Calendar size={32} className="text-slate-400" />
               </div>
               <h4 className="text-xl font-bold text-slate-700 mb-2">No upcoming adventures</h4>
               <p className="text-slate-500 mb-6 max-w-md mx-auto">Your calendar is looking a bit empty. Why not book your next escape into nature?</p>
               <Link href="/adventures" className="inline-flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 font-bold px-6 py-3 rounded-xl hover:bg-emerald-100 transition-colors">
                 Find your next trek
                 <ArrowRight size={18} />
               </Link>
             </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {data?.upcoming_bookings?.map((booking: any) => (
                <div key={booking.id} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/60 group hover:shadow-lg hover:border-slate-300 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6">
                    <span className="px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                      {booking.status}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-slate-800 mb-6 pr-24">Booking #{booking.id.slice(0, 8)}</h4>
                  
                  <div className="grid grid-cols-3 gap-4 md:gap-6 bg-slate-50 rounded-2xl p-4 md:p-5 border border-slate-100">
                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Calendar size={14} /> Date
                      </div>
                      <div className="font-bold text-slate-700">{new Date(booking.booking_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <User size={14} /> Guests
                      </div>
                      <div className="font-bold text-slate-700">{booking.guests} {booking.guests === 1 ? 'Person' : 'People'}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Total</div>
                      <div className="font-bold text-emerald-600">₹{booking.total_price.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recently Viewed */}
        {recentAdventures.length > 0 && (
          <section className="mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center justify-between">
              Recently Viewed
              <Link href="/adventures" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                View all <ChevronRight size={16} />
              </Link>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentAdventures.map((adv) => (
                <Link href={`/adventures/${adv.slug}`} key={adv.id} className="block group">
                  <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-200/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                      <div className="bg-cover bg-center absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-out" style={{ backgroundImage: `url('${adv.image_url}')` }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-xs font-bold mb-2">
                          {adv.activity_type || "Trekking"}
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-bold text-lg text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-1 mb-2">{adv.title}</h4>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-500">From</p>
                        <p className="text-lg font-extrabold text-slate-800">₹{adv.price.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
