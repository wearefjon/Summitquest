"use client";

import Link from "next/link";
import { useAuth } from "@/lib/store/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PendingApprovalPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.status === "active") {
      router.push("/operator");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="bg-background text-on-background font-body-md text-body-md flex min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center">
        <div className="w-24 h-24 bg-tertiary-container text-on-tertiary-container rounded-full flex items-center justify-center mb-8 mx-auto">
          <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            hourglass_empty
          </span>
        </div>
        
        <h1 className="font-display-md text-primary mb-4">Account Pending Approval</h1>
        
        <p className="font-body-lg text-on-surface-variant mb-8 leading-relaxed">
          Hi {user.full_name}, thank you for joining SummitQuest! Your operator account is currently under review by our administration team. 
        </p>
        
        <div className="bg-surface-container-low border border-outline-variant/30 p-6 rounded-2xl mb-8 w-full text-left">
          <h3 className="font-headline-sm text-primary mb-3">What happens next?</h3>
          <ul className="list-disc list-inside space-y-2 text-on-surface">
            <li>Our team will review your application.</li>
            <li>You will receive an email as soon as you're approved.</li>
            <li>Once approved, you can start listing your tourist centers and adventures!</li>
          </ul>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={handleLogout}
            className="px-6 py-3 border border-outline text-primary rounded-full hover:bg-surface-variant/50 transition-colors font-label-lg"
          >
            Sign Out
          </button>
          <Link href="/">
            <button className="px-6 py-3 bg-primary text-on-primary rounded-full hover:opacity-90 transition-opacity font-label-lg">
              Return to Homepage
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
