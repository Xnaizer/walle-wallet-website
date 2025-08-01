// Navbar.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  CreditCardIcon,
  Bars3Icon, 
  XMarkIcon, 
} from "@heroicons/react/24/outline";
import MagneticButton from "./utils/MagneticButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { scrollYProgress } = useScroll();
  
  // Motion values for navbar effects
  const navbarOpacity = useTransform(scrollYProgress, [0, 0.1], [0.9, 0.97]);
  const navbarBlur = useTransform(scrollYProgress, [0, 0.1], [8, 16]);
  const navbarShadow = useTransform(
    scrollYProgress, 
    [0, 0.1], 
    ["0 4px 20px rgba(0, 0, 0, 0)", "0 4px 20px rgba(0, 0, 0, 0.05)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "FAQs", href: "#faqs" },
  ];

  return (
    <>
      <motion.nav
        className="fixed w-full z-50 top-0"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="px-4 py-3 mx-4 md:mx-8 mt-4 rounded-xl"
          style={{ 
            backdropFilter: `blur(${navbarBlur}px)`,
            WebkitBackdropFilter: `blur(${navbarBlur}px)`,
            backgroundColor: `rgba(255, 255, 255, ${navbarOpacity})`,
            boxShadow: navbarShadow,
            borderBottom: scrolled ? "1px solid rgba(33, 150, 243, 0.1)" : "1px solid transparent ",
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center shadow-sm"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <CreditCardIcon className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold gradient-text">Walle Wallet</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-2 text-neutral-700 hover:text-primary-700 font-medium rounded-md transition-colors duration-200"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {link.name}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="ml-4"
              >
                <MagneticButton variant="primary" size="sm">
                  Get Started
                </MagneticButton>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-neutral-700 hover:text-primary-700 rounded-md focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

{/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/10 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              className="absolute top-20 inset-x-4 glass-card p-5 rounded-xl"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="px-4 py-3 text-neutral-700 hover:text-primary-700 font-medium rounded-lg hover:bg-primary-50/50 transition-colors duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.div 
                  className="pt-4 mt-2 border-t border-neutral-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <MagneticButton variant="primary" className="w-full justify-center">
                    Get Started
                  </MagneticButton>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}