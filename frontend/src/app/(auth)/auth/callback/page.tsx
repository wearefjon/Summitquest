"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleCallback() {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (!session) {
          throw new Error("No session found. Please try logging in again.");
        }

        // Get the redirect path from URL params if present
        const searchParams = new URLSearchParams(window.location.search);
        const next = searchParams.get('redirect');
        if (next) {
          router.push(next);
          return;
        }

        // Default routing logic based on role
        const role = session.user?.user_metadata?.role;
        if (role === 'operator') {
          router.push('/operator');
        } else {
          router.push('/customer');
        }
      } catch (err: any) {
        console.error("Callback error:", err);
        setError(err.message || "An error occurred during authentication.");
        setTimeout(() => router.push('/login'), 3000);
      }
    }

    handleCallback();
  }, [router]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
          <h2 className="text-xl font-bold text-red-700">Authentication Error</h2>
          <p className="mt-2 text-sm text-red-600">{error}</p>
          <p className="mt-4 text-xs text-red-500">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm text-muted-foreground animate-pulse">Completing sign in...</p>
      </div>
    </div>
  );
}
