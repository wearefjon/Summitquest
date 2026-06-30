"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  variant?: "hero" | "compact";
}

export function SearchBar({ className, variant = "hero" }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (destination) params.set("destination", destination);
    if (date) params.set("date", date);
    router.push(`/adventures?${params.toString()}`);
  }

  const isHero = variant === "hero";

  return (
    <form
      onSubmit={handleSearch}
      className={cn(
        "flex w-full flex-col gap-2 rounded-2xl bg-background p-2 shadow-lg ring-1 ring-border/50 sm:flex-row sm:items-center",
        isHero && "sm:gap-0 sm:rounded-full sm:p-1.5",
        className,
      )}
    >
      <div className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2 sm:rounded-full">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search adventures..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {isHero && (
        <>
          <div className="hidden h-8 w-px bg-border sm:block" />
          <div className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2 sm:rounded-full">
            <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="hidden h-8 w-px bg-border sm:block" />
          <div className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2 sm:rounded-full">
            <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-sm outline-none text-muted-foreground"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className={cn(
          "rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:rounded-full",
          isHero && "sm:px-8",
        )}
      >
        Search
      </button>
    </form>
  );
}
