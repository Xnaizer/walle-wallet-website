// components/Dashboard/WalletConnectPrompt.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { WalletIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import WalleLogo from "../../../../public/walle_logo.png";

export default function WalletConnectPrompt() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-xl w-full text-center space-y-8">
        <h1 className="mb-4 text-5xl">Welcome To Walle Dashboard</h1>
        <p className="mb-32 text-lg text-slate-600">&quot;Your Everyday Payment Card & Wallet&quot;</p>
        {/* Illustration Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Background circle - bigger to accommodate larger logo */}
          <div className="w-72 h-72 mx-auto bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center relative">
            {/* Slow rotating border - outermost */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-3 border-2 border-dashed border-primary-200/60 rounded-full"
            />
            
            {/* Medium rotating border */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-6 border-2 border-dashed border-secondary-300/50 rounded-full"
            />
            
            {/* Inner rotating border */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute inset-14 border border-dashed border-primary-300/40 rounded-full"
            />
            
            {/* Logo - Much bigger */}
            <div className="w-40 h-40 bg-white rounded-3xl shadow-xl flex items-center justify-center relative z-10 border border-primary-100/50">
              <Image
                src={WalleLogo}
                alt="Walle Logo"
                width={100}
                height={80}
                className="object-contain"
                priority
              />
            </div>
            
            {/* Floating wallet icon */}
            <motion.div
              animate={{ 
                y: [-12, 12, -12],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 right-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-primary-100"
            >
              <WalletIcon className="w-6 h-6 text-primary-500" />
            </motion.div>
            
            {/* Floating decorative circle */}
            <motion.div
              animate={{ 
                y: [12, -12, 12],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 left-10 w-10 h-10 bg-secondary-400 rounded-full shadow-md"
            />
            
            {/* Additional small floating element */}
            <motion.div
              animate={{ 
                x: [-8, 8, -8],
                y: [8, -8, 8]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 left-14 w-5 h-5 bg-primary-400 rounded-full opacity-70"
            />
            
            {/* Another floating element */}
            <motion.div
              animate={{ 
                x: [8, -8, 8],
                y: [-6, 6, -6]
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 right-16 w-6 h-6 bg-secondary-300 rounded-full opacity-60"
            />
            
            {/* Extra floating elements for bigger circle */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-12 left-20 w-3 h-3 bg-primary-500 rounded-full opacity-50"
            />
            
            <motion.div
              animate={{ 
                y: [10, -10, 10],
                x: [5, -5, 5]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-14 right-8 w-4 h-4 bg-secondary-500 rounded-full opacity-40"
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 mb-32"
        >
          <div>
            <h3 className="text-3xl font-bold block bg-gradient-to-r from-primary-600 via-primary-700 to-blue-800 bg-clip-text text-transparent mb-3">
              Let&apos;s Get Started! 
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Connect your wallet to unlock the full Walle experience
            </p>
          </div>

          {/* Status */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="text-amber-800 font-medium mb-2">⏳ Waiting for connection...</p>
            <p className="text-amber-700 text-sm leading-relaxed">
              Look for the &quot;Connect Wallet&quot; button above
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}