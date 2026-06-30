"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAdventures } from "@/lib/api";
import { Map, Heart } from "lucide-react";
import Link from "next/link";

export function AdventuresExplore() {
  const [filters, setFilters] = useState({
    activity_type: "",
    difficulty: "",
    duration: ""
  });

  // Derived state to API params
  const apiParams = {
    activity_type: filters.activity_type,
    difficulty: filters.difficulty,
    min_duration: filters.duration === "Single Day" ? "1" : filters.duration === "Weekend" ? "2" : filters.duration === "Extended" ? "3" : "",
    max_duration: filters.duration === "Single Day" ? "1" : filters.duration === "Weekend" ? "2" : ""
  };

  const { data: adventures, isLoading, error } = useQuery({
    queryKey: ["adventures", apiParams],
    queryFn: () => fetchAdventures(apiParams as any),
  });

  const handleDifficulty = (level: string) => {
    setFilters(prev => ({ ...prev, difficulty: prev.difficulty === level ? "" : level }));
  };

  const handleActivity = (type: string) => {
    setFilters(prev => ({ ...prev, activity_type: prev.activity_type === type ? "" : type }));
  };

  const handleDuration = (dur: string) => {
    setFilters(prev => ({ ...prev, duration: prev.duration === dur ? "" : dur }));
  };

  const clearFilters = () => setFilters({ activity_type: "", difficulty: "", duration: "" });

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 mt-8">
        <div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-2">Discover Adventures in Maharashtra</h1>
          <p className="font-body-lg text-on-surface-variant">Showing curated experiences matching your criteria.</p>
        </div>
        <button className="flex items-center gap-2 bg-surface-off-white border border-outline-variant text-primary px-6 py-3 rounded-2xl hover:bg-surface-container transition-colors shadow-sm self-start md:self-auto group">
          <Map className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
          <span className="font-label-md text-label-md">Map View</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-gutter items-start">
        {/* Sidebar Filter */}
        <aside className="lg:col-span-1 bg-surface-off-white rounded-24px p-6 ambient-shadow sticky top-[120px] max-h-[calc(100vh-140px)] overflow-y-auto hidden md:block">
          <div className="flex items-center justify-between mb-8 border-b border-outline-variant/30 pb-4">
            <h2 className="font-headline-sm text-primary">Filters</h2>
            <button onClick={clearFilters} className="font-label-sm text-secondary hover:text-primary transition-colors">Reset</button>
          </div>

          <div className="mb-8">
            <h3 className="font-label-md text-primary mb-4">Activity Type</h3>
            <div className="flex flex-col gap-3">
              {['Trekking', 'Camping', 'Water Sports', 'Rock Climbing'].map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={filters.activity_type === type}
                    onChange={() => handleActivity(type)}
                    className="form-checkbox text-primary rounded focus:ring-primary h-5 w-5 border-outline" 
                  />
                  <span className="font-body-md text-on-surface-variant group-hover:text-primary transition-colors">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-label-md text-primary mb-4">Difficulty Level</h3>
            <div className="flex flex-wrap gap-2">
              {['Easy', 'Moderate', 'Hard', 'Extreme'].map((diff) => (
                <button 
                  key={diff}
                  onClick={() => handleDifficulty(diff)}
                  className={`px-4 py-2 rounded-full font-label-sm text-label-sm transition-colors border ${
                    filters.difficulty === diff 
                      ? 'bg-secondary-container text-on-secondary-container border-transparent' 
                      : 'border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-label-md text-primary mb-4">Duration</h3>
            <div className="flex flex-col gap-3">
              {['Single Day', 'Weekend', 'Extended'].map((dur) => (
                <label key={dur} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="duration"
                    checked={filters.duration === dur}
                    onChange={() => handleDuration(dur)}
                    className="form-radio text-primary focus:ring-primary h-5 w-5 border-outline" 
                  />
                  <span className="font-body-md text-on-surface-variant group-hover:text-primary transition-colors">{dur}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Adventures Grid */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse bg-surface-variant rounded-24px h-80" />
              ))}
            </div>
          ) : error ? (
            <div className="bg-error-container text-on-error-container p-6 rounded-xl">Failed to load adventures.</div>
          ) : adventures?.length === 0 ? (
            <div className="bg-surface-off-white border border-outline-variant/30 text-on-surface-variant p-12 rounded-24px text-center">
              <h3 className="font-headline-sm mb-2 text-primary">No adventures found</h3>
              <p className="font-body-md mb-6">Try adjusting your filters to find what you're looking for.</p>
              <button onClick={clearFilters} className="bg-primary text-white px-6 py-2 rounded-full font-label-md">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
              {adventures?.map((adv) => (
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
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
