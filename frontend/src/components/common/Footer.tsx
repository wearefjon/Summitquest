import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold">{APP_NAME}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Discover and book verified adventure experiences across Maharashtra.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Explore</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/adventures" className="hover:text-foreground">All Adventures</Link></li>
              <li><Link href="/destinations" className="hover:text-foreground">Destinations</Link></li>
              <li><Link href="/adventures?category=trekking" className="hover:text-foreground">Trekking</Link></li>
              <li><Link href="/adventures?category=rafting" className="hover:text-foreground">Rafting</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
              <li><Link href="/operators" className="hover:text-foreground">Become an Operator</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Legal</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/cancellation" className="hover:text-foreground">Cancellation Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {APP_NAME} Maharashtra. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
