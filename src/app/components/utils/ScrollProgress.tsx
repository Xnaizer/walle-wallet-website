// ScrollProgress.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", latest => {
      setIsScrolled(latest > 0.01);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
      style={{ 
        scaleX,
        background: "linear-gradient(90deg, var(--primary-600), var(--primary-700) 50%, var(--secondary-500) 100%)",
        opacity: isScrolled ? 1 : 0
      }}
      transition={{ opacity: { duration: 0.3 } }}
    />
  );
}