// SolutionSection.tsx
"use client";
import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ShieldCheckIcon,
  BoltIcon,
  GlobeAltIcon,
  CreditCardIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import GlowCard from "../utils/GlowCard";
import ParallaxSection from "../utils/ParallaxSection";

interface Feature {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  benefits: string[];
}

export default function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  const features: Feature[] = [
    {
      title: "Simple",
      subtitle: "Tap & Pay",
      description: "NFC cards that work exactly like your regular debit cards at any contactless terminal worldwide.",
      icon: <CreditCardIcon className="w-6 h-6" />,
      color: "bg-gradient-to-br from-primary-600 to-primary-700",
      benefits: ["No learning curve", "Works everywhere", "Instant setup"]
    },
    {
      title: "Protected",
      subtitle: "Bank-Level Security",
      description: "Military-grade encryption, biometric authentication, and real-time fraud detection keep your funds secure.",
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      benefits: ["Multi-factor auth", "Fraud protection", "Remote disable"]
    },
    {
      title: "Rapid",
      subtitle: "Lightning-Fast",
      description: "Transactions complete in milliseconds, not minutes, with our optimized blockchain technology.",
      icon: <BoltIcon className="w-6 h-6" />,
      color: "bg-gradient-to-br from-secondary-500 to-secondary-600",
      benefits: ["Sub-second finality", "Low fees", "High throughput"]
    },
    {
      title: "Global",
      subtitle: "No Borders",
      description: "Use your card in any country without worrying about exchange rates or international fees.",
      icon: <GlobeAltIcon className="w-6 h-6" />,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      benefits: ["200+ countries", "No forex fees", "Multi-currency"]
    },
  ];

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden bg-gradient-to-b from-white via-primary-50/20 to-white">
      {/* Moving Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-[-1]"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-secondary-500/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 rounded-full font-medium mb-6 border border-primary-200"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="text-xl">✨</span>
            <span>Introducing Our Solution</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet{" "}
            <span className="gradient-text">Walle Wallet</span>
          </h2>
          
          <motion.p
            className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We bridge the gap between{" "}
            <span className="font-semibold text-primary-700">crypto innovation</span> and{" "}
            <span className="font-semibold text-secondary-700">everyday payment convenience</span>{" "}
            through a familiar card-based interface powered by cutting-edge blockchain technology.
          </motion.p>
        </motion.div>
        
        {/* Key Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            { value: "10M+", label: "Users Ready" },
            { value: "200+", label: "Countries" },
            { value: "99.9%", label: "Uptime" },
            { value: "$5B+", label: "Processed" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card p-4 text-center"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="text-2xl font-bold text-primary-700"
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 0.3,
                  ease: "easeInOut"
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-neutral-600 font-medium mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <ParallaxSection
              key={feature.title}
              speed={0.15}
              direction={index % 2 === 0 ? "up" : "down"}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.2 + index * 0.1,
                  ease: [0.25, 1, 0.5, 1]
                }}
                className="h-full"
              >
                <GlowCard className="h-full p-8 text-center" gradient={index % 2 === 0 ? "primary" : "secondary"}>
                  {/* Feature Icon */}
                  <motion.div
                    className={`w-14 h-14 ${feature.color} rounded-2xl shadow-lg flex items-center justify-center text-white mx-auto mb-6`}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.icon}
                  </motion.div>

                  {/* Feature Title & Subtitle */}
                  <h3 className="text-xl font-bold text-neutral-800 mb-1">
                    {feature.title}
                  </h3>
                  
                  <h4 className="text-sm font-medium text-primary-600 mb-4">
                    {feature.subtitle}
                  </h4>

                  {/* Feature Description */}
                  <p className="text-neutral-600 mb-6">
                    {feature.description}
                  </p>

                  {/* Feature Benefits */}
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center justify-center gap-2 text-sm text-neutral-700"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.6 + index * 0.1 + idx * 0.05
                        }}
                      >
                        <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            </ParallaxSection>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-4 px-6 py-4 glass-card rounded-xl"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-2xl">🚀</span>
            <div className="text-left">
              <div className="font-bold text-primary-700">Ready to transform your payments?</div>
              <div className="text-sm text-neutral-600">Join millions who&apos;ve already made the switch</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full`}
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: i % 2 === 0
                ? `rgba(33, 150, 243, ${Math.random() * 0.2 + 0.1})`
                : `rgba(255, 203, 5, ${Math.random() * 0.2 + 0.1})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50],
              x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 80],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </section>
  );
}