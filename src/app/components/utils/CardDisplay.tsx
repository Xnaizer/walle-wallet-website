// CardDisplay.tsx
"use client";
import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CardDisplay() {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for card rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Optimized spring values
  const rotateX = useSpring(useTransform(y, [-100, 100], [6, -6]), { 
    stiffness: 200, 
    damping: 25 
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-6, 6]), { 
    stiffness: 200, 
    damping: 25 
  });
  
  // Enhanced lighting effect
  const lightX = useTransform(x, [-100, 100], [30, 70]);
  const lightY = useTransform(y, [-100, 100], [30, 70]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = (e.clientX - centerX) * 0.3;
    const mouseY = (e.clientY - centerY) * 0.3;
    
    x.set(mouseX);
    y.set(mouseY);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    setIsActive(false);
  };

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[320px] mx-auto select-none">
      {/* Ambient glow - NO BLUR */}
      <motion.div
        className="absolute -inset-3 rounded-3xl -z-10"
        animate={{ 
          opacity: isHovered || isActive ? 0.6 : 0.3,
          scale: isHovered ? 1.05 : 1,
        }}
        style={{
          background: isHovered || isActive
            ? "radial-gradient(ellipse at center, rgba(33, 150, 243, 0.2) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)"
            : "radial-gradient(ellipse at center, rgba(33, 150, 243, 0.1) 0%, transparent 70%)",
          // REMOVED blur-xl - NO BLUR!
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Card container with 3D perspective */}
      <motion.div
        ref={cardRef}
        className="relative w-full  z-10"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        animate={{ 
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Main card - CRISP */}
        <motion.div 
          className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 30%, #2563eb 60%, #3b82f6 100%)",
            boxShadow: "0 10px 30px rgba(30, 58, 138, 0.3), 0 4px 8px rgba(0,0,0,0.1)",
          }}
          animate={{
            boxShadow: isHovered 
              ? "0 20px 50px rgba(30, 58, 138, 0.4), 0 8px 16px rgba(0,0,0,0.15)"
              : "0 10px 30px rgba(30, 58, 138, 0.3), 0 4px 8px rgba(0,0,0,0.1)"
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Card content */}
          <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between text-white">
            {/* Header */}
            <div className="flex justify-between items-start">
              <motion.div
                animate={{ y: isActive ? -1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-base sm:text-lg font-bold tracking-tight">
                  Walle Card
                </h3>
                <p className="text-xs text-white/70 font-medium mt-0.5">
                  Digital Payments
                </p>
              </motion.div>
              
              {/* NFC symbol */}
              <motion.div
                className="w-8 h-8 sm:w-9 sm:h-9 relative"
                animate={{ 
                  rotate: isHovered ? 10 : 0,
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full border-2 border-white/30 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 border border-white/50 rounded-full" />
                </div>
                
                {/* NFC waves - simplified */}
                {(isHovered || isActive) && (
                  <motion.div
                    className="absolute inset-0 border border-white/20 rounded-full"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ 
                      scale: [1, 1.8],
                      opacity: [0.6, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                )}
              </motion.div>
            </div>
            
            {/* Card bottom section */}
            <div className="space-y-3">
              {/* Chip and valid thru */}
              <div className="flex items-end justify-between">
                <motion.div
                  className="w-8 h-6 sm:w-9 sm:h-6 rounded-md overflow-hidden relative bg-gradient-to-br from-yellow-400 to-amber-500"
                  whileHover={{ scale: 1.02 }}
                  animate={{ 
                    rotateY: isActive ? 8 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-600/20 to-transparent" />
                  <div className="absolute inset-1 border border-amber-600/15 rounded-sm" />
                </motion.div>
                
                <motion.div 
                  className="text-right"
                  animate={{ opacity: isActive ? 1 : 0.9 }}
                >
                  <div className="text-xs text-white/50 mb-0.5">EXPIRES</div>
                  <div className="text-white font-semibold text-sm">12/28</div>
                </motion.div>
              </div>
              
              {/* Card number */}
              <motion.div 
                className="font-mono tracking-wider text-sm sm:text-base font-medium"
                animate={{ 
                  letterSpacing: isHovered ? "0.18em" : "0.15em",
                  scale: isActive ? 1.01 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                •••• •••• •••• 5678
              </motion.div>
              
              {/* Cardholder name */}
              <motion.div 
                className="text-xs sm:text-sm font-medium text-white/80"
                animate={{ opacity: isActive ? 1 : 0.8 }}
              >
                WALLE USER
              </motion.div>
            </div>
          </div>

          {/* Dynamic lighting overlay - NO BLUR */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, transparent 70%)`,
              opacity: isHovered ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Card surface pattern - NO BLUR */}
          <div className="absolute inset-0 opacity-3 pointer-events-none">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 25%),
                  radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 25%)
                `,
                backgroundSize: '40px 40px'
              }}
            />
          </div>
          
          {/* Shimmer effect - NO BLUR */}
          <motion.div 
            className="absolute inset-0 overflow-hidden pointer-events-none"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute top-0 left-[-50%] w-1/4 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"
              animate={{ 
                left: isHovered ? "150%" : "-50%" 
              }}
              transition={{ 
                duration: 1.5,
                ease: "easeInOut",
                repeat: isHovered ? Infinity : 0,
                repeatDelay: 3
              }}
            />
          </motion.div>

          {/* Brand logo area */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
            <motion.div
              className="text-white/60 text-xs font-bold tracking-wider"
              animate={{ opacity: isHovered ? 1 : 0.6 }}
            >
              WALLE
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Payment ready indicator */}
      <motion.div
        className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 pointer-events-none z-20"
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={{ 
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 8,
          scale: isActive ? 1 : 0.95
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      >
        <div className="bg-green-500 text-white px-3 py-1.5 rounded-lg font-medium text-xs shadow-lg flex items-center gap-1.5">
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-xs"
          >
            ✓
          </motion.span>
          <span>Ready to Pay</span>
        </div>
      </motion.div>
      
      {/* Floating particles - NO BLUR */}
      {isActive && Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-blue-400/70 pointer-events-none z-10"
          initial={{
            x: "50%",
            y: "50%",
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: (Math.random() - 0.5) * 160,
            y: (Math.random() - 0.5) * 160 - 30,
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.15,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}