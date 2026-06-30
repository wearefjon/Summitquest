"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchOperators } from "@/lib/api";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, MapPin, ShieldCheck } from "lucide-react";

export function OperatorsPage() {
  const { data: operators, isLoading } = useQuery({
    queryKey: ["operators"],
    queryFn: fetchOperators,
  });

  if (isLoading || !operators) {
    return (
      <div className="w-full h-screen flex flex-col items-center pt-32 gap-8 px-margin-mobile md:px-margin-desktop">
        <div className="animate-pulse bg-surface-variant w-full h-12 rounded-xl max-w-container-max mx-auto" />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 max-w-container-max mx-auto">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="animate-pulse bg-surface-variant w-full h-[200px] rounded-xl" />
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
          Expert Custodians of the Sahyadris
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-body-lg text-on-surface-variant max-w-2xl mx-auto"
        >
          Travel with certified professionals who know the mountains like the back of their hand. Safety and authenticity guaranteed.
        </motion.p>
      </div>

      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {operators.map((operator, i) => (
            <motion.div
              key={operator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface-container-lowest border border-outline-variant/30 rounded-24px p-6 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div 
                className="w-full md:w-32 h-32 rounded-full md:rounded-2xl bg-cover bg-center flex-shrink-0 mx-auto md:mx-0"
                style={{ backgroundImage: `url('${operator.avatar_url}')` }}
              />
              
              <div className="flex flex-col flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-2 mb-2">
                  <h3 className="font-headline-sm text-on-surface flex items-center gap-2">
                    {operator.name}
                    {operator.is_verified && (
                      <ShieldCheck className="w-5 h-5 text-primary" />
                    )}
                  </h3>
                  <div className="flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-secondary fill-secondary" />
                    <span className="font-label-sm text-secondary font-bold">{operator.rating}</span>
                    <span className="font-label-sm text-on-surface-variant">({operator.review_count})</span>
                  </div>
                </div>
                
                {operator.location && (
                  <div className="flex items-center justify-center md:justify-start gap-1 text-on-surface-variant mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="font-body-sm">{operator.location}</span>
                  </div>
                )}
                
                <p className="font-body-md text-on-surface-variant line-clamp-2 mb-6 flex-1">
                  {operator.description}
                </p>
                
                <Link 
                  href={`/operators/${operator.id}`}
                  className="inline-flex items-center justify-center bg-surface-container-highest hover:bg-primary hover:text-white transition-colors px-6 py-2 rounded-full font-label-md text-label-md mt-auto w-fit mx-auto md:mx-0"
                >
                  View Profile
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
