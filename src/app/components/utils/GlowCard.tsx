// GlowCard.tsx
"use client";
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: "primary" | "secondary" | "blue" | "none";
  hoverEffect?: "lift" | "rotate" | "none";
  onClick?: () => void;
}

export default function GlowCard({ 
  children, 
  className = "",
  gradient = "primary",
  hoverEffect = "lift",
  onClick
}: GlowCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0.5, y: 0.5 });
  };

  // Define gradient styles based on prop - NO BLUR
  const getGradientBackground = () => {
    switch (gradient) {
      case "primary":
        return `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
          rgba(33, 150, 243, 0.08) 0%, 
          rgba(33, 150, 243, 0.03) 40%, 
          transparent 70%)`;
      case "secondary":
        return `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
          rgba(255, 203, 5, 0.08) 0%, 
          rgba(255, 203, 5, 0.03) 40%, 
          transparent 70%)`;
      case "blue":
        return `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
          rgba(59, 130, 246, 0.08) 0%, 
          rgba(59, 130, 246, 0.03) 40%, 
          transparent 70%)`;
      case "none":
      default:
        return "transparent";
    }
  };

  // Define hover animations based on prop
  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case "lift":
        return { y: -6, scale: 1.01 };
      case "rotate":
        return { y: -4, rotateX: 3, rotateY: 2 };
      case "none":
        return {};
      default:
        return { y: -6 };
    }
  };

  return (
    <div className="relative group">
      {/* Background glow - NO BLUR */}
      {gradient !== "none" && (
        <motion.div
          className="absolute -inset-1 rounded-2xl -z-10"
          animate={{
            opacity: isHovered ? 0.4 : 0.2,
            scale: isHovered ? 1.02 : 1,
          }}
          style={{
            background: getGradientBackground(),
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Main card - CRISP */}
      <motion.div
        ref={cardRef}
        className={`relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden cursor-pointer ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={getHoverAnimation()}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25
        }}
        onClick={onClick}
      >
        {/* Inner content container */}
        <div className="relative z-10 p-6">
          {children}
        </div>

        {/* Mouse follow highlight - NO BLUR */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovered 
              ? `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
                  rgba(255, 255, 255, 0.1) 0%, 
                  rgba(255, 255, 255, 0.02) 40%, 
                  transparent 70%)`
              : "transparent",
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Border highlight on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            borderColor: isHovered 
              ? gradient === "primary" ? "rgba(33, 150, 243, 0.3)"
              : gradient === "secondary" ? "rgba(255, 203, 5, 0.3)"
              : gradient === "blue" ? "rgba(59, 130, 246, 0.3)"
              : "rgba(255, 255, 255, 0.3)"
              : "transparent"
          }}
          style={{ border: "1px solid" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
}