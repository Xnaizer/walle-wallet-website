// components/Dashboard/WalletConnectPrompt.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { WalletIcon, ShieldCheckIcon, CreditCardIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export default function WalletConnectPrompt() {
  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Secure Connection",
      description: "Your wallet connection is encrypted and secure"
    },
    {
      icon: CreditCardIcon,
      title: "Card Management",
      description: "Generate and manage multiple Walle cards"
    },
    {
      icon: LockClosedIcon,
      title: "PIN Protection",
      description: "Additional security layer with PIN authentication"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-24 h-24 bg-walle-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <WalletIcon className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-walle-dark-blue mb-4">
            Welcome to Walle Dashboard
          </h1>
          
          <p className="text-xl text-walle-ocean-blue mb-8 max-w-2xl mx-auto">
            Connect your wallet to start managing your Walle cards and transactions
          </p>
          
          <div className="bg-walle-bright-yellow/20 border border-walle-gold-yellow rounded-2xl p-6 max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-2 text-walle-dark-blue">
              <WalletIcon className="w-6 h-6" />
              <span className="font-semibold">Click &quot;Connect Wallet&quot; in the navigation bar to continue</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-walle-pale-cyan hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-walle-soft rounded-xl flex items-center justify-center mb-4 mx-auto">
                <feature.icon className="w-6 h-6 text-walle-royal-blue" />
              </div>
              <h3 className="text-lg font-semibold text-walle-dark-blue mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-walle-ocean-blue text-center text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}