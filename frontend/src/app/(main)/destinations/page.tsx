import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { FEATURED_DESTINATIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Explore adventure destinations across Maharashtra.",
};

export default function DestinationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold">Destinations</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        From Sahyadri peaks to Konkan coastlines — find adventures by region.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_DESTINATIONS.map((dest) => (
          <Link
            key={dest.slug}
            href={`/destinations/${dest.slug}`}
            className="group rounded-2xl border border-border bg-card p-6 transition hover:border-primary/30 hover:shadow-md"
          >
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="mt-3 text-lg font-semibold group-hover:text-primary">{dest.name}</h2>
            <p className="text-sm text-muted-foreground">{dest.region}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
