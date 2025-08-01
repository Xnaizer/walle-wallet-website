// ParallaxSection.tsx
"use client";
import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  springConfig?: { stiffness: number; damping: number };
  threshold?: number;
}

export default function ParallaxSection({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = "",
  springConfig = { stiffness: 50, damping: 30 },
  threshold = 0.1
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewRef, inView] = useInView({
    threshold,
    triggerOnce: false,
  });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Create all transforms at the top level
  const transformUp = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const transformDown = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);
  const transformLeft = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const transformRight = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);
  
  // Select the appropriate transform based on direction
  const selectedTransform = useMemo(() => {
    switch (direction) {
      case 'up':
        return transformUp;
      case 'down':
        return transformDown;
      case 'left':
        return transformLeft;
      case 'right':
        return transformRight;
      default:
        return transformUp;
    }
  }, [direction, transformUp, transformDown, transformLeft, transformRight]);
  
  // Apply spring for smoother motion
  const springTransform = useSpring(selectedTransform, springConfig);
  
  // Determine which axis to animate
  const isHorizontal = direction === 'left' || direction === 'right';
  
  return (
    <motion.div
      ref={(el) => {
        // Combine refs
        containerRef.current = el as HTMLDivElement;
        inViewRef(el);
      }}
      className={`parallax-container ${className}`}
      style={{ 
        [isHorizontal ? 'x' : 'y']: springTransform,
        opacity: inView ? 1 : 0.5
      }}
      transition={{ opacity: { duration: 0.5 } }}
    >
      {children}
    </motion.div>
  );
}