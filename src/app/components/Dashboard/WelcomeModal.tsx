// components/Dashboard/WelcomeModal.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { useDashboard } from "./DashboardContext";
import Image from "next/image";
import WalleLogo from "../../../../public/walle_logo.png";
// Import SVG sebagai static asset
import confettiSvg from "../../../../public/confettisvg.svg";

export default function WelcomeModal() {
  const { dispatch } = useDashboard();

  const handleDoLater = () => {
    dispatch({ type: 'CLOSE_WELCOME_MODAL' });
  };

  const handleGenerateNow = () => {
    dispatch({ type: 'CLOSE_WELCOME_MODAL' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full"
        style={{ aspectRatio: '16/9' }}
      >
        <div className="relative h-full flex flex-col">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-secondary-200/30 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-primary-200/30 to-transparent rounded-full blur-2xl"></div>
          
          <div className="relative z-10 h-full flex flex-col">
            {/* Top Section - 1/3 Height */}
            <div className="relative h-1/3 w-full overflow-hidden">
              {/* Confetti SVG Background - Full Width */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={confettiSvg}
                  alt="Confetti celebration"
                  fill
                  className="object-cover opacity-60"
                  priority
                />
              </motion.div>

              {/* Walle Logo - Centered on top of confetti */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <motion.div 
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
                >
                  <Image
                    src={WalleLogo}
                    alt="Walle Wallet Logo"
                    width={120}
                    height={80}
                    className="h-16 w-auto object-contain"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Content Section - 2/3 Height */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-8 pb-8">
              {/* Welcome Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-center mb-6 md:mb-8"
              >
                <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-500 bg-clip-text text-transparent mb-4 md:mb-6">
                  Welcome to Walle!
                </h1>
                
                <div className="text-base md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                  <p className="mb-2">
                    To start using Walle, you&apos;ll need to generate your own Walle Card.
                  </p>
                  <p className="text-primary-600 font-medium">
                    It&apos;s quick, secure, and completely free.
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-lg mx-auto w-full"
              >
                <motion.button
                  onClick={handleDoLater}
                  className="flex-1 px-6 md:px-8 py-3 md:py-4 border-2 border-neutral-300 text-neutral-700 rounded-2xl font-semibold hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-300 text-base md:text-lg cursor-pointer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Do it Later
                </motion.button>
                
                <motion.button
                  onClick={handleGenerateNow}
                  className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base md:text-lg cursor-pointer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Generate Now
                </motion.button>
              </motion.div>


            </div>
          </div>

          {/* Animated Background Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 md:w-2 md:h-2 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full opacity-20 md:opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-15, 15, -15],
                  x: [-8, 8, -8],
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}