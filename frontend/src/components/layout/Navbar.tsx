import Link from "next/link";
import { Mountain } from "lucide-react";

export function Navbar() {
  return (
    <header className="bg-surface-container-lowest/80 dark:bg-primary/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 shadow-sm fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
      <Link href="/" className="flex items-center gap-2">
        <Mountain className="h-6 w-6 text-primary dark:text-inverse-primary" />
        <span className="font-headline-md text-headline-sm md:text-headline-md font-bold text-primary dark:text-inverse-primary">
          SummitQuest
        </span>
      </Link>
      
      <nav className="hidden md:flex items-center gap-gutter">
        <Link href="/destinations" className="text-on-surface-variant dark:text-surface-variant font-label-md text-label-md hover:text-primary dark:hover:text-primary-fixed transition-colors">
          Destinations
        </Link>
        <Link href="/activities" className="text-on-surface-variant dark:text-surface-variant font-label-md text-label-md hover:text-primary dark:hover:text-primary-fixed transition-colors">
          Activities
        </Link>
        <Link href="/stays" className="text-on-surface-variant dark:text-surface-variant font-label-md text-label-md hover:text-primary dark:hover:text-primary-fixed transition-colors">
          Stays & Basecamps
        </Link>
        <Link href="/operators" className="text-on-surface-variant dark:text-surface-variant font-label-md text-label-md hover:text-primary dark:hover:text-primary-fixed transition-colors">
          Expert Custodians
        </Link>
        <Link href="/safety" className="text-on-surface-variant dark:text-surface-variant font-label-md text-label-md hover:text-primary dark:hover:text-primary-fixed transition-colors">
          Safety
        </Link>
      </nav>
      
      <div className="flex items-center gap-4">
        <Link href="/login" className="hidden md:block font-label-md text-label-md text-primary dark:text-on-primary hover:text-secondary transition-colors scale-95 active:scale-90 transition-transform">
          Login
        </Link>
        <Link href="/register" className="bg-primary text-on-primary px-6 py-2 rounded-xl font-label-md text-label-md hover:bg-secondary transition-colors scale-95 active:scale-90 transition-transform">
          Register
        </Link>
      </div>
    </header>
  );
}
