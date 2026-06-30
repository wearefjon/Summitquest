"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAdventures } from "@/lib/api";
import { AdventureCard } from "@/components/adventures/AdventureCard";
import { motion } from "framer-motion";

export function StaysPage() {
  const { data: stays, isLoading } = useQuery({
    queryKey: ["stays"],
    queryFn: () => fetchAdventures({ activity_type: "Stay" }),
  });

  if (isLoading || !stays) {
    return (
      <div className="w-full h-screen flex flex-col items-center pt-32 gap-8 px-margin-mobile md:px-margin-desktop">
        <div className="animate-pulse bg-surface-variant w-full h-12 rounded-xl max-w-container-max mx-auto" />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-container-max mx-auto">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse bg-surface-variant w-full h-[400px] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col pt-32 pb-24">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full mb-12 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display-lg-mobile md:font-display-lg text-on-background mb-4"
        >
          Stays & Basecamps
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-body-lg text-on-surface-variant max-w-2xl mx-auto"
        >
          From luxury glamping to remote alpine tents and heritage homestays. Rest well before your next summit.
        </motion.p>
      </div>

      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stays.map((stay) => (
            <AdventureCard 
              key={stay.id} 
              slug={stay.slug}
              title={stay.title}
              destination={"Maharashtra"}
              category={stay.activity_type}
              price={stay.price}
              rating={4.7}
              reviewCount={15}
              duration={`${stay.duration_days} Days`}
              difficulty={stay.difficulty}
              image={stay.image_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
