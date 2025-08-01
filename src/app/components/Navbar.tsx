// Navbar.tsx
"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import MagneticButton from "./utils/MagneticButton";
import Image from "next/image";
import WalleLogo from "../../../public/walle_logo.png";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const { scrollYProgress } = useScroll();

  const navbarOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.2],
    [0.85, 0.95, 0.98]
  );
  const navbarBlur = useTransform(scrollYProgress, [0, 0.05, 0.2], [8, 20, 24]);
  const navbarShadow = useTransform(
    scrollYProgress,
    [0, 0.05, 0.2],
    [
      "0 4px 20px rgba(0, 0, 0, 0)",
      "0 8px 32px rgba(0, 0, 0, 0.08)",
      "0 16px 48px rgba(0, 0, 0, 0.12)",
    ]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = [
        "hero",
        "problem",
        "solution",
        "how-it-works",
        "features",
        "roadmap",
        "cta",
      ];
      const navbarHeight = 96; // Navbar height in pixels

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= navbarHeight && rect.bottom > navbarHeight) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Problem", href: "#problem" },
    { name: "Solution", href: "#solution" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Roadmap", href: "#roadmap" },
  ];

  // Enhanced smooth scroll function
  const smoothScrollTo = (elementId: string) => {
    const targetId = elementId.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const navbarHeight = 96; // Account for navbar height
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const targetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <div className="mx-auto w-full justify-center flex">
        <motion.nav
          className="fixed w-full z-50 top-0 container items-center mx-auto"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className={`px-6 py-4 mx-4 md:mx-8 mt-4 rounded-2xl border transition-all duration-500 ${
              scrolled ? "border-white/20" : "border-white/10"
            }`}
            style={{
              backdropFilter: `blur(${navbarBlur}px)`,
              WebkitBackdropFilter: `blur(${navbarBlur}px)`,
              backgroundColor: scrolled
                ? `rgba(255, 255, 255, 0.95)`
                : `rgba(255, 255, 255, ${navbarOpacity})`,
              boxShadow: navbarShadow,
            }}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.button
                className="flex items-center gap-4 focus:outline-none cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => smoothScrollTo("#hero")}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={WalleLogo}
                    alt="Walle Wallet Logo"
                    width={150}
                    height={100}
                    className="h-14 w-auto object-contain"
                    priority
                  />
                </motion.div>
              </motion.button>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.button
                      key={link.name}
                      className={`relative px-4 py-2.5 font-semibold rounded-xl transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "text-primary-700 bg-primary-50"
                          : scrolled
                          ? "text-neutral-700 hover:text-primary-700 hover:bg-primary-50/50"
                          : "text-neutral-600 hover:text-primary-600 hover:bg-white/20"
                      }`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      onClick={() => smoothScrollTo(link.href)}
                    >
                      {link.name}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full origin-center"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  );
                })}
                <Link href="/dashboard">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 0.8 }}
                  transition={{ delay: 0.8 }}
                  className="ml-6"
                >
                  <MagneticButton
                    variant="primary"
                    size="md"
                  >
                    Dashboard
                  </MagneticButton>
                </motion.div>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className={`lg:hidden p-2.5 rounded-xl focus:outline-none transition-colors duration-300 ${
                  scrolled
                    ? "text-neutral-700 hover:text-primary-700 hover:bg-primary-50/50"
                    : "text-neutral-600 hover:text-primary-600 hover:bg-white/20"
                }`}
                onClick={() => setIsOpen(!isOpen)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
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
              className="fixed inset-0 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                className="absolute top-24 inset-x-4 bg-white/95 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, y: -30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <div className="p-6">
                  {/* Mobile Logo */}
                  <motion.div
                    className="flex justify-center mb-6 pb-4 border-b border-neutral-200"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={WalleLogo}
                        alt="Walle Wallet Logo"
                        width={120}
                        height={30}
                        className="h-12 w-auto object-contain"
                      />
                    </div>
                  </motion.div>

                  <div className="flex flex-col space-y-2">
                    {navLinks.map((link, index) => {
                      const isActive =
                        activeSection === link.href.replace("#", "");
                      return (
                        <motion.button
                          key={link.name}
                          className={`px-4 py-4 font-semibold rounded-2xl transition-all duration-300 flex items-center justify-between group text-left w-full ${
                            isActive
                              ? "text-primary-700 bg-primary-50"
                              : "text-neutral-700 hover:text-primary-700 hover:bg-primary-50/70"
                          }`}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                          onClick={() => smoothScrollTo(link.href)}
                        >
                          <span>{link.name}</span>
                          <motion.span
                            className="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ x: -10 }}
                            whileHover={{ x: 0 }}
                          >
                            →
                          </motion.span>
                        </motion.button>
                      );
                    })}
                  </div>

                  <motion.div
                    className="pt-6 mt-6 border-t border-neutral-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Link href="/dashboard">
                    <MagneticButton
                      variant="primary"
                      className="w-full justify-center py-4 text-lg font-bold"
                      
                    >
                      Dashboard
                    </MagneticButton>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
