"use client";

import Link from "next/link";
import { Search, MapPin, Calendar, Map, ArrowRight, ShieldCheck, HeartHandshake, BadgeCheck } from "lucide-react";
import { TrendingDestinations } from "@/components/home/TrendingDestinations";
import { motion } from "framer-motion";

import type { Variants } from "framer-motion";

export default function Home() {
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full h-[921px] min-h-[700px] flex flex-col justify-center items-center pt-[72px]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/f.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 z-0" />
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 text-center px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto flex flex-col items-center"
        >
          <motion.h1 variants={fadeInUp} className="font-display-lg-mobile md:font-display-lg text-white mb-6 max-w-3xl drop-shadow-lg">
            Discover the Untamed Beauty of Maharashtra
          </motion.h1>
          <motion.p variants={fadeInUp} className="font-body-lg text-white/90 mb-12 max-w-2xl drop-shadow-md">
            Curated expeditions, verified professional guides, and safety-first adventures across the Sahyadris.
          </motion.p>
          
          {/* Glassmorphism Search Bar */}
          <motion.div variants={fadeInUp} className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-full p-2 w-full max-w-4xl flex flex-col md:flex-row items-center gap-2 shadow-2xl">
            <div className="flex-1 bg-white/60 rounded-full px-6 py-3 flex items-center w-full">
              <MapPin className="text-on-surface-variant mr-3 w-5 h-5" />
              <input className="bg-transparent border-none outline-none focus:ring-0 text-on-surface font-body-md w-full placeholder-on-surface-variant" placeholder="Where do you want to go?" type="text"/>
            </div>
            <div className="flex-1 bg-white/60 rounded-full px-6 py-3 flex items-center w-full">
              <Calendar className="text-on-surface-variant mr-3 w-5 h-5" />
              <input className="bg-transparent border-none outline-none focus:ring-0 text-on-surface font-body-md w-full placeholder-on-surface-variant" placeholder="When?" type="text"/>
            </div>
            <div className="flex-1 bg-white/60 rounded-full px-6 py-3 flex items-center w-full">
              <Map className="text-on-surface-variant mr-3 w-5 h-5" />
              <input className="bg-transparent border-none outline-none focus:ring-0 text-on-surface font-body-md w-full placeholder-on-surface-variant" placeholder="Activity?" type="text"/>
            </div>
            <button className="w-full md:w-auto bg-on-tertiary-container text-white rounded-full px-8 py-4 font-label-md text-label-md hover:bg-tertiary-container transition-colors shadow-md flex items-center justify-center">
              <Search className="mr-2 w-5 h-5" />
              Search
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Trending Destinations */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
      >
        <TrendingDestinations />
      </motion.section>

      {/* Featured Adventures (Bento Grid) */}
      <section className="py-24 bg-surface-off-white px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-headline-md text-on-surface">Featured Adventures</h2>
            <p className="font-body-md text-on-surface-variant mt-4 max-w-2xl mx-auto">
              Handpicked experiences designed for thrill-seekers and nature lovers alike, guided by certified professionals.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-gutter h-auto md:h-[600px]"
          >
            {/* Large Feature: Trekking */}
            <motion.div variants={fadeInUp} className="md:col-span-2 md:row-span-2 h-full">
              <Link href="/adventures/harishchandragad" className="h-full block relative rounded-xl overflow-hidden group ambient-shadow cursor-pointer min-h-[400px]">
                <div className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-on-tertiary-container text-white rounded-full font-label-sm text-label-sm">Hard</span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full font-label-sm text-label-sm">2 Days</span>
                  </div>
                  <h3 className="font-headline-md text-white mb-2">Trekking to Harishchandragad</h3>
                  <p className="font-body-md text-white/90 mb-6 max-w-md">Experience the breathtaking sunset from the iconic Konkan Kada cliff face.</p>
                  <button className="bg-white text-primary px-6 py-3 rounded-xl font-label-md text-label-md hover:bg-surface-off-white transition-colors">
                    View Itinerary
                  </button>
                </div>
              </Link>
            </motion.div>

            {/* Medium Feature: Kayaking */}
            <motion.div variants={fadeInUp} className="md:col-span-2 md:row-span-1 h-full">
              <Link href="/adventures/pawna-kayaking" className="h-full block relative rounded-xl overflow-hidden group ambient-shadow cursor-pointer min-h-[280px]">
                <div className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-end">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-secondary text-white rounded-full font-label-sm text-label-sm">Easy</span>
                    </div>
                    <h3 className="font-headline-sm text-white mb-1">Kayaking in Pawna Lake</h3>
                    <p className="font-body-md text-white/80">Tranquil waters under the shadow of historic forts.</p>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </Link>
            </motion.div>

            {/* Small Features */}
            <motion.div variants={fadeInUp} className="md:col-span-1 md:row-span-1 h-full">
              <div className="h-full relative rounded-xl overflow-hidden bg-surface ambient-shadow p-6 flex flex-col justify-between border border-outline-variant/20">
                <div>
                  <BadgeCheck className="w-10 h-10 text-secondary mb-4" />
                  <h3 className="font-headline-sm text-on-surface mb-2">Pro Guides</h3>
                  <p className="font-body-md text-on-surface-variant">All our treks are led by certified mountaineering experts.</p>
                </div>
                <span className="text-primary font-label-md text-label-md mt-4 opacity-50 cursor-not-allowed">
                  Meet the team (Coming Soon)
                </span>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="md:col-span-1 md:row-span-1 h-full">
              <div className="h-full relative rounded-xl overflow-hidden bg-primary text-white ambient-shadow p-6 flex flex-col justify-center items-center text-center">
                <h3 className="font-headline-sm mb-4">Custom Expedition?</h3>
                <p className="font-body-md text-white/80 mb-6">Let us design a bespoke adventure tailored to your group.</p>
                <Link href="/login" className="border border-white text-white px-6 py-2 rounded-xl font-label-md text-label-md hover:bg-white hover:text-primary transition-colors w-full text-center">
                  Inquire Now
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-headline-md text-on-surface">The SummitQuest Standard</h2>
          <p className="font-body-md text-on-surface-variant mt-4">Elevating adventure tourism through uncompromised quality.</p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          <motion.div variants={fadeInUp} className="text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-6 text-primary">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-headline-sm text-on-surface mb-3">Verified Guides</h3>
            <p className="font-body-md text-on-surface-variant">Every guide holds advanced certifications from recognized mountaineering institutes.</p>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-6 text-primary">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <h3 className="font-headline-sm text-on-surface mb-3">Safety First</h3>
            <p className="font-body-md text-on-surface-variant">Rigorous safety protocols and premium medical-grade equipment on every trail.</p>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-6 text-primary">
              <BadgeCheck className="w-8 h-8" />
            </div>
            <h3 className="font-headline-sm text-on-surface mb-3">Transparent Pricing</h3>
            <p className="font-body-md text-on-surface-variant">No hidden fees. Premium experiences at the best possible market value.</p>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
