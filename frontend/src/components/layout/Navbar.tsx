"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mountain } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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

  if (pathname?.startsWith('/customer') || pathname?.startsWith('/operator') || pathname?.startsWith('/login') || pathname?.startsWith('/register')) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none px-4 md:px-8">
      <header 
        className={`pointer-events-auto w-full max-w-6xl rounded-b-3xl transition-all duration-500 ease-out border-b border-x ${
          scrolled 
            ? "bg-primary/95 backdrop-blur-md shadow-2xl border-white/10 py-3 px-6 md:px-8" 
            : "bg-black/30 backdrop-blur-md shadow-lg border-white/20 py-4 px-6 md:px-10 mt-0"
        }`}
      >
        <div className="flex justify-between items-center w-full">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition-colors">
              <Mountain className="h-5 w-5 text-white" />
            </div>
            <span className="font-headline-md text-headline-sm md:text-headline-md font-bold text-white tracking-tight">
              SummitQuest
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/destinations" className="text-white/80 font-label-md hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all after:duration-300">
              Destinations
            </Link>
            <Link href="/activities" className="text-white/80 font-label-md hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all after:duration-300">
              Activities
            </Link>
            <Link href="/stays" className="text-white/80 font-label-md hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all after:duration-300">
              Stays
            </Link>
            <Link href="/operators" className="text-white/80 font-label-md hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all after:duration-300">
              Experts
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden md:flex font-label-md text-white/90 hover:text-white px-4 py-2 hover:bg-white/10 rounded-full transition-colors">
              Login
            </Link>
            <Link href="/register" className={`px-5 py-2 rounded-full font-label-md transition-all shadow-sm hover:shadow-md ${
              scrolled ? "bg-white text-primary hover:bg-surface-off-white hover:scale-105" : "bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 hover:scale-105"
            }`}>
              Register
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
