"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAdventureBySlug } from "@/lib/api";
import { useParams } from "next/navigation";
import { Star, MapPin, Share, Heart, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useRecentlyViewed } from "@/lib/hooks/useRecentlyViewed";

export function AdventureDetails() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: adventure, isLoading, error } = useQuery({
    queryKey: ["adventure", slug],
    queryFn: () => fetchAdventureBySlug(slug),
  });

  const { addViewed } = useRecentlyViewed();

  useEffect(() => {
    if (adventure) {
      addViewed(adventure);
    }
  }, [adventure, addViewed]);

  if (isLoading) {
    return (
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-[160px] pb-12">
        <div className="animate-pulse flex flex-col gap-8">
          <div className="h-12 w-3/4 bg-surface-variant rounded" />
          <div className="h-[400px] w-full bg-surface-variant rounded-3xl" />
          <div className="h-40 w-full bg-surface-variant rounded" />
        </div>
      </div>
    );
  }

  if (error || !adventure) {
    return (
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-[160px] pb-24 text-center">
        <h2 className="font-headline-md text-primary mb-4">Adventure not found</h2>
        <Link href="/adventures" className="text-secondary hover:underline">Return to Explore</Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-[160px] pb-24">
      {/* Header */}
      <div className="mb-6 space-y-4">
        <nav className="flex text-sm text-on-surface-variant font-label-sm items-center space-x-2">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/adventures" className="hover:text-primary transition-colors">Adventures</Link>
          <span>/</span>
          <span className="text-primary font-medium">{adventure.title}</span>
        </nav>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-2">{adventure.title}</h1>
            <div className="flex items-center flex-wrap gap-4 font-label-md text-on-surface-variant">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-brand-coral fill-brand-coral" />
                <span className="text-on-surface font-bold">4.9</span>
                <span>(128 Reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-secondary" />
                <span className="text-secondary font-bold">{adventure.difficulty}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-outline-variant hover:bg-surface-variant/30 transition-colors font-label-md text-primary">
              <Share className="w-4 h-4" /> Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-outline-variant hover:bg-surface-variant/30 transition-colors font-label-md text-primary">
              <Heart className="w-4 h-4" /> Save
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full h-[400px] md:h-[500px] mb-12 rounded-3xl overflow-hidden shadow-sm relative group">
        <img 
          src={adventure.image_url} 
          alt={adventure.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute top-4 left-4 bg-tertiary-container/90 text-white backdrop-blur-sm px-4 py-2 rounded-full font-label-md shadow-sm">
          {adventure.activity_type}
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* About Section */}
          <section>
            <h2 className="font-headline-sm text-primary mb-4">About this Experience</h2>
            <div className="font-body-md text-on-surface-variant space-y-4">
              <p className="text-body-lg font-medium text-on-surface">{adventure.short_description}</p>
              {adventure.description.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        </div>

        {/* Booking Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-surface-off-white rounded-24px p-6 ambient-shadow border border-outline-variant/30 sticky top-32">
            <div className="flex items-end gap-2 mb-6 border-b border-outline-variant/30 pb-6">
              <span className="font-headline-md text-primary">₹{adventure.price}</span>
              <span className="font-body-md text-on-surface-variant mb-1">/ person</span>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-secondary" />
                <div>
                  <div className="font-label-sm text-on-surface-variant uppercase tracking-wider">Duration</div>
                  <div className="font-body-md font-medium">{adventure.duration_days} Day{adventure.duration_days > 1 ? 's' : ''}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <div>
                  <div className="font-label-sm text-on-surface-variant uppercase tracking-wider">Difficulty</div>
                  <div className="font-body-md font-medium">{adventure.difficulty}</div>
                </div>
              </div>
            </div>

            <Link href={`/checkout/${adventure.id}`} className="w-full block text-center bg-primary text-white py-4 rounded-2xl font-label-md text-label-md hover:bg-secondary transition-colors shadow-md">
              Book Experience
            </Link>
            <p className="font-label-sm text-on-surface-variant text-center mt-4">You won't be charged yet</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
