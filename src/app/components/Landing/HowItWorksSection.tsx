
"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Step {
  step: number;
  title: string;
  description: string;
  icon: string;
  duration: string;
}

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

  const steps: Step[] = [
    {
      step: 1,
      title: "Order Your Card",
      description: "Choose from premium card designs and get free worldwide shipping to your address.",
      icon: "💳",
      duration: "2-3 days"
    },
    {
      step: 2,
      title: "Activate Instantly",
      description: "Scan the QR code with our mobile app and complete your profile setup in seconds.",
      icon: "📱",
      duration: "30 seconds"
    },
    {
      step: 3,
      title: "Load Your Balance",
      description: "Add funds using crypto, bank transfer, or credit card with real-time conversion.",
      icon: "💰",
      duration: "Instant"
    },
    {
      step: 4,
      title: "Start Spending",
      description: "Use your card at millions of merchants worldwide with contactless payments.",
      icon: "🛍️",
      duration: "Immediate"
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto max-w-7xl px-6">
        
        {/* Clean Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >

            
            <h2 className="text-5xl lg:text-6xl font-black text-blue-900 mb-6 leading-tight">
              Get Started in 4 Steps
            </h2>
            
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              From ordering to spending, we&apos;ve made the process as simple as possible
            </p>
          </motion.div>
        </div>

        {/* Steps Cards - Clean Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white border-2 border-neutral-100 rounded-2xl p-8 h-full hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                  {/* Step Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-900 text-white rounded-xl flex items-center justify-center font-black text-lg">
                      {step.step}
                    </div>
                    <div className="text-3xl">{step.icon}</div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold bg-gradient-to-l from-primary-600 via-primary-700 to-blue-800 bg-clip-text text-transparent">
                      {step.title}
                    </h3>
                    
                    <div className="inline-block px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-semibold">
                      ⏱️ {step.duration}
                    </div>
                    
                    <p className="text-neutral-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process Flow - Clean Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-neutral-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-blue-900 text-center mb-8">
              Your Journey Timeline
            </h3>
            
            <div className="flex items-center justify-center gap-4">
              {['💳', '⚡', '💰', '🎉'].map((emoji, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border-2 border-neutral-200"
                  >
                    {emoji}
                  </motion.div>
                  
                  {index < 3 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      className="w-12 h-1 bg-blue-200 rounded origin-left"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-6 text-center">
              <div className="text-sm text-neutral-600">Order</div>
              <div className="text-sm text-neutral-600">Setup</div>
              <div className="text-sm text-neutral-600">Fund</div>
              <div className="text-sm text-neutral-600">Spend</div>
            </div>
          </div>
        </motion.div>

        {/* Clean Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-blue-800 text-white rounded-2xl p-8">
            <h3 className="text-3xl font-bold mb-8">
              Why Choose Walle?
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-black mb-2">10min</div>
                <div className="text-blue-200 text-sm">Total Setup</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black mb-2">50M+</div>
                <div className="text-blue-200 text-sm">Merchants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black mb-2">200+</div>
                <div className="text-blue-200 text-sm">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black mb-2">24/7</div>
                <div className="text-blue-200 text-sm">Support</div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}