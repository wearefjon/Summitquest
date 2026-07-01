"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/useAuth";
import { dashboardApi } from "@/lib/api";
import { 
  Mountain, 
  LayoutDashboard, 
  Calendar, 
  LogOut, 
  User,
  ArrowRight,
  Clock,
  CheckCircle2,
  Receipt
} from "lucide-react";

export default function CustomerBookingsPage() {
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
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
          <p className="text-sm font-medium text-slate-500 animate-pulse">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const allBookings = [...(data?.upcoming_bookings || []), ...(data?.past_bookings || [])];

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status.toLowerCase()) {
      case 'confirmed': return <CheckCircle2 size={14} className="mr-1" />;
      case 'pending': return <Clock size={14} className="mr-1" />;
      default: return null;
    }
  };

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
          <Link href="/customer" className="flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 rounded-xl font-medium transition-all group">
            <LayoutDashboard size={20} className="group-hover:scale-110 transition-transform" />
            <span>Dashboard</span>
          </Link>
          <Link href="/customer/bookings" className="flex items-center gap-3 px-4 py-3.5 bg-emerald-50 text-emerald-700 rounded-xl font-semibold transition-all shadow-sm ring-1 ring-emerald-500/20 group">
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
        <header className="mb-10 mt-4 md:mt-0 flex flex-col gap-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            My <span className="text-emerald-600">Bookings</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium">View and manage your upcoming and past adventures.</p>
        </header>

        {/* Bookings List */}
        <section className="mb-16">
          {allBookings.length === 0 ? (
             <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 border-dashed shadow-sm">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Receipt size={32} className="text-slate-400" />
               </div>
               <h4 className="text-xl font-bold text-slate-700 mb-2">You have no bookings yet</h4>
               <p className="text-slate-500 mb-6 max-w-md mx-auto">It's time to pack your bags. Discover the beautiful mountains and rivers of Maharashtra.</p>
               <Link href="/adventures" className="inline-flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 font-bold px-6 py-3 rounded-xl hover:bg-emerald-100 transition-colors">
                 Find your next trek
                 <ArrowRight size={18} />
               </Link>
             </div>
          ) : (
            <div className="space-y-6">
              {allBookings.map((booking: any) => (
                <article key={booking.id} className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col md:flex-row group hover:shadow-md hover:border-slate-300 transition-all duration-300 relative">
                  
                  {/* Status Ribbon */}
                  <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl text-xs font-bold uppercase tracking-wider flex items-center shadow-sm border-l border-b ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    {booking.status}
                  </div>

                  <div className="p-6 md:p-8 w-full flex flex-col justify-between">
                    <div>
                      <div className="mb-6">
                        <p className="text-xs font-bold text-slate-400 mb-1 tracking-wider uppercase flex items-center gap-1.5">
                          <User size={14} /> {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                        </p>
                        <h3 className="text-2xl font-extrabold text-slate-800 pr-24">Booking #{booking.id.slice(0, 8)}</h3>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 bg-slate-50 rounded-2xl p-4 md:p-5 border border-slate-100">
                        <div>
                          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <Calendar size={14} /> Date
                          </div>
                          <div className="font-bold text-slate-700">{new Date(booking.booking_date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <Receipt size={14} /> Total Paid
                          </div>
                          <div className="font-bold text-emerald-600 text-lg">₹{booking.total_price.toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mt-8">
                      {booking.status === 'pending' && (
                         <button className="bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 transition-all active:scale-95">
                           Confirm Booking
                         </button>
                      )}
                      <Link href={`/adventures/${booking.adventure_id}`} className="bg-white text-slate-700 border-2 border-slate-200 font-bold px-6 py-2.5 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95">
                          View Adventure Details
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
