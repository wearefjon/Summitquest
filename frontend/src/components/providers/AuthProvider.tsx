"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/store/useAuth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialize = useAuth((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
}
