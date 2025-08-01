// RoadmapSection.tsx
"use client";
import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { 
  RocketLaunchIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import GlowCard from "../utils/GlowCard";
import ParallaxSection from "../utils/ParallaxSection";

interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  features: string[];
  status: "completed" | "current" | "upcoming" | "future";
  progress: number;
  icon: string;
  gradient: string;
}

export default function RoadmapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const timelineProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  const roadmapItems: RoadmapItem[] = [
    {
      quarter: "Q4 2025",
      title: "Core Infrastructure",
      description: "Foundation launch with essential payment features",
      features: [
        "NFC Card Manufacturing",
        "Payment Processing System", 
        "Web & Mobile Applications",
        "Security Framework"
      ],
      status: "completed",
      progress: 100,
      icon: "🏗️",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      quarter: "Q1 2026",
      title: "Enhanced Features",
      description: "Advanced functionality and user experience improvements",
      features: [
        "Fiat to Crypto Onramp",
        "Multi-Currency Support",
        "Advanced Analytics Dashboard",
        "API for Third-Party Integration"
      ],
      status: "current",
      progress: 65,
      icon: "🚀",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      quarter: "Q2 2026", 
      title: "Mainnet Deployment",
      description: "Full production launch with community incentives",
      features: [
        "Smart Contract Deployment",
        "Token Distribution",
        "Community Governance",
        "Staking Rewards"
      ],
      status: "upcoming",
      progress: 25,
      icon: "🌍",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      quarter: "Q3 2026",
      title: "Advanced Products", 
      description: "Next-generation features and product expansion",
      features: [
        "Premium Card Tiers",
        "AI Money Management",
        "DeFi Protocol Integration",
        "Enterprise Solutions"
      ],
      status: "future",
      progress: 10,
      icon: "⭐",
      gradient: "from-yellow-500 to-orange-500"
    },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "completed":
        return { 
          icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
          color: "bg-green-100 text-green-800 border-green-200"
        };
      case "current":
        return { 
          icon: <RocketLaunchIcon className="w-5 h-5 text-blue-500" />,
          color: "bg-blue-100 text-blue-800 border-blue-200"
        };
      case "upcoming":
        return { 
          icon: <ClockIcon className="w-5 h-5 text-purple-500" />,
          color: "bg-purple-100 text-purple-800 border-purple-200"
        };
      case "future":
        return { 
          icon: <StarIcon className="w-5 h-5 text-yellow-500" />,
          color: "bg-yellow-100 text-yellow-800 border-yellow-200"
        };
      default:
        return { 
          icon: <ClockIcon className="w-5 h-5 text-gray-500" />,
          color: "bg-gray-100 text-gray-800 border-gray-200"
        };
    }
  };

  return (
    <section ref={sectionRef} id="roadmap" className="section-padding relative overflow-hidden bg-gradient-to-b from-white via-secondary-50/20 to-white">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 rounded-full font-medium mb-6 border border-primary-200"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="text-xl">🗺️</span>
            <span>Development Roadmap</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Journey to{" "}
            <span className="gradient-text">Revolution</span>
          </h2>
          
          <motion.p
            className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Follow our strategic roadmap as we{" "}
            <span className="font-semibold text-primary-700">transform</span> the payment industry
            with innovative blockchain technology and user-centric design.
          </motion.p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Track - Vertical */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 z-0">
            {/* Background Track */}
            <div className="w-full h-full bg-neutral-200 rounded-full" />
            
            {/* Progress Indicator */}
            <motion.div
              className="absolute top-0 w-full bg-gradient-to-b from-primary-500 via-primary-600 to-secondary-500 rounded-full"
              style={{ 
                height: timelineProgress,
                transformOrigin: "top" 
              }}
            />
          </div>

          {/* Roadmap Items */}
          <div className="space-y-16 lg:space-y-32">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content for left side / full width on mobile */}
                <motion.div
                  className={`flex-1 lg:pr-16 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left lg:pl-16"} mb-8 lg:mb-0`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.2 + index * 0.1,
                    ease: [0.25, 1, 0.5, 1]
                  }}
                >
                  <ParallaxSection speed={0.15} direction={index % 2 === 0 ? "right" : "left"}>
                    <GlowCard className="p-6 max-w-md mx-auto lg:mx-0 lg:ml-auto lg:mr-0">
                      <div className="flex items-center gap-3 mb-5">
                        {/* Quarter Badge */}
                        <motion.div
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusInfo(item.status).color}`}
                        >
                          {getStatusInfo(item.status).icon}
                          <span>{item.quarter}</span>
                        </motion.div>
                        
                        {/* Icon */}
                        <motion.div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-xl shadow-lg ml-auto`}
                          whileHover={{ 
                            scale: 1.1, 
                            rotate: 10,
                          }}
                        >
                          {item.icon}
                        </motion.div>
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-bold text-neutral-800 mb-2">
                        {item.title}
                      </h3>
                      
                      <p className="text-neutral-600 text-sm mb-4">
                        {item.description}
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="mb-5">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs font-medium text-neutral-600">Progress</span>
                          <span className="text-xs font-bold text-primary-700">{item.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-1.5 bg-gradient-to-r ${item.gradient} rounded-full`}
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${item.progress}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                          />
                        </div>
                      </div>
                      
                      {/* Features */}
                      <div className="space-y-2">
                        {item.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className="flex items-center gap-2 text-xs text-neutral-700"
                            initial={{ opacity: 0, x: -5 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ 
                              duration: 0.3, 
                              delay: 0.8 + index * 0.2 + featureIndex * 0.05
                            }}
                          >
                            <div className={`w-1.5 h-1.5 bg-gradient-to-r ${item.gradient} rounded-full`} />
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </GlowCard>
                  </ParallaxSection>
                </motion.div>

                {/* Timeline Marker */}
                <motion.div 
                  className="relative z-10 w-12 h-12 flex-shrink-0"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.3 + index * 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  <motion.div
                    className="w-12 h-12 bg-white border-4 border-primary-500 rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ 
                      scale: 1.2,
                      boxShadow: "0 0 20px rgba(33, 150, 243, 0.4)"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-lg font-bold text-primary-700">{item.step}</span>
                    
                    {/* Pulse effect for current item */}
                    {item.status === "current" && (
                      <motion.div
                        className="absolute inset-0 bg-primary-500/50 rounded-full"
                        animate={{
                          scale: [1, 1.8],
                          opacity: [0.7, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}
                  </motion.div>
                </motion.div>

                {/* Empty Space for Alternating Layout */}
                <div className="hidden lg:block flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Statistics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          {[
            { value: "18+", label: "Months Development", icon: "⏱️" },
            { value: "25+", label: "Team Members", icon: "👥" },
            { value: "$5M+", label: "Funding Raised", icon: "💰" },
            { value: "99%", label: "Milestone Success", icon: "🎯" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card p-4 text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="text-2xl mb-2"
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 3, 
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