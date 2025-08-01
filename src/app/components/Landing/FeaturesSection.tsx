
"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CheckIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });
  
  const mainFeatures = [
    "Multi-card management from single dashboard",
    "Real-time transaction notifications and alerts", 
    "Advanced security with biometric authentication",
    "International payment support in 200+ countries",
    "Zero foreign exchange fees globally",
    "24/7 customer support via multiple channels",
  ];

  const featureCards = [
    {
      title: "Web Management",
      description: "Complete control over your cards and transactions with our powerful dashboard",
      icon: <DevicePhoneMobileIcon className="w-6 h-6" />,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100/50",
      features: ["Real-time monitoring", "Advanced analytics", "Bulk operations", "API access"],
    },
    {
      title: "Mobile EDC",
      description: "Transform any smartphone into a payment terminal for merchants",
      icon: <CreditCardIcon className="w-6 h-6" />,
      gradient: "from-secondary-500 to-secondary-600",
      bgGradient: "from-secondary-50 to-secondary-100/50",
      features: ["NFC payments", "QR code support", "Receipt generation", "Inventory tracking"],
    },
    {
      title: "Global Acceptance",
      description: "Use your card anywhere in the world without any additional fees",
      icon: <GlobeAltIcon className="w-6 h-6" />,
      gradient: "from-primary-500 to-primary-600",
      bgGradient: "from-primary-50 to-primary-100/50",
      features: ["200+ countries", "All major currencies", "Real-time exchange", "Lowest rates"],
    }
  ];

  const stats = [
    { icon: ShieldCheckIcon, value: "256-bit", label: "Encryption", color: "text-blue-600", bg: "bg-blue-100" },
    { icon: CreditCardIcon, value: "50+", label: "Card Types", color: "text-secondary-600", bg: "bg-secondary-100" },
    { icon: DevicePhoneMobileIcon, value: "iOS/Android", label: "Platforms", color: "text-primary-600", bg: "bg-primary-100" },
    { icon: GlobeAltIcon, value: "200+", label: "Countries", color: "text-accent-600", bg: "bg-accent-100" },
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gradient-to-br from-blue-50/30 via-white to-primary-50/30">
      <div className="container mx-auto max-w-7xl px-6">
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="mb-8">

              
              <h2 className="text-4xl lg:text-5xl font-black text-blue-900 mb-6 leading-tight">
                Advanced Features for Modern Payments
                
              </h2>
              
              <p className="text-xl text-neutral-600 leading-relaxed">
                Experience the future of crypto payments with our comprehensive suite of features designed for both consumers and merchants.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4 mb-10">
              {mainFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-neutral-700 leading-relaxed group-hover:text-blue-900 transition-colors duration-300">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <button className="px-8 py-4 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Explore All Features
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <div className="space-y-6">
            {featureCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`bg-gradient-to-br ${card.bgGradient} rounded-2xl p-6 border border-white/50   backdrop-blur-sm`}
              >
                <div className="flex items-start gap-4">
                  {/* Feature Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-r ${card.gradient} rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                    {card.icon}
                  </div>

                  <div className="flex-1">
                    {/* Feature Title */}
                    <h3 className="text-xl font-bold text-blue-900 mb-2">
                      {card.title}
                    </h3>

                    {/* Feature Description */}
                    <p className="text-neutral-600 mb-4 leading-relaxed">
                      {card.description}
                    </p>

                    {/* Feature Sub-items */}
                    <div className="grid grid-cols-2 gap-3">
                      {card.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm text-neutral-700"
                        >
                          <div className={`w-2 h-2 bg-gradient-to-r ${card.gradient} rounded-full`} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-20 pt-12 border-t border-neutral-200"
        >
          <h3 className="text-3xl font-bold bg-gradient-to-r from-primary-600 via-primary-700 to-blue-800 bg-clip-text text-transparent text-center mb-12">
            Trusted by Millions Worldwide
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center  duration-300"
                
              >
                <div className={`w-16 h-16 mx-auto mb-4 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color} shadow-sm`}>
                  <stat.icon className="w-8 h-8" />
                </div>
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