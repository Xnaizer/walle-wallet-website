// components/Shop/ProductCard.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";
import { CardColor } from "./ShopContext";
import Image from "next/image";

interface ProductCardProps {
  card: CardColor;
  isSelected: boolean;
  onSelect: () => void;
}

export default function ProductCard({ card, isSelected, onSelect }: ProductCardProps) {
  return (
    <motion.div
      className={`relative cursor-pointer group ${
        isSelected 
          ? 'ring-4 ring-primary-500 ring-offset-2' 
          : 'hover:ring-2 hover:ring-primary-300 hover:ring-offset-2'
      }`}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
        {/* Card Preview */}
        <div className="relative h-48 bg-gradient-to-br overflow-hidden" style={{
          background: `linear-gradient(135deg, ${card.color}00 0%, ${card.color} 100%)`
        }}>
          <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-90`}></div>
          
          {/* Mock Card Design */}
          <div className="relative h-full flex items-center justify-center p-6">
            <div className="w-full max-w-[200px] aspect-[1.586/1] bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-2xl">
              <div className="h-full flex flex-col justify-between p-4">
                <div className="flex justify-between items-start">
                  <div className="text-white/90 text-xs font-mono">WALLE</div>
                  <div className="w-8 h-5 bg-white/20 rounded"></div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-white/60 text-xs">•••• •••• •••• 1234</div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-white/60 text-xs">EXPIRES</div>
                      <div className="text-white text-xs font-mono">12/28</div>
                    </div>
                    <div className="w-6 h-4 bg-white/30 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Selected Indicator */}
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <CheckIcon className="w-5 h-5 text-primary-600" />
            </motion.div>
          )}
        </div>
        
        {/* Card Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{card.name}</h3>
            <div className="flex items-center gap-2">
              {card.price > 30 && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                  Premium
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-sm">NFC-enabled crypto card</p>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">${card.price}</div>
              <div className="text-sm text-gray-500">per card</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}