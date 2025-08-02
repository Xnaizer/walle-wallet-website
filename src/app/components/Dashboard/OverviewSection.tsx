// components/Dashboard/OverviewSection.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDashboard } from "./DashboardContext";
import { PlusIcon } from "@heroicons/react/24/outline";
import WalleCard from "./WalleCard";
import TransactionHistory from "./TransactionHistory";
import AddCardModal from "./AddCardModal";

export default function OverviewSection() {
  const { state, dispatch } = useDashboard();
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);

  const handleAddCard = (cardData: { cardId: string; cardName: string; pin: string }) => {
    const newCard = {
      id: cardData.cardId,
      name: cardData.cardName,
      cardNumber: `4532 ${Math.random().toString().slice(2, 6)} ${Math.random().toString().slice(2, 6)} ${Math.random().toString().slice(2, 6)}`,
      expiryDate: '12/28',
      isActive: true,
      balance: {
        idr: 0,
        usdt: 0,
        usdc: 0,
        idrx: 0,
        idrt: 0,
      },
      limits: {
        daily: 0,
        weekly: 0,
        monthly: 0,
        yearly: 0,
      },
      currentLimitUsed: 0,
      pin: cardData.pin,
    };
    
    dispatch({ type: 'GENERATE_CARD', payload: newCard });
  };

  const AddCardButton = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-shrink-0 order-first"
    >
      <button
        onClick={() => setIsAddCardModalOpen(true)}
        className="w-80 h-48 border-2 border-dashed border-walle-royal-blue rounded-2xl flex items-center justify-center cursor-pointer hover:border-walle-dark-blue hover:bg-blue-50 transition-all duration-300 group"
      >
        <div className="text-center">
          <div className="w-12 h-12 bg-walle-soft rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-walle-royal-blue transition-all duration-300">
            <PlusIcon className="w-6 h-6 text-walle-royal-blue group-hover:text-white" />
          </div>
          <h3 className="text-lg font-semibold text-walle-dark-blue mb-1">
            Add New Card
          </h3>
          <p className="text-sm text-walle-ocean-blue">
            Click to create a new card
          </p>
        </div>
      </button>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-walle-dark-blue mb-2">
          Hi, {state.user.name}
        </h1>
        <p className="text-walle-ocean-blue text-lg mb-8">
          Get started with your first Walle card. Securely manage IDR and USDT in one smart wallet.
        </p>
      </motion.div>

      {/* Cards Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-3xl p-8 "
      >
        <h2 className="text-2xl font-bold text-walle-dark-blue mb-6">
          Your Walle Cards
        </h2>

        {state.cards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="border-2 border-dashed border-walle-light-gray rounded-2xl p-12 text-center"
          >
            <div className="w-16 h-16 bg-walle-soft rounded-full flex items-center justify-center mx-auto mb-4">
              <PlusIcon className="w-8 h-8 text-walle-royal-blue" />
            </div>
            
            <h3 className="text-xl font-semibold text-walle-dark-blue mb-2">
              Generate Walle Card
            </h3>
            
            <p className="text-walle-ocean-blue mb-6">
              Create your first Walle card to start making payments
            </p>
            
            <motion.button
              onClick={() => setIsAddCardModalOpen(true)}
              className="bg-walle-gradient text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Generate Your First Card
            </motion.button>
          </motion.div>
        ) : (
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-walle-royal-blue scrollbar-track-gray-100">
              {/* Add Card Button - Always First */}
              <AddCardButton />
              
              {/* Existing Cards */}
              {state.cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                  className="flex-shrink-0"
                >
                  <WalleCard card={card} />
                </motion.div>
              ))}
            </div>
            
            {/* Scroll Indicator (optional) */}
            {state.cards.length > 0 && (
              <div className="flex justify-center mt-4">
                <div className="text-xs text-gray-400 flex items-center gap-2">
                  <span>← Scroll to see more cards →</span>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <TransactionHistory />
      </motion.div>

      {/* Add Card Modal */}
      <AddCardModal 
        isOpen={isAddCardModalOpen}
        onClose={() => setIsAddCardModalOpen(false)}
        onConfirm={handleAddCard}
      />
    </div>
  );
}