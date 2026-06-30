"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDestinations } from "@/lib/api";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function TrendingDestinations() {
  const { data: destinations, isLoading, error } = useQuery({
    queryKey: ["destinations"],
    queryFn: fetchDestinations,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter h-[400px]">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-surface-variant rounded-xl w-full h-full" />
        ))}
      </div>
    );
  }

  if (error || !destinations) {
    return (
      <div className="bg-error-container text-on-error-container p-6 rounded-xl font-body-md">
        Unable to load trending destinations at this time. Please check your backend connection.
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="font-headline-md text-on-surface">Trending Destinations</h2>
          <p className="font-body-md text-on-surface-variant mt-2">Explore the most sought-after landscapes this season.</p>
        </div>
        <Link href="/destinations" className="hidden md:flex items-center text-primary font-label-md text-label-md hover:text-secondary transition-colors">
          View all <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {destinations.slice(0, 3).map((dest) => (
          <Link href={`/destinations/${dest.slug}`} key={dest.id} scroll={false}>
            <motion.div 
              layoutId={`card-container-${dest.slug}`}
              className="group relative rounded-xl overflow-hidden aspect-[4/5] ambient-shadow cursor-pointer border border-outline-variant/30"
            >
              <motion.div 
                layoutId={`card-image-${dest.slug}`}
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: `url('${dest.image_url}')` }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-6 w-full flex flex-col items-start z-10">
                <motion.div 
                  layoutId={`card-tag-${dest.slug}`}
                  className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white font-label-sm text-label-sm mb-3"
                >
                  {dest.tag}
                </motion.div>
                
                <motion.h3 
                  layoutId={`card-title-${dest.slug}`}
                  className="font-headline-sm text-white mb-1"
                >
                  {dest.title}
                </motion.h3>
                
                <motion.p 
                  layoutId={`card-desc-${dest.slug}`}
                  className="font-body-md text-white/80 line-clamp-2"
                >
                  {dest.short_description}
                </motion.p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </>
  );
}
