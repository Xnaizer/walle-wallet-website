// FeaturesSection.tsx
"use client";
import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  CheckIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/outline";
import GlowCard from "../utils/GlowCard";
import MagneticButton from "../utils/MagneticButton";
import ParallaxSection from "../utils/ParallaxSection";

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  const mainFeatures = [
    "Multi-card management from single dashboard",
    "Real-time transaction notifications and alerts",
    "Advanced security with biometric authentication",
    "International payment support in 200+ countries",
    "Merchant EDC integration for businesses",
    "Stablecoin stability with automatic conversion",
    "24/7 customer support via multiple channels",
    "Zero foreign exchange fees globally",
  ];

  const featureCards = [
    {
      title: "Web Management",
      description: "Complete control over your cards and transactions with our powerful dashboard",
      gradient: "from-primary-600 to-blue-700",
      icon: <DevicePhoneMobileIcon className="w-6 h-6" />,
      features: ["Real-time monitoring", "Advanced analytics", "Bulk operations", "API access"],
    },
    {
      title: "Mobile EDC",
      description: "Transform any smartphone into a payment terminal for merchants",
      gradient: "from-secondary-500 to-secondary-600",
      icon: <CreditCardIcon className="w-6 h-6" />,
      features: ["NFC payments", "QR code support", "Receipt generation", "Inventory tracking"],
    },
    {
      title: "Global Acceptance",
      description: "Use your card anywhere in the world without any additional fees",
      gradient: "from-green-500 to-green-600",
      icon: <GlobeAltIcon className="w-6 h-6" />,
      features: ["200+ countries", "All major currencies", "Real-time exchange", "Lowest rates"],
    }
  ];

  return (
    <section ref={sectionRef} id="features" className="section-padding relative overflow-hidden bg-gradient-to-b from-white via-primary-50/20 to-white">
      {/* Moving Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-[-1]"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-secondary-500/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <ParallaxSection speed={0.1} direction="up">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            >
              {/* Header */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 rounded-full font-medium mb-6 border border-primary-200"
                  whileHover={{ scale: 1.05 }}
                >
                  <ArrowPathRoundedSquareIcon className="w-4 h-4" />
                  <span>Premium Features</span>
                </motion.div>

                <h2 className="text-4xl font-bold mb-6">
                  Advanced Features for{" "}
                  <span className="gradient-text">Modern Payments</span>
                </h2>
                
                <p className="text-lg text-neutral-700 leading-relaxed">
                  Experience the future of payments with our comprehensive suite of features 
                  designed for both{" "}
                  <span className="font-semibold text-primary-700">consumers</span> and{" "}
                  <span className="font-semibold text-secondary-700">merchants</span>.
                </p>
              </motion.div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {mainFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.3 + index * 0.07,
                      ease: [0.25, 1, 0.5, 1]
                    }}
                  >
                    <motion.div 
                      className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <CheckIcon className="w-3.5 h-3.5 text-white" />
                    </motion.div>
                    <span className="text-neutral-700 leading-relaxed group-hover:text-primary-700 transition-colors duration-300 flex-1">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 1 }}
              >
                <MagneticButton variant="primary">
                  Explore All Features
                </MagneticButton>
              </motion.div>
            </motion.div>
          </ParallaxSection>

          {/* Right Content - Feature Cards */}
          <div className="space-y-6">
            {featureCards.map((card, index) => (
              <ParallaxSection 
                key={card.title}
                speed={0.1} 
                direction={index % 2 === 0 ? "right" : "left"} 
                className="flex justify-end"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.2 + index * 0.1,
                    ease: [0.25, 1, 0.5, 1]
                  }}
                >
                  <GlowCard className="p-6 sm:p-8">
                    <div className="flex items-start gap-5">
                      {/* Feature Icon */}
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-r ${card.gradient} rounded-xl flex items-center justify-center text-white shadow-lg`}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: 5,
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {card.icon}
                      </motion.div>

                      <div className="flex-1">
                        {/* Feature Title */}
                        <h3 className="text-xl font-bold text-neutral-800 mb-2">
                          {card.title}
                        </h3>

                        {/* Feature Description */}
                        <p className="text-neutral-600 text-sm mb-4">
                          {card.description}
                        </p>

                        {/* Feature Sub-items */}
                        <div className="grid grid-cols-2 gap-3">
                          {card.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              className="flex items-center gap-2 text-xs text-neutral-700"
                              initial={{ opacity: 0, x: -5 }}
                              animate={isInView ? { opacity: 1, x: 0 } : {}}
                              transition={{ 
                                duration: 0.3, 
                                delay: 0.5 + index * 0.1 + featureIndex * 0.05
                              }}
                            >
                              <div className={`w-1.5 h-1.5 bg-gradient-to-r ${card.gradient} rounded-full`} />
                              <span>{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              </ParallaxSection>
            ))}
          </div>
        </div>

        {/* Bottom Statistics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-12 border-t border-neutral-200"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          {[
            { icon: ShieldCheckIcon, value: "256-bit", label: "Encryption", color: "text-green-600" },
            { icon: CreditCardIcon, value: "50+", label: "Card Types", color: "text-blue-600" },
            { icon: DevicePhoneMobileIcon, value: "iOS/Android", label: "Platforms", color: "text-purple-600" },
            { icon: GlobeAltIcon, value: "200+", label: "Countries", color: "text-yellow-600" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className={`w-10 h-10 mx-auto mb-3 ${stat.color}`}
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 0.3 
                }}
              >
                <stat.icon className="w-full h-full" />
              </motion.div>
              <div className={`text-lg font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-sm text-neutral-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}