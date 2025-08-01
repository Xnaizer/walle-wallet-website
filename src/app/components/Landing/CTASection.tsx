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
      color: "text-green-500"
    },
    { 
      icon: BoltIcon, 
      text: "Instant Transactions", 
      description: "Lightning fast payments",
      color: "text-yellow-500"
    },
    { 
      icon: GlobeAltIcon, 
      text: "Global Coverage", 
      description: "200+ countries supported",
      color: "text-blue-500"
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-800 to-blue-900" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            delay: 5,
          }}
        />

        {/* Floating Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50],
              opacity: [0, 0.7, 0],
              scale: [0, Math.random() * 0.5 + 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 text-white font-medium mb-8 mx-auto block"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <SparklesIcon className="w-5 h-5" />
            </motion.div>
            <span>Join the Payment Revolution</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-8 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <span className="block mb-2">Ready to Transform</span>
            <motion.span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-secondary-300 to-white"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Your Payments?
            </motion.span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed text-center font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Join thousands of businesses and individuals who have{" "}
            <span className="font-semibold text-secondary-300">simplified their payments</span>{" "}
            with Walle Wallet's NFC-enabled crypto cards.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <MagneticButton variant="secondary" size="lg">
              <span>Get Your Card Now</span>
              <ArrowRightIcon className="w-5 h-5" />
            </MagneticButton>

            <MagneticButton variant="glass" size="lg">
              <span>Learn More</span>
            </MagneticButton>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="border-t border-white/10 pt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <motion.h3
              className="text-white/80 text-lg font-medium mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Trusted by millions worldwide
            </motion.h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              {trustIndicators.map((indicator, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 text-white/90 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1 + index * 0.1,
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <motion.div
                    className={`w-10 h-10 ${indicator.color} group-hover:scale-110 transition-transform duration-300`}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: "easeInOut",
                    }}
                  >
                    <indicator.icon className="w-full h-full" />
                  </motion.div>
                  <div className="text-left">
                    <div className="font-semibold text-lg group-hover:text-white transition-colors duration-300">
                      {indicator.text}
                    </div>

                    <div className="text-white/70 text-sm">
                      {indicator.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.2 }}
            >
              {[
                { value: "10M+", label: "Active Users" },
                { value: "$5B+", label: "Processed" },
                { value: "99.99%", label: "Uptime" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:text-secondary-300 transition-colors duration-300"
                    animate={{
                      textShadow: [
                        "0 0 0px rgba(255,255,255,0)",
                        "0 0 15px rgba(255,255,255,0.5)",
                        "0 0 0px rgba(255,255,255,0)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    {stat.value}
                  </motion.div>
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
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10">
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