import Link from "next/link";
import { Mountain } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface-off-white dark:bg-primary border-t border-outline-variant w-full py-16 px-margin-mobile md:px-margin-desktop mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter max-w-container-max mx-auto text-primary dark:text-on-primary">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <Mountain className="h-6 w-6 text-primary dark:text-on-primary" />
            <span className="font-headline-sm text-headline-sm font-bold text-primary dark:text-on-primary">
              SummitQuest
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant mb-6">
            Bridging the rugged beauty of Maharashtra’s landscapes with a sophisticated, high-end digital experience.
          </p>
          <div className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant">
            © {new Date().getFullYear()} SummitQuest Maharashtra. Adventure Responsibly.
          </div>
        </div>
        
        <div className="col-span-1">
          <h4 className="font-label-md text-label-md font-bold mb-4">Explore</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/destinations" className="font-label-sm text-label-sm text-on-surface-variant dark:text-surface-variant hover:text-secondary dark:hover:text-primary-fixed transition-colors opacity-80 hover:opacity-100">
                Destinations
              </Link>
            </li>
            <li>
              <Link href="/activities" className="font-label-sm text-label-sm text-on-surface-variant dark:text-surface-variant hover:text-secondary dark:hover:text-primary-fixed transition-colors opacity-80 hover:opacity-100">
                Activities
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="col-span-1">
          <h4 className="font-label-md text-label-md font-bold mb-4">Company</h4>
          <ul className="space-y-3">
            <li>
              <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-surface-variant opacity-50 cursor-not-allowed">
                Partner Program (Coming Soon)
              </span>
            </li>
            <li>
              <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-surface-variant opacity-50 cursor-not-allowed">
                Help Center (Coming Soon)
              </span>
            </li>
          </ul>
        </div>
        
        <div className="col-span-1">
          <h4 className="font-label-md text-label-md font-bold mb-4">Legal</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/safety" className="font-label-sm text-label-sm text-on-surface-variant dark:text-surface-variant hover:text-secondary dark:hover:text-primary-fixed transition-colors opacity-80 hover:opacity-100">
                Safety Protocols
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="font-label-sm text-label-sm text-on-surface-variant dark:text-surface-variant hover:text-secondary dark:hover:text-primary-fixed transition-colors opacity-80 hover:opacity-100">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
