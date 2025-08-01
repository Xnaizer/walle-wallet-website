// HowItWorksSection.tsx
"use client";
import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import GlowCard from "../utils/GlowCard";
import ParallaxSection from "../utils/ParallaxSection";

interface Step {
  step: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Parallax effects
  const pathProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  const steps: Step[] = [
    {
      step: 1,
      title: "Buy NFC Card",
      description: "Purchase your premium NFC card from our marketplace with multiple design options.",
      icon: "🛒",
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
      features: ["Premium materials", "Free shipping", "Multiple designs"]
    },
    {
      step: 2,
      title: "Connect Card",
      description: "Link your card to the app through our secure web interface in seconds.",
      icon: "🔗",
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      features: ["QR code activation", "Instant pairing", "Secure connection"]
    },
    {
      step: 3,
      title: "Set Allowance",
      description: "Configure spending limits and card settings with precision and ease.",
      icon: "⚙️",
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      features: ["Flexible limits", "Category controls", "Real-time updates"]
    },
    {
      step: 4,
      title: "Add Funds",
      description: "Convert fiat to crypto seamlessly within the app at best market rates.",
      icon: "💱",
      color: "bg-gradient-to-br from-yellow-500 to-orange-500",
      features: ["Best rates", "Instant conversion", "Multiple currencies"]
    },
    {
      step: 5,
      title: "Pay Anywhere",
      description: "Use your card with merchants worldwide without any barriers or fees.",
      icon: "🌐",
      color: "bg-gradient-to-br from-indigo-500 to-purple-500",
      features: ["Global acceptance", "No FX fees", "Instant settlement"]
    },
  ];

  return (
    <section ref={sectionRef} id="how-it-works" className="section-padding relative overflow-hidden bg-gradient-to-b from-white via-secondary-50/20 to-white">
      {/* Moving Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-[-1]"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-secondary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-primary-500/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary-100 to-primary-100 text-primary-700 rounded-full font-medium mb-6 border border-primary-200"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="text-xl">🚀</span>
            <span>Simple 5-Step Process</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How{" "}
            <span className="gradient-text">It Works</span>
          </h2>
          
          <motion.p
            className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get started with Walle Wallet in just{" "}
            <span className="font-semibold text-secondary-700">5 simple steps</span>.
            No technical knowledge required – we&apos;ve made crypto payments as easy as using a debit card.
          </motion.p>
        </motion.div>

        {/* Steps with Connection Path */}
        <div className="relative max-w-6xl mx-auto">

          {/* Connection Path - Desktop Only */}
          <div className="hidden lg:block absolute top-24 left-0 w-full h-1 z-0">
            <svg className="w-full h-full" viewBox="0 0 1200 8" preserveAspectRatio="none">
              {/* Background path */}
              <path
                d="M0,4 C300,25 600,-15 900,20 T1200,4"
                stroke="rgba(33, 150, 243, 0.2)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
              
              {/* Animated path that grows as you scroll */}
              <motion.path
                d="M0,4 C300,25 600,-15 900,20 T1200,4"
                stroke="url(#howItWorksGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                style={{ pathLength: pathProgress }}
                strokeDasharray={1}
                strokeDashoffset={0}
              />
              
              <defs>
                <linearGradient id="howItWorksGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2196f3" />
                  <stop offset="50%" stopColor="#64b5f6" />
                  <stop offset="100%" stopColor="#ffcb05" />
                </linearGradient>
              </defs>
            </svg>

            {/* Animated Progress Dot */}
            <motion.div
              className="absolute top-1/2 w-6 h-6 bg-white rounded-full shadow-lg transform -translate-y-1/2 border-2 border-primary-500 z-20 flex items-center justify-center"
              style={{ left: useTransform(pathProgress, [0, 1], ['0%', 'calc(100% - 24px)']) }}
            >
              <motion.div 
                className="w-2 h-2 bg-primary-600 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Steps Grid */}
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.3 + index * 0.1,
                  ease: [0.25, 1, 0.5, 1]
                }}
                className="flex flex-col"
              >
                {/* Step Number */}
                <motion.div
                  className="relative z-20 mx-auto mb-6"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg mx-auto`}
                    animate={{ 
                      boxShadow: [
                        "0 5px 15px rgba(0,0,0,0.1)",
                        "0 15px 30px rgba(0,0,0,0.2)",
                        "0 5px 15px rgba(0,0,0,0.1)",
                      ]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                  >
                    {step.step}
                  </motion.div>
                  
                  {/* Subtle glow */}
                  <motion.div
                    className={`absolute inset-0 ${step.color} rounded-full blur-lg opacity-30`}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3,
                    }}
                  />
                </motion.div>

                {/* Step Content Card */}
                <GlowCard className="flex-1 p-5 text-center" gradient={index % 2 === 0 ? "primary" : "secondary"}>
                  {/* Step Icon */}
                  <motion.div
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Step Title */}
                  <h3 className="text-lg font-bold text-neutral-800 mb-3">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-neutral-600 text-sm mb-4">
                    {step.description}
                  </p>

                  {/* Step Features */}
                  <div className="space-y-2 text-xs text-neutral-500">
                    {step.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center justify-center gap-1.5"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.5 + index * 0.1 + featureIndex * 0.05
                        }}
                      >
                        <div className={`w-1.5 h-1.5 ${step.color} rounded-full`} />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          {[
            { value: "< 5 min", label: "Setup Time", icon: "⚡" },
            { value: "24/7", label: "Support", icon: "🛟" },
            { value: "99.9%", label: "Success Rate", icon: "✅" },
            { value: "Free", label: "Setup Cost", icon: "💰" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card p-4 text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="text-2xl mb-2 mx-auto"
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 0.3 
                }}
              >
                {stat.icon}
              </motion.div>
              <div className="text-lg font-bold text-primary-700">
                {stat.value}
              </div>
              <div className="text-xs text-neutral-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}