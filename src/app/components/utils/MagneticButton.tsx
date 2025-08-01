// MagneticButton.tsx
"use client";
import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export default function MagneticButton({ 
  children, 
  className = "", 
  onClick, 
  variant = 'primary',
  size = 'md',
  disabled = false
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(false);
  
  // Use springs for smoother animation
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });
  const scale = useSpring(1, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const magneticPull = 20; // How strong the magnetic effect is
    const moveX = (e.clientX - centerX) / magneticPull;
    const moveY = (e.clientY - centerY) / magneticPull;
    
    x.set(moveX);
    y.set(moveY);
    scale.set(1.05);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    x.set(0);
    y.set(0);
    scale.set(1);
    setActive(false);
  };
  
  const handleMouseDown = () => {
    if (disabled) return;
    setActive(true);
    scale.set(0.95);
  };
  
  const handleMouseUp = () => {
    if (disabled) return;
    setActive(false);
    scale.set(1.05);
  };

  // Button variant styles
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    glass: 'bg-white/10 backdrop-filter backdrop-blur-md border border-white/20 text-primary-700 hover:bg-white/20'
  };
  
  // Button size styles
  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-2.5 px-6 text-base',
    lg: 'py-3 px-8 text-lg'
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y, scale }}
      className={`${variants[variant]} ${sizes[size]} rounded-full font-medium relative overflow-hidden ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {/* Button content */}
      <motion.span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </motion.span>
      
      {/* Ripple effect */}
      {variant !== 'outline' && !disabled && (
        <motion.div
          className="absolute inset-0 bg-white/10 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: active ? 1 : 0,
            opacity: active ? 0.2 : 0
          }}
          transition={{ duration: 0.5 }}
        />
      )}
      
      {/* Gradient shine effect */}
      {variant === 'primary' && !disabled && (
        <motion.div
          className="absolute inset-0 opacity-0"
          style={{ 
            background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)",
            top: 0,
            left: "-100%",
            width: "200%",
            height: "100%",
          }}
          animate={{
            left: active ? ["0%", "100%"] : "-100%", 
            opacity: active ? [0, 0.5, 0] : 0
          }}
          transition={{
            duration: 0.6,
            times: [0, 0.5, 1]
          }}
        />
      )}
    </motion.button>
  );
}