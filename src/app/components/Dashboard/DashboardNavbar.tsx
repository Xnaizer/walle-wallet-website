// components/Dashboard/DashboardNavbar.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  HomeIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  WalletIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDashboard } from "./DashboardContext";
import Image from "next/image";
import WalleLogo from "../../../../public/walle_logo.png";

export default function DashboardNavbar() {
  const { state, dispatch } = useDashboard();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
      "0 4px 20px rgba(17, 41, 107, 0)",
      "0 8px 32px rgba(17, 41, 107, 0.08)",
      "0 16px 48px rgba(17, 41, 107, 0.12)",
    ]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    {
      id: 'overview',
      name: 'Overview',
      icon: HomeIcon,
      section: 'overview' as const,
    },
    {
      id: 'cards',
      name: 'Cards',
      icon: CreditCardIcon,
      section: 'cards' as const,
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Cog6ToothIcon,
      section: 'settings' as const,
    },
  ];

  const handleConnectWallet = () => {
    // Simulate wallet connection
    const mockAddress = "0x1234567890abcdef1234567890abcdef12345678";
    const hasPin = Math.random() > 0.5; // Random for demo
    const isFirstTime = Math.random() > 0.5; // Random for demo
    
    dispatch({
      type: 'CONNECT_WALLET',
      payload: { address: mockAddress, hasPin, isFirstTime }
    });
  };

  const handleDisconnectWallet = () => {
    dispatch({ type: 'DISCONNECT_WALLET' });
    setShowProfileMenu(false);
    setIsOpen(false);
  };

  const handleSectionChange = (section: 'overview' | 'cards' | 'settings') => {
    dispatch({ type: 'SET_SECTION', payload: section });
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
                onClick={() => window.location.href = '/'}
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
                {navigationItems.map((item, index) => {
                  const isActive = state.currentSection === item.section;
                  return (
                    <motion.button
                      key={item.id}
                      className={`relative px-4 py-2.5 font-semibold rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-2 ${
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
                      onClick={() => handleSectionChange(item.section)}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
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
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-3">
                {!state.isWalletConnected ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <motion.button
                      onClick={handleConnectWallet}
                      className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <WalletIcon className="w-5 h-5" />
                      <span className="hidden sm:inline">Connect Wallet</span>
                    </motion.button>
                  </motion.div>
                ) : (
                  <div className="hidden lg:flex items-center gap-3">
                    {/* Profile Menu */}
                    <div className="relative">
                      <motion.button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                          scrolled
                            ? 'bg-white/90 border-primary-200/50 hover:bg-primary-50 shadow-sm'
                            : 'bg-white/20 border-white/30 hover:bg-white/30'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        {/* Profile Avatar */}
                        <div className="w-9 h-9 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center shadow-lg">
                          <UserIcon className="w-5 h-5 text-white" />
                        </div>
                        
                        <div className="text-left">
                          <div className="text-sm font-semibold text-neutral-700">
                            {state.user.name}
                          </div>
                          <div className="text-xs text-neutral-500">
                            Connected
                          </div>
                        </div>
                        
                        <ChevronDownIcon className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${
                          showProfileMenu ? 'rotate-180' : ''
                        }`} />
                      </motion.button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {showProfileMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-primary-200/30 overflow-hidden z-50"
                          >
                            {/* Profile Header */}
                            <div className="p-4 border-b border-neutral-200/50 bg-gradient-to-r from-primary-50 to-primary-100">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center shadow-lg">
                                  <UserIcon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <div className="text-base font-semibold text-neutral-800">
                                    {state.user.name}
                                  </div>
                                  <div className="text-sm text-neutral-600">
                                    Connected
                                  </div>
                                </div>
                              </div>
                              
                              <div className="text-sm font-medium text-neutral-700 mb-1">
                                Wallet Address
                              </div>
                              <div className="text-xs text-neutral-600 font-mono bg-white/60 rounded-lg px-3 py-2">
                                {state.walletAddress.slice(0, 10)}...{state.walletAddress.slice(-8)}
                              </div>
                            </div>
                            
                            {/* Logout Button */}
                            <button
                              onClick={handleDisconnectWallet}
                              className="w-full flex items-center justify-between px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-300 group"
                            >
                              <div className="flex items-center gap-3">
                                <UserIcon className="w-5 h-5" />
                                <span className="font-medium">Disconnect Wallet</span>
                              </div>
                              <ArrowRightOnRectangleIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

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
                      {state.isWalletConnected && (
                        <div className="text-right">
                          <div className="text-sm font-semibold text-neutral-700">Dashboard</div>
                          <div className="text-xs text-neutral-500">{state.user.name}</div>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Mobile Navigation */}
                  {state.isWalletConnected ? (
                    <div className="flex flex-col space-y-2 mb-6">
                      {navigationItems.map((item, index) => {
                        const isActive = state.currentSection === item.section;
                        return (
                          <motion.button
                            key={item.id}
                            className={`px-4 py-4 font-semibold rounded-2xl transition-all duration-300 flex items-center justify-between group text-left w-full ${
                              isActive
                                ? "text-primary-700 bg-primary-50"
                                : "text-neutral-700 hover:text-primary-700 hover:bg-primary-50/70"
                            }`}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            onClick={() => handleSectionChange(item.section)}
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="w-5 h-5" />
                              <span>{item.name}</span>
                            </div>
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
                  ) : (
                    <motion.button
                      onClick={handleConnectWallet}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <WalletIcon className="w-6 h-6" />
                      <span className="text-lg">Connect Wallet</span>
                    </motion.button>
                  )}

                  {/* Mobile Profile Section */}
                  {state.isWalletConnected && (
                    <motion.div
                      className="pt-4 border-t border-neutral-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      {/* Profile Info */}
                      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-4 mb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center shadow-lg">
                            <UserIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-base font-semibold text-neutral-800">
                              {state.user.name}
                            </div>
                            <div className="text-sm text-neutral-600">
                              Connected
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-sm font-medium text-neutral-700 mb-2">
                          Wallet Address
                        </div>
                        <div className="text-xs text-neutral-600 font-mono bg-white/70 rounded-lg px-3 py-2">
                          {state.walletAddress.slice(0, 10)}...{state.walletAddress.slice(-8)}
                        </div>
                      </div>
                      
                      {/* Logout Button */}
                      <button
                        onClick={handleDisconnectWallet}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-2xl transition-colors duration-300 border border-red-200"
                      >
                        <UserIcon className="w-5 h-5" />
                        <span className="font-medium">Disconnect Wallet</span>
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}