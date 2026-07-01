"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAdventures, Adventure } from "@/lib/api";

export default function AdventuresExplorePage() {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [activityType, setActivityType] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchAdventures();
        
        let filtered = data;
        if (difficulty) {
          filtered = filtered.filter(a => a.difficulty.toLowerCase() === difficulty.toLowerCase());
        }
        if (activityType) {
          filtered = filtered.filter(a => a.activity_type?.toLowerCase() === activityType.toLowerCase());
        }
        setAdventures(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [difficulty]);

  return (
    <main className="flex-grow pt-[104px] pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 mt-8">
        <div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-2">Discover Adventures in Maharashtra</h1>
          <p className="font-body-lg text-on-surface-variant">Showing {adventures.length} curated experiences matching your criteria.</p>
        </div>
        <button className="flex items-center gap-2 bg-surface-off-white border border-outline-variant text-primary px-6 py-3 rounded-2xl hover:bg-surface-container transition-colors shadow-sm self-start md:self-auto group">
          <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors">map</span>
          <span className="font-label-md text-label-md">Map View</span>
        </button>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-gutter items-start">
        
        {/* Sidebar Filter */}
        <aside className="lg:col-span-1 bg-surface-off-white rounded-[24px] p-6 ambient-shadow sticky top-[120px] max-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar hidden md:block border border-outline-variant/30">
          <div className="flex items-center justify-between mb-8 border-b border-outline-variant/30 pb-4">
            <h2 className="font-headline-sm text-headline-sm text-primary">Filters</h2>
            <button onClick={() => { setDifficulty(null); setActivityType(null); }} className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors">Reset</button>
          </div>
          
          {/* Activity Type Filter */}
          <div className="mb-8 border-b border-outline-variant/30 pb-8">
            <h3 className="font-label-md text-label-md text-primary mb-4">Activity Type</h3>
            <div className="flex flex-wrap gap-2">
              {['Trekking', 'Camping', 'Sightseeing', 'Ocean Diving', 'Paragliding', 'Water Sports', 'Hiking'].map(activity => (
                <button 
                  key={activity}
                  onClick={() => setActivityType(activity === activityType ? null : activity)}
                  className={`px-4 py-2 rounded-full font-label-sm text-label-sm border transition-colors ${
                    activityType === activity 
                      ? "bg-secondary-container text-on-secondary-container border-transparent" 
                      : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="mb-8">
            <h3 className="font-label-md text-label-md text-primary mb-4">Difficulty Level</h3>
            <div className="flex flex-wrap gap-2">
              {['Easy', 'Moderate', 'Hard', 'Extreme'].map(level => (
                <button 
                  key={level}
                  onClick={() => setDifficulty(level === difficulty ? null : level)}
                  className={`px-4 py-2 rounded-full font-label-sm text-label-sm border transition-colors ${
                    difficulty === level 
                      ? "bg-secondary-container text-on-secondary-container border-transparent" 
                      : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-primary text-white font-label-md text-label-md py-4 rounded-2xl hover:bg-secondary transition-colors mt-4">
            Apply Filters
          </button>
        </aside>

        {/* Cards Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center py-20 text-on-surface-variant">Loading adventures...</div>
          ) : adventures.length === 0 ? (
            <div className="flex justify-center py-20 text-on-surface-variant">No adventures found matching your criteria.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
              {adventures.map(adventure => (
                <Link href={`/adventures/${adventure.slug}`} key={adventure.id} className="bg-surface-off-white rounded-[24px] overflow-hidden border border-outline-variant/30 ambient-shadow ambient-shadow-hover transition-all duration-300 transform hover:scale-[1.02] flex flex-col group cursor-pointer">
                  <div className="relative h-64 w-full overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={adventure.image_url} alt={adventure.title} />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1 hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[16px] text-outline hover:text-brand-coral transition-colors">favorite</span>
                    </div>
                    <div className={`absolute top-4 left-4 text-white backdrop-blur-sm px-3 py-1 rounded-full text-label-sm font-label-sm shadow-sm ${
                      adventure.difficulty.toLowerCase() === 'hard' ? 'bg-tertiary-container/90' :
                      adventure.difficulty.toLowerCase() === 'moderate' ? 'bg-accent-gold/90 text-tertiary' :
                      'bg-secondary-container/90 text-on-secondary-container'
                    }`}>
                      {adventure.difficulty}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-headline-sm text-headline-sm text-primary leading-tight line-clamp-1">{adventure.title}</h3>
                    </div>
                    <p className="font-body-md text-on-surface-variant mb-6 flex-grow line-clamp-2">{adventure.description}</p>
                    <div className="flex items-center justify-between border-t border-outline-variant/30 pt-4">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-outline">Starting from</span>
                        <span className="font-headline-sm text-headline-sm text-primary">₹{adventure.price.toLocaleString('en-IN')}</span>
                      </div>
                      <span className="material-symbols-outlined text-secondary transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
