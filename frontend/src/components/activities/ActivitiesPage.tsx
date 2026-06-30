"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAdventures } from "@/lib/api";
import { AdventureCard } from "@/components/adventures/AdventureCard";
import { motion } from "framer-motion";

export function ActivitiesPage() {
  const { data: adventures, isLoading } = useQuery({
    queryKey: ["adventures"],
    queryFn: () => fetchAdventures({}),
  });

  if (isLoading || !adventures) {
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

  // Group adventures by duration
  const weekendEscapes = adventures.filter(a => a.duration_days <= 2 && a.activity_type !== "Stay");
  const grandExpeditions = adventures.filter(a => a.duration_days > 2 && a.activity_type !== "Stay");

  return (
    <div className="w-full flex flex-col pt-32 pb-24">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full mb-12 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display-lg-mobile md:font-display-lg text-on-background mb-4"
        >
          Discover Your Next Expedition
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-body-lg text-on-surface-variant max-w-2xl mx-auto"
        >
          From challenging summit ascents to relaxing monsoon trails, find the perfect adventure for your skill level.
        </motion.p>
      </div>

      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full space-y-16">
        {weekendEscapes.length > 0 && (
          <section>
            <h2 className="font-headline-md text-on-surface mb-6">Weekend Escapes (1-2 Days)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {weekendEscapes.map((adv) => (
                <AdventureCard 
                  key={adv.id} 
                  slug={adv.slug}
                  title={adv.title}
                  destination={"Maharashtra"}
                  category={adv.activity_type}
                  price={adv.price}
                  rating={4.8}
                  reviewCount={24}
                  duration={`${adv.duration_days} Days`}
                  difficulty={adv.difficulty}
                  image={adv.image_url}
                />
              ))}
            </div>
          </section>
        )}

        {grandExpeditions.length > 0 && (
          <section>
            <h2 className="font-headline-md text-on-surface mb-6">Grand Expeditions (3+ Days)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {grandExpeditions.map((adv) => (
                <AdventureCard 
                  key={adv.id} 
                  slug={adv.slug}
                  title={adv.title}
                  destination={"Maharashtra"}
                  category={adv.activity_type}
                  price={adv.price}
                  rating={4.9}
                  reviewCount={36}
                  duration={`${adv.duration_days} Days`}
                  difficulty={adv.difficulty}
                  image={adv.image_url}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
