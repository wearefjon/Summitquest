"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/store/useAuth";

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");
  const { user } = useAuth();
  const [countdown, setCountdown] = useState({ days: 14, hours: 8, mins: 45 });

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative h-[614px] min-h-[500px] w-full flex items-end justify-center pb-16 px-margin-mobile md:px-margin-desktop overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center w-full h-full z-0" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1c2e]/90 to-transparent z-10"></div>
        <div className="relative z-20 text-center text-white max-w-container-max w-full">
          <div className="inline-flex items-center gap-2 bg-[#FFBF69]/20 backdrop-blur-md border border-[#FFBF69]/30 px-4 py-2 rounded-full mb-6">
            <span className="material-symbols-outlined text-[#FFBF69]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            <span className="font-label-md text-label-md text-[#FFBF69] uppercase tracking-widest">Booking Confirmed</span>
          </div>
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg mb-4 text-balance shadow-sm">You're going to the Sahyadris!</h1>
          <p className="font-body-lg text-body-lg text-white/90 max-w-2xl mx-auto">Your spot is secured for the ultimate adventure. Get ready to conquer.</p>
        </div>
      </section>

      {/* Main Content Layout (Bento Grid Style) */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 -mt-24 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          
          {/* Left Column: Countdown & Actions */}
          <div className="lg:col-span-8 space-y-gutter">
            
            {/* Countdown Card */}
            <div className="bg-white/85 backdrop-blur-md rounded-xl shadow-lg border border-black/5 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-primary mb-2">The Adventure Begins In</h2>
                <p className="text-on-surface-variant font-body-md">Soon • 06:00 AM IST</p>
              </div>
              <div className="flex gap-4 text-center">
                <div className="bg-surface-container-low rounded-lg p-4 min-w-[80px]">
                  <span className="block font-headline-md text-headline-md text-secondary">{countdown.days}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Days</span>
                </div>
                <div className="bg-surface-container-low rounded-lg p-4 min-w-[80px]">
                  <span className="block font-headline-md text-headline-md text-secondary">{countdown.hours < 10 ? `0${countdown.hours}` : countdown.hours}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Hours</span>
                </div>
                <div className="bg-surface-container-low rounded-lg p-4 min-w-[80px]">
                  <span className="block font-headline-md text-headline-md text-secondary">{countdown.mins}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Mins</span>
                </div>
              </div>
            </div>

            {/* Next Steps Bento Box */}
            <div className="bg-surface-off-white rounded-xl shadow-sm border border-black/5 p-8">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>list_alt</span>
                Your Pre-Trek Checklist
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Gear Checklist */}
                <div className="bg-surface rounded-lg p-6 border border-black/5">
                  <h4 className="font-label-md text-label-md text-primary mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">backpack</span> Mandatory Gear
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <input className="mt-1 rounded text-secondary focus:ring-secondary/50 border-outline-variant" type="checkbox" />
                      <span className="text-on-surface-variant">Sturdy Trekking Shoes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input className="mt-1 rounded text-secondary focus:ring-secondary/50 border-outline-variant" type="checkbox" />
                      <span className="text-on-surface-variant">3L Hydration Pack</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input className="mt-1 rounded text-secondary focus:ring-secondary/50 border-outline-variant" type="checkbox" />
                      <span className="text-on-surface-variant">Rain Poncho</span>
                    </li>
                  </ul>
                </div>
                
                {/* Document Status */}
                <div className="bg-surface rounded-lg p-6 border border-black/5 flex flex-col justify-between">
                  <div>
                    <h4 className="font-label-md text-label-md text-primary mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined">description</span> Required Documents
                    </h4>
                    <div className="flex items-center gap-4 p-3 bg-error-container/20 rounded-md border border-error-container mb-4">
                      <span className="material-symbols-outlined text-error">error</span>
                      <div>
                        <p className="font-label-md text-label-md text-on-surface">Liability Waiver</p>
                        <p className="font-label-sm text-label-sm text-error">Pending Upload</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-surface-container border border-primary-container text-primary-container font-label-md text-label-md py-3 rounded-lg hover:bg-primary-container hover:text-white transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">upload_file</span> Upload Waiver
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Details & Actions */}
          <div className="lg:col-span-4 space-y-gutter">
            
            {/* Booking Summary */}
            <div className="bg-surface-off-white rounded-xl shadow-sm border border-black/5 p-6">
              <div className="flex justify-between items-start mb-6 pb-6 border-b border-black/5">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Booking ID</p>
                  <p className="font-label-md text-label-md text-primary truncate max-w-[150px]" title={bookingId || "N/A"}>#{bookingId?.slice(0, 8) || "SQ-MH-8892"}</p>
                </div>
                <img className="w-16 h-16 rounded-md object-cover border border-outline-variant/30" alt="QR Code" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" />
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-outline">group</span>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Participants</p>
                    <p className="font-label-md text-label-md text-on-surface">Booked</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-outline">location_on</span>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Meeting Point</p>
                    <p className="font-label-md text-label-md text-on-surface">Base Camp</p>
                  </div>
                </div>
              </div>
              
              {/* Primary Actions */}
              <div className="space-y-3">
                <Link href={user?.role === "operator" ? "/operator/dashboard" : "/customer/dashboard"} className="w-full bg-[#FFBF69] text-[#3b2000] font-label-md text-label-md py-4 rounded-xl hover:bg-[#ffb042] transition-colors flex items-center justify-center gap-2 font-bold shadow-sm">
                  <span className="material-symbols-outlined">dashboard</span> View Dashboard
                </Link>
                <Link href="/adventures" className="w-full bg-transparent border-[1.5px] border-secondary text-secondary font-label-md text-label-md py-4 rounded-xl hover:bg-secondary/5 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">explore</span> Explore More
                </Link>
              </div>
            </div>

            {/* Guide Profile Mini */}
            <div className="bg-surface-off-white rounded-xl shadow-sm border border-black/5 p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-secondary text-white flex items-center justify-center text-xl font-bold">
                SQ
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Your Expedition Lead</p>
                <p className="font-label-md text-label-md text-primary">SummitQuest Team</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
