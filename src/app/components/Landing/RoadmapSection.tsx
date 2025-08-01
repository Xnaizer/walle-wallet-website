
"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/outline";

interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  features: string[];
  progress: number;
}

export default function RoadmapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

  const roadmapItems: RoadmapItem[] = [
    {
      quarter: "Q4 2025",
      title: "Core Infrastructure",
      description: "Foundation launch with essential payment features",
      features: ["NFC Card Manufacturing", "Payment Processing System", "Web & Mobile Applications"],
      progress: 100,
    },
    {
      quarter: "Q1 2026",
      title: "Enhanced Features",
      description: "Advanced functionality and user experience improvements",
      features: ["Fiat to Crypto Onramp", "Multi-Currency Support", "Advanced Analytics Dashboard"],
      progress: 65,
    },
    {
      quarter: "Q2 2026",
      title: "Mainnet Deployment",
      description: "Full production launch with community incentives",
      features: ["Smart Contract Deployment", "Token Distribution", "Community Governance"],
      progress: 25,
    },
    {
      quarter: "Q3 2026",
      title: "Advanced Products",
      description: "Next-generation features and product expansion",
      features: ["Premium Card Tiers", "AI Money Management", "DeFi Protocol Integration"],
      progress: 10,
    },
  ];

  const cardColors = [
    { from: "from-primary-500", to: "to-primary-600", light: "from-primary-50", lightTo: "to-primary-100" },
    { from: "from-secondary-500", to: "to-secondary-600", light: "from-secondary-50", lightTo: "to-secondary-100" },
    { from: "from-cyan-500", to: "to-cyan-600", light: "from-cyan-50", lightTo: "to-cyan-100" },
    { from: "from-indigo-500", to: "to-indigo-600", light: "from-indigo-50", lightTo: "to-indigo-100" },
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gradient-to-br from-neutral-50 via-white to-blue-50/30">
      <div className="container mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-black text-neutral-800 mb-6">
            Development Roadmap
           
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Our journey to revolutionize payments with blockchain technology
          </p>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="flex gap-6 overflow-x-auto pb-6">
          {roadmapItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-80"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                className={`bg-gradient-to-br ${cardColors[index].light} ${cardColors[index].lightTo} rounded-2xl p-6 h-full border border-white/50 hover:shadow-xl transition-all duration-300`}
              >
                {/* Quarter Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${cardColors[index].from} ${cardColors[index].to} text-white rounded-full text-sm font-bold`}>
                    {item.quarter}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-neutral-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  {item.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-neutral-600">Progress</span>
                    <span className="text-sm font-bold text-neutral-700">{item.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-2 bg-gradient-to-r ${cardColors[index].from} ${cardColors[index].to} rounded-full`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${item.progress}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                    />
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-neutral-700 mb-3">Key Features</h4>
                  {item.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-center gap-2 text-sm text-neutral-600"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 + featureIndex * 0.05 }}
                    >
                      <CheckIcon className="w-4 h-4 text-neutral-500" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "18+", label: "Months", icon: "⏱️", color: "text-primary-600" },
              { value: "25+", label: "Team Members", icon: "👥", color: "text-secondary-600" },
              { value: "$5M+", label: "Funding", icon: "💰", color: "text-cyan-600" },
              { value: "99%", label: "Success Rate", icon: "🎯", color: "text-indigo-600" },
            ].map((stat, index) => (
              <motion.div key={index} className="text-center group">
                <motion.div
                  className="text-3xl mb-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {stat.icon}
                </motion.div>
                <div className={`text-2xl font-black ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}