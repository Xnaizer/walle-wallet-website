// components/Shop/CardSelector.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useShop, CardColor } from "./ShopContext";
import ProductCard from "./ProductCard";

const cardOptions: CardColor[] = [
  {
    id: "midnight-black",
    name: "Midnight Black",
    color: "#1a1a1a",
    gradient: "from-gray-900 to-black",
    price: 29.99,
    image: "/cards/card-black.png"
  },
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    color: "#1e40af",
    gradient: "from-blue-600 to-blue-800",
    price: 29.99,
    image: "/cards/card-blue.png"
  },
  {
    id: "emerald-green",
    name: "Emerald Green",
    color: "#059669",
    gradient: "from-green-500 to-emerald-600",
    price: 29.99,
    image: "/cards/card-green.png"
  },
  {
    id: "ruby-red",
    name: "Ruby Red",
    color: "#dc2626",
    gradient: "from-red-500 to-red-700",
    price: 29.99,
    image: "/cards/card-red.png"
  },
  {
    id: "royal-purple",
    name: "Royal Purple",
    color: "#7c3aed",
    gradient: "from-purple-500 to-violet-600",
    price: 29.99,
    image: "/cards/card-purple.png"
  },
  {
    id: "sunset-gold",
    name: "Sunset Gold",
    color: "#d97706",
    gradient: "from-yellow-500 to-orange-500",
    price: 34.99,
    image: "/cards/card-gold.png"
  },
];

export default function CardSelector() {
  const { state, dispatch } = useShop();

  const handleCardSelect = (card: CardColor) => {
    dispatch({ type: 'SELECT_CARD', payload: card });
    dispatch({ type: 'CALCULATE_TOTALS' });
  };

  const handleQuantityChange = (quantity: number) => {
    dispatch({ type: 'SET_QUANTITY', payload: quantity });
    dispatch({ type: 'CALCULATE_TOTALS' });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Card</h2>
          <p className="text-gray-600">Select your preferred color and style</p>
        </div>
        
        {state.selectedCard && (
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Quantity:</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(Math.max(1, state.quantity - 1))}
                className="px-3 py-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                −
              </button>
              <span className="px-4 py-2 font-medium border-x border-gray-300">{state.quantity}</span>
              <button
                onClick={() => handleQuantityChange(state.quantity + 1)}
                className="px-3 py-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardOptions.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductCard
              card={card}
              isSelected={state.selectedCard?.id === card.id}
              onSelect={() => handleCardSelect(card)}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Card Features */}
      <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What&apos;s Included</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "NFC-enabled for tap payments",
            "Premium metal construction",
            "Cryptocurrency support",
            "Mobile app integration",
            "24/7 customer support",
            "2-year warranty included"
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckIcon className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}