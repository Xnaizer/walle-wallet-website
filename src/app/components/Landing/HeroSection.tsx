// HeroSection.tsx
"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import HeroLeftContent from "./HeroLeftContent";
import HeroRightContent from "./HeroRightContent";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isCardNearTarget, setIsCardNearTarget] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const controls = useAnimation();
  
  // Enhanced mouse tracking with useCallback
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Initial load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      controls.start("visible");
    }, 100);
    return () => clearTimeout(timer);
  }, [controls]);

  // Scroll handler with useCallback
  const handleScrollClick = useCallback(() => {
    window.scrollTo({ 
      top: window.innerHeight, 
      behavior: 'smooth' 
    });
  }, []);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { 
      opacity: 0 
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 bg-white">
      {/* Payment Success Overlay */}
      {showPaymentSuccess && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-2xl border border-primary-200 text-center max-w-sm mx-4"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
            >
              <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Walle World!</h2>
            <p className="text-neutral-600 mb-4">Your Everyday Payment Card and Wallet</p>
            <div className="flex items-center justify-center gap-2 text-sm text-green-600">
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span>Welcome To Walle</span>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Mouse tracking subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ 
          background: `radial-gradient(circle 300px at ${(mousePosition.x + 1) * 50}% ${(mousePosition.y + 1) * 50}%, rgba(33, 150, 243, 0.1) 0%, transparent 50%)`,
        }}
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-6  items-center w-full"
        >
          {/* Left Content */}
          <HeroLeftContent itemVariants={itemVariants} />

          {/* Right Content */}
          <HeroRightContent 
            itemVariants={itemVariants}
            cardPosition={cardPosition}
            setCardPosition={setCardPosition}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            isCardNearTarget={isCardNearTarget}
            setIsCardNearTarget={setIsCardNearTarget}
            setShowPaymentSuccess={setShowPaymentSuccess}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.button
          className="flex flex-col items-center gap-2 text-neutral-500 hover:text-primary-600 transition-colors cursor-pointer group"
          whileHover={{ y: -2 }}
          onClick={handleScrollClick}
        >
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center relative">
            <motion.div
              className="w-1 h-3 bg-neutral-600 rounded-full mt-2"
              animate={{ 
                y: [0, 10, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Scroll
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}