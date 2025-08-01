// components/Dashboard/WalleCard.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { WalletCard } from "./DashboardContext";
import { 
  EyeIcon, 
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

interface WalleCardProps {
  card: WalletCard;
  showBalance?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function WalleCard({ 
  card, 
  showBalance = true, 
  isSelected = false,
  onClick 
}: WalleCardProps) {
  const [isBalanceVisible, setIsBalanceVisible] = React.useState(true);

  // Calculate total balance in IDR equivalent
  const totalBalance = card.balance.idr + 
    (card.balance.usdt * 15000) + 
    (card.balance.usdc * 15000) + 
    card.balance.idrx + 
    card.balance.idrt;

  // Get card brand colors
  const getCardGradient = (cardName: string) => {
    if (cardName.toLowerCase().includes('main') || cardName.toLowerCase().includes('primary')) {
      return 'from-blue-600 via-purple-600 to-blue-700';
    } else if (cardName.toLowerCase().includes('saving')) {
      return 'from-green-500 via-teal-600 to-green-700';
    } else if (cardName.toLowerCase().includes('travel')) {
      return 'from-orange-500 via-red-500 to-pink-600';
    } else {
      return 'from-indigo-600 via-purple-600 to-indigo-700';
    }
  };

  return (
    <motion.div
      className={`relative w-80 h-48 rounded-2xl overflow-hidden cursor-pointer group ${
        isSelected ? 'ring-2 ring-primary-400' : ''
      }`}
      whileHover={{ 
        y: -4, 
        scale: 1.01
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        duration: 0.2,
        ease: "easeOut"
      }}
      onClick={onClick}
    >
      {/* Card Background with Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCardGradient(card.name)} shadow-xl`}></div>
      
      {/* Simple Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-6 -right-6 w-24 h-24 border border-white/30 rounded-full"></div>
        <div className="absolute bottom-6 left-6 w-8 h-8 border border-white/20 rounded-full"></div>
      </div>

      {/* Card Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
        
        {/* Header - Minimal */}
        <div className="flex justify-between items-start">
          <div>
            <div className="text-white/80 text-sm font-medium">WALLE</div>
            <div className="text-xl font-bold text-white mt-1">
              {card.name}
            </div>
          </div>
          
          {/* Simple Status */}
          <div className={`w-3 h-3 rounded-full ${
            card.isActive ? 'bg-green-400' : 'bg-red-400'
          }`}></div>
        </div>

        {/* Card Number */}
        <div className="flex-1 flex items-center">
          <div>
            <div className="text-lg font-mono font-bold text-white mb-2">
              {card.cardNumber}
            </div>
            <div className="text-white/70 text-sm">
              {card.expiryDate}
            </div>
          </div>
        </div>

        {/* Balance Section */}
        {showBalance && (
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-white">
                  {isBalanceVisible ? (
                    `Rp ${(totalBalance / 1000000).toFixed(1)}M`
                  ) : (
                    'Rp ••••••'
                  )}
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsBalanceVisible(!isBalanceVisible);
                  }}
                  className="text-white/60 hover:text-white transition-colors p-1"
                >
                  {isBalanceVisible ? (
                    <EyeSlashIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Simple Logo */}
            <div className="text-white/60 text-sm font-bold">
              WALLE
            </div>
          </div>
        )}
      </div>

      {/* Selection Ring */}
      {isSelected && (
        <div className="absolute inset-0 border-2 border-primary-400 rounded-2xl pointer-events-none" />
      )}
    </motion.div>
  );
}