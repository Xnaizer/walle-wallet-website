// HeroLeftContent.tsx
import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRightIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import MagneticButton from "../utils/MagneticButton";

interface HeroLeftContentProps {
  itemVariants: Variants;
}

const heroStats = [
  { 
    value: "$7T", 
    label: "Market Size",
    color: "from-primary-600 to-primary-800",
  },
  { 
    value: "0.1s", 
    label: "Transaction Time",
    color: "from-secondary-500 to-secondary-600",
  },
  { 
    value: "200+", 
    label: "Countries",
    color: "from-blue-700 to-primary-900",
  },
];

export default function HeroLeftContent({ itemVariants }: HeroLeftContentProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col text-center lg:text-left"
    >
      {/* Main Heading */}
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.9] text-neutral-900">
          <motion.span 
            className="block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Your Everyday
          </motion.span>
          <motion.span 
            className="block bg-gradient-to-r from-primary-600 via-primary-700 to-blue-800 bg-clip-text text-transparent my-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Payment Card
          </motion.span>
          <motion.span 
            className="block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            and Wallet
          </motion.span>
        </h1>
      </div>

      {/* Description */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-4">
          <span className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full font-semibold text-sm">
            Tap. Pay. Done.
          </span>
          <span className="inline-flex items-center px-4 py-2 bg-secondary-100 text-secondary-800 rounded-full font-semibold text-sm">
            Crypto Anywhere.
          </span>
        </div>
        <p className="text-lg lg:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-4">
          The revolutionary DApp bridging cryptocurrency and everyday payments through NFC-enabled cards with enterprise-grade security.
        </p>
        
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
      >
        <MagneticButton 
          variant="primary" 
          className="group bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span>Get Your Card</span>
          <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </MagneticButton>

        <MagneticButton 
          variant="outline" 
          className="group border-2 border-neutral-200 hover:border-primary-300 text-neutral-700 hover:text-primary-700 px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:bg-primary-50"
        >
          <PlayCircleIcon className="w-5 h-5" />
          <span>Watch Demo</span>
        </MagneticButton>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-3 gap-8 pt-8 border-t border-neutral-200"
      >
        {heroStats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center group cursor-pointer"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              transitionDelay: `${index * 0.1}s`,
            }}
          >
            <div className={`text-3xl lg:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
              {stat.value}
            </div>
            <div className="text-sm text-neutral-500 font-medium group-hover:text-neutral-700 transition-colors">
              {stat.label}
            </div>
            <div className="h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 mt-2 w-0 group-hover:w-full transition-all duration-300"></div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}