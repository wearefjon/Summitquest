"use client";

import { motion } from "framer-motion";
import { ShieldCheck, HeartPulse, HardHat, PhoneCall } from "lucide-react";

export function SafetyPage() {
  const protocols = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Certified Operators Only",
      description: "Every guide and operator on SummitQuest undergoes a rigorous 5-step verification process including certification checks, background screening, and physical fitness evaluations."
    },
    {
      icon: <HardHat className="w-8 h-8 text-primary" />,
      title: "Mandatory Gear Checks",
      description: "No compromises on equipment. Operators are required to provide certified safety harnesses, helmets, and seasonal gear. We audit their equipment logs quarterly."
    },
    {
      icon: <HeartPulse className="w-8 h-8 text-primary" />,
      title: "Medical Preparedness",
      description: "All expeditions are led by Wilderness First Responder (WFR) certified leads. Comprehensive medical kits are mandatory for any trek exceeding 4 hours."
    },
    {
      icon: <PhoneCall className="w-8 h-8 text-primary" />,
      title: "24/7 Emergency Support",
      description: "Our basecamp operations center monitors all active expeditions. In case of emergency, local authorities and rescue teams are coordinated instantly."
    }
  ];

  return (
    <div className="w-full flex flex-col pt-32 pb-24">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ShieldCheck className="w-10 h-10 text-secondary" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display-lg-mobile md:font-display-lg text-on-background mb-4"
        >
          Safety First, Always.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-body-lg text-on-surface-variant max-w-2xl mx-auto"
        >
          The mountains are unforgiving, but they don't have to be dangerous. We partner exclusively with certified professionals who prioritize your well-being.
        </motion.p>
      </div>

      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {protocols.map((protocol, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="bg-surface-container-low p-8 rounded-24px border border-outline-variant/30"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                {protocol.icon}
              </div>
              <h3 className="font-headline-sm text-on-surface mb-3">{protocol.title}</h3>
              <p className="font-body-md text-on-surface-variant">{protocol.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full mt-24">
        <div className="bg-primary text-white rounded-3xl p-10 md:p-16 text-center">
          <h2 className="font-headline-md md:font-display-sm mb-4">Adventure With Confidence</h2>
          <p className="font-body-lg text-white/80 max-w-2xl mx-auto mb-8">
            Read our complete safety guidelines and learn how to prepare for your first high-altitude trek.
          </p>
          <button className="bg-white text-primary px-8 py-4 rounded-full font-label-lg hover:bg-secondary hover:text-white transition-colors shadow-lg">
            Download Safety Guide
          </button>
        </div>
      </div>
    </div>
  );
}
