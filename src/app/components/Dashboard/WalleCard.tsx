// components/Dashboard/WalleCard.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { WalletCard } from "./DashboardContext";
import { CreditCardIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface WalleCardProps {
  card: WalletCard;
  showBalance?: boolean;
}

export default function WalleCard({ card, showBalance = true }: WalleCardProps) {
  const [isBalanceVisible, setIsBalanceVisible] = React.useState(false);

  const totalBalance = card.balance.idr + card.balance.usdt + card.balance.usdc + card.balance.idrx + card.balance.idrt;

  return (
    <motion.div
      className="relative w-80 h-48 rounded-2xl overflow-hidden shadow-xl cursor-pointer"
      whileHover={{ y: -5, rotateY: 5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card Background */}
      <div className="absolute inset-0 bg-walle-card"></div>
      
      {/* Card Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 right-4 w-20 h-20 border border-white/30 rounded-full"></div>
        <div className="absolute top-8 right-8 w-12 h-12 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 border border-white/10 rounded-full"></div>
      </div>

      {/* Card Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <div className="text-white/80 text-sm font-medium mb-1">Walle Card</div>
            <div className="text-lg font-bold">{card.name}</div>
          </div>
          <div className="flex items-center gap-2">
            <CreditCardIcon className="w-6 h-6 text-white/80" />
            <div className={`w-3 h-3 rounded-full ${card.isActive ? 'bg-green-400' : 'bg-red-400'}`}></div>
          </div>
        </div>

        {/* Card Number */}
        <div className="my-4">
          <div className="text-xl font-mono font-bold tracking-wider">
            {card.cardNumber}
          </div>
          <div className="text-white/60 text-sm mt-1">
            Expires: {card.expiryDate}
          </div>
        </div>

        {/* Balance */}
        {showBalance && (
          <div className="flex justify-between items-end">
            <div>
              <div className="text-white/80 text-sm mb-1">Total Balance</div>
              <div className="flex items-center gap-2">
                {isBalanceVisible ? (
                  <span className="text-2xl font-bold">
                    {totalBalance.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                    })}
                  </span>
                ) : (
                  <span className="text-2xl font-bold">••••••</span>
                )}
                <button
                  onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {isBalanceVisible ? (
                    <EyeSlashIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/60 text-xs">ID</div>
              <div className="text-sm font-mono">{card.id.slice(-6).toUpperCase()}</div>
            </div>
          </div>
        )}

        {/* Status Indicator */}
        <div className="absolute top-6 right-6">
          <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
            card.isActive 
              ? 'bg-green-500/20 text-green-200 border border-green-400/30' 
              : 'bg-red-500/20 text-red-200 border border-red-400/30'
          }`}>
            {card.isActive ? 'Active' : 'Inactive'}
          </div>
        </div>
      </div>
    </motion.div>
  );
}