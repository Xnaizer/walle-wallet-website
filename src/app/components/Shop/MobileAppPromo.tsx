// components/Shop/MobileAppPromo.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { DevicePhoneMobileIcon, QrCodeIcon, StarIcon } from "@heroicons/react/24/outline";
import { AppleIcon, GooglePlayIcon } from "../Icons/StoreIcons";
import Image from "next/image";

export default function MobileAppPromo() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl shadow-xl p-8 text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white rounded-full"></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <DevicePhoneMobileIcon className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold">Get the Walle App</h2>
            </div>
            
            <p className="text-white/90 text-lg mb-6">
              Maximize your crypto card experience with our mobile app. Manage transactions, 
              track spending, and control your card settings on the go.
            </p>

            {/* Features List */}
            <div className="space-y-3 mb-8">
              {[
                "Real-time transaction notifications",
                "Card freeze/unfreeze controls",
                "Crypto portfolio tracking",
                "Instant top-up functionality",
                "24/7 customer support chat"
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="flex items-center gap-3"
                >
                  <StarIcon className="w-5 h-5 text-yellow-300" />
                  <span className="text-white/90">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:bg-gray-900"
              >
                <AppleIcon className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:bg-gray-900"
              >
                <GooglePlayIcon className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative">
            {/* Phone Frame */}
            <div className="w-64 h-[520px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                {/* Status Bar */}
                <div className="h-6 bg-gray-900 flex items-center justify-center">
                  <div className="w-16 h-1 bg-white rounded-full"></div>
                </div>
                
                {/* App Content */}
                <div className="p-6 bg-gradient-to-b from-purple-50 to-blue-50 h-full">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <DevicePhoneMobileIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Walle Wallet</h3>
                  </div>
                  
                  {/* Mock UI Elements */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-6 bg-gradient-to-r from-gray-800 to-gray-600 rounded"></div>
                          <div>
                            <div className="w-16 h-2 bg-gray-200 rounded mb-1"></div>
                            <div className="w-12 h-2 bg-gray-100 rounded"></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="w-12 h-3 bg-green-200 rounded mb-1"></div>
                          <div className="w-8 h-2 bg-gray-100 rounded"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <div className="w-6 h-6 bg-blue-100 rounded-lg mb-2"></div>
                        <div className="w-12 h-2 bg-gray-200 rounded"></div>
                      </div>
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <div className="w-6 h-6 bg-purple-100 rounded-lg mb-2"></div>
                        <div className="w-12 h-2 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* QR Code Floating */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -top-4 -right-4 bg-white p-3 rounded-2xl shadow-lg"
            >
              <QrCodeIcon className="w-8 h-8 text-gray-700" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}