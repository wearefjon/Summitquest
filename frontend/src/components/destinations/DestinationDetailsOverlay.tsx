"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDestinationBySlug } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useEffect } from "react";

export function DestinationDetailsOverlay({ slug }: { slug: string }) {
  const router = useRouter();
  
  const { data: destination, isLoading } = useQuery({
    queryKey: ["destination", slug],
    queryFn: () => fetchDestinationBySlug(slug),
  });

  // Lock body scroll when overlay is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    router.back();
  };

  if (isLoading || !destination) {
    return null; // The layout transition depends on the data existing. For real apps, you might prefetch this data.
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm pointer-events-auto"
        />

        {/* The morphing container */}
        <motion.div 
          layoutId={`card-container-${destination.slug}`}
          className="relative w-full max-w-5xl h-[85vh] bg-surface rounded-24px overflow-hidden flex flex-col pointer-events-auto shadow-2xl"
          transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
        >
          {/* Close button */}
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 z-50 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Image mapping from card */}
          <motion.div 
            layoutId={`card-image-${destination.slug}`}
            className="relative w-full h-1/2 min-h-[300px] bg-cover bg-center"
            style={{ backgroundImage: `url('${destination.image_url}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-8 w-full z-10">
              <motion.div 
                layoutId={`card-tag-${destination.slug}`}
                className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white font-label-sm text-label-sm mb-4"
              >
                {destination.tag}
              </motion.div>
              
              <motion.h1 
                layoutId={`card-title-${destination.slug}`}
                className="font-display-lg-mobile md:font-display-lg text-white mb-2 drop-shadow-md"
              >
                {destination.title}
              </motion.h1>
              
              <motion.p 
                layoutId={`card-desc-${destination.slug}`}
                className="font-body-lg text-white/90 max-w-3xl drop-shadow-md"
              >
                {destination.short_description}
              </motion.p>
            </div>
          </motion.div>

          {/* Expanded Content (Fades in) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 overflow-y-auto p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2">
                <h2 className="font-headline-sm text-on-surface mb-4">About this Destination</h2>
                <div className="font-body-md text-on-surface-variant space-y-4">
                  {destination.description.split('\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-1">
                <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30">
                  <h3 className="font-label-md text-label-md font-bold mb-4">Quick Facts</h3>
                  {/* Fake stats for now */}
                  <ul className="space-y-3 font-body-md text-on-surface-variant">
                    <li className="flex justify-between border-b border-outline-variant/20 pb-2">
                      <span>Best Time</span>
                      <span className="font-medium text-on-surface">Oct - Feb</span>
                    </li>
                    <li className="flex justify-between border-b border-outline-variant/20 pb-2">
                      <span>Difficulty</span>
                      <span className="font-medium text-on-surface">Moderate</span>
                    </li>
                  </ul>
                  <button className="w-full mt-6 bg-primary text-white py-3 rounded-full font-label-md text-label-md hover:bg-secondary transition-colors">
                    View Adventures Here
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
