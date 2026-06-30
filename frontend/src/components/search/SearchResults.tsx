"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAdventures } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { Map, Heart, Search } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function SearchResults() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { data: adventures, isLoading, error } = useQuery({
    queryKey: ["adventures", "search", debouncedQuery],
    queryFn: () => fetchAdventures(debouncedQuery ? { q: debouncedQuery } : {}),
  });

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
      <div className="mb-12 max-w-2xl mx-auto text-center">
        <h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-6">Search Adventures</h1>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for treks, camping, or locations..."
            className="w-full pl-12 pr-4 py-4 rounded-full bg-surface-off-white border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
        </div>
        {debouncedQuery && (
          <p className="mt-4 font-body-md text-on-surface-variant">
            Showing results for <span className="font-bold text-primary">"{debouncedQuery}"</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse bg-surface-variant rounded-24px h-80" />
          ))
        ) : error ? (
          <div className="col-span-full bg-error-container text-on-error-container p-6 rounded-xl">Failed to load search results.</div>
        ) : adventures?.length === 0 ? (
          <div className="col-span-full bg-surface-off-white border border-outline-variant/30 text-on-surface-variant p-12 rounded-24px text-center">
            <h3 className="font-headline-sm mb-2 text-primary">No matching adventures</h3>
            <p className="font-body-md">We couldn't find any adventures matching your search terms.</p>
          </div>
        ) : (
          adventures?.map((adv) => (
            <Link href={`/adventures/${adv.slug}`} key={adv.id} className="bg-surface-off-white rounded-24px overflow-hidden border border-outline-variant/30 ambient-shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col group cursor-pointer">
              <div className="relative h-56 w-full overflow-hidden">
                <img src={adv.image_url} alt={adv.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm flex items-center justify-center">
                  <Heart className="w-4 h-4 text-brand-coral" />
                </div>
                <div className="absolute top-4 left-4 bg-tertiary-container/90 text-white backdrop-blur-sm px-3 py-1 rounded-full text-label-sm shadow-sm">
                  {adv.difficulty}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-headline-sm text-primary leading-tight mb-2">{adv.title}</h3>
                <p className="font-body-md text-on-surface-variant mb-6 flex-grow line-clamp-2">{adv.short_description}</p>
                <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-center mt-auto">
                  <div className="font-label-sm text-on-surface-variant">₹{adv.price} <span className="font-normal opacity-70">/ person</span></div>
                  <div className="font-label-sm text-primary flex items-center gap-1">
                    {adv.duration_days} Day{adv.duration_days > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
