"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheckIcon,
  BoltIcon,
  GlobeAltIcon,
  CreditCardIcon,
  CheckCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

interface Feature {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  benefits: string[];
  number: string;
}

export default function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

  const features: Feature[] = [
    {
      number: "01",
      title: "Tap & Go",
      subtitle: "No Apps, No Hassle",
      description: "Your crypto becomes as easy to spend as cash. Just tap your card at millions of locations worldwide.",
      icon: <CreditCardIcon className="w-8 h-8" />,
      color: "blue",
      benefits: ["Works at 50M+ merchants", "No smartphone needed", "Instant card delivery"]
    },
    {
      number: "02", 
      title: "Fort Knox Security",
      subtitle: "Military-Grade Protection",
      description: "Your funds are protected by the same security used by banks and governments. Sleep peacefully.",
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      color: "primary",
      benefits: ["Biometric authentication", "Real-time fraud detection", "Insurance coverage"]
    },
    {
      number: "03",
      title: "Lightning Speed",
      subtitle: "Faster Than Cash",
      description: "Transactions settle in under 3 seconds. Say goodbye to waiting for payments to clear.",
      icon: <BoltIcon className="w-8 h-8" />,
      color: "secondary",
      benefits: ["Sub-3 second settlement", "0.1% transaction fee", "99.99% uptime guaranteed"]
    },
    {
      number: "04",
      title: "Borderless Money",
      subtitle: "One Card, Everywhere",
      description: "Travel the world with one card. No foreign exchange fees, no currency conversion headaches.",
      icon: <GlobeAltIcon className="w-8 h-8" />,
      color: "blue",
      benefits: ["200+ countries supported", "0% foreign exchange fees", "Auto currency conversion"]
    },
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Large Circle */}
        <div className="absolute top-20 right-[-20%] w-[600px] h-[600px] bg-blue-50 rounded-full opacity-30" />
        {/* Small Dots */}
        <div className="absolute top-40 left-20 w-4 h-4 bg-secondary-400 rounded-full" />
        <div className="absolute bottom-40 right-40 w-6 h-6 bg-primary-400 rounded-full" />
        <div className="absolute top-60 left-[60%] w-3 h-3 bg-accent-400 rounded-full" />
        {/* Lines */}
        <div className="absolute top-32 left-0 w-32 h-0.5 bg-neutral-200 transform rotate-45" />
        <div className="absolute bottom-32 right-20 w-24 h-0.5 bg-neutral-200 transform -rotate-45" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Creative Header */}
        <div className="text-center mb-24">
        
          <h2 className="text-7xl font-black text-blue-900 mb-6 leading-none tracking-tight">
            Walle
            <br />
            <span className="text-5xl text-neutral-400">Makes Crypto</span>
            <br />
            <span className="text-secondary-500">Simple</span>
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-2xl text-neutral-600 font-medium leading-relaxed">
              The first crypto card that feels like <em>magic</em> but works like <strong>money</strong>
            </p>
          </div>
        </div>



        {/* Creative Features Layout */}
        <div className="space-y-16">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0;
            const colorClasses = {
              blue: "bg-blue-500 text-white",
              primary: "bg-primary-500 text-white", 
              secondary: "bg-secondary-500 text-blue-900",
              accent: "bg-accent-500 text-white"
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
              >
                {/* Number & Icon Side */}
                <div className="lg:w-1/2 flex justify-center">
                  <div className="relative">
                    {/* Big Number Background */}
                    <div className="text-[12rem] font-black text-neutral-100 leading-none select-none">
                      {feature.number}
                    </div>
                    
                    {/* Icon Overlay */}
                    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center shadow-2xl`}>
                      {feature.icon}
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:w-1/2 text-center lg:text-left">
                  <div className="mb-6">
                    <h3 className="text-4xl font-black text-blue-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xl font-semibold text-neutral-500">
                      {feature.subtitle}
                    </p>
                  </div>
                  
                  <p className="text-xl text-neutral-700 leading-relaxed mb-8">
                    {feature.description}
                  </p>

                  {/* Benefits with custom styling */}
                  <div className="space-y-4">
                    {feature.benefits.map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.2 + idx * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircleIcon className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-lg font-medium text-neutral-800">
                          {benefit}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>



      </div>
    </section>
  );
}