"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mountain } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-primary shadow-md py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Mountain className="h-6 w-6 text-white" />
          <span className="font-headline-md text-headline-sm md:text-headline-md font-bold text-white">
            SummitQuest
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-gutter">
          <Link href="/destinations" className="text-white/90 font-label-md text-label-md hover:text-white transition-colors">
            Destinations
          </Link>
          <Link href="/activities" className="text-white/90 font-label-md text-label-md hover:text-white transition-colors">
            Activities
          </Link>
          <Link href="/stays" className="text-white/90 font-label-md text-label-md hover:text-white transition-colors">
            Stays & Basecamps
          </Link>
          <Link href="/operators" className="text-white/90 font-label-md text-label-md hover:text-white transition-colors">
            Expert Custodians
          </Link>
          <Link href="/safety" className="text-white/90 font-label-md text-label-md hover:text-white transition-colors">
            Safety
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block font-label-md text-label-md text-white/90 hover:text-white transition-colors scale-95 active:scale-90 transition-transform">
            Login
          </Link>
          <Link href="/register" className={`px-6 py-2 rounded-xl font-label-md text-label-md transition-colors scale-95 active:scale-90 transition-transform ${
            scrolled ? "bg-white text-primary hover:bg-surface-off-white" : "bg-white/20 backdrop-blur-md text-white hover:bg-white/30"
          }`}>
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
