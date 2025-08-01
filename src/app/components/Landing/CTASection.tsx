// CTASection.tsx
"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheckIcon,
  BoltIcon,
  GlobeAltIcon,
  ArrowRightIcon,
  SparklesIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import MagneticButton from "../utils/MagneticButton";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });

  const trustIndicators = [
    { 
      icon: ShieldCheckIcon, 
      text: "Bank-Grade Security", 
      description: "Military-level encryption",
      color: "text-green-400"
    },
    { 
      icon: BoltIcon, 
      text: "Instant Transactions", 
      description: "Lightning fast payments",
      color: "text-yellow-400"
    },
    { 
      icon: GlobeAltIcon, 
      text: "Global Coverage", 
      description: "200+ countries supported",
      color: "text-blue-400"
    }
  ];

  const appStoreButtons = [
    {
      platform: "iOS",
      icon: "🍎",
      text: "App Store",
      subtitle: "Download on the",
      href: "#"
    },
    {
      platform: "Android", 
      icon: "📱",
      text: "Google Play",
      subtitle: "Get it on",
      href: "#"
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-neutral-900" />
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/8 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        {/* Floating Particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >


          {/* Main Heading */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 leading-tight">
              Ready to Transform Your Payments?
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Join millions who have{" "}
            <span className="font-semibold text-blue-300">revolutionized their payments</span>{" "}
            with Walle Wallet&apos;s cutting-edge NFC crypto cards.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MagneticButton variant="secondary" size="lg">
                <span>Get Your Card Now</span>
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </MagneticButton>
            </motion.div>

            <motion.button
              className="px-8 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Mobile App Download - Compact */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <DevicePhoneMobileIcon className="w-5 h-5 text-blue-300" />
              <span className="text-white font-medium">Download Mobile App</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-lg mx-auto">
              {appStoreButtons.map((button, index) => (
                <motion.a
                  key={button.platform}
                  href={button.href}
                  className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 group w-full sm:w-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl">{button.icon}</div>
                  <div className="text-left">
                    <div className="text-white/70 text-xs">{button.subtitle}</div>
                    <div className="text-white font-semibold group-hover:text-blue-300 transition-colors duration-300">
                      {button.text}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Trust Indicators - Compact */}
          <motion.div
            className="border-t border-white/10 pt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <motion.h3
              className="text-white/80 text-lg font-semibold mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              Trusted by millions worldwide
            </motion.h3>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {trustIndicators.map((indicator, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10  "
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.7, 
                    delay: 1.4 + index * 0.1,
                  }}
                  
                >
                  <motion.div
                    className={`w-12 h-12 ${indicator.color} mb-4 `}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: "easeInOut",
                    }}
                  >
                    <indicator.icon className="w-full h-full" />
                  </motion.div>
                  <div className="font-bold text-lg text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {indicator.text}
                  </div>
                  <div className="text-white/70 text-sm">
                    {indicator.description}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats - Compact */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto pb-24"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              {[
                { value: "5M+", label: "Active Users", icon: "👥" },
                { value: "$15B+", label: "Processed", icon: "💰" },
                { value: "200+", label: "Countries", icon: "🌍" },
                { value: "99.99%", label: "Uptime", icon: "⚡" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl mb-2 ">
                    {stat.icon}
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1 ">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave Effect at Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10 ">
        <svg
          className="relative block w-full h-20"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,64 C150,100 350,0 600,64 C850,128 1050,32 1200,64 L1200,120 L0,120 Z"
            fill="rgba(255,255,255,1)"
            animate={{
              d: [
                "M0,64 C150,100 350,0 600,64 C850,128 1050,32 1200,64 L1200,120 L0,120 Z",
                "M0,44 C150,76 350,28 600,44 C850,60 1050,92 1200,44 L1200,120 L0,120 Z",
                "M0,64 C150,100 350,0 600,64 C850,128 1050,32 1200,64 L1200,120 L0,120 Z",
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
      
    </section>
  );
}