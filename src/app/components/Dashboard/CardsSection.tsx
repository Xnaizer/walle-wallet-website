// components/Dashboard/CardsSection.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import { useDashboard } from "./DashboardContext";
import WalleCard from "./WalleCard";
import CardSettings from "./CardSettings";
import SetLimit from "./SetLimit";
import TransactionLog from "./TransactionLog";

// Define proper types for tab IDs
type TabId = 'settings' | 'limits' | 'transactions';

interface Tab {
  id: TabId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function CardsSection() {
  const { state, dispatch } = useDashboard();
  const [activeTab, setActiveTab] = useState<TabId>('settings');

  const handlePrevCard = () => {
    const newIndex = state.selectedCardIndex > 0 ? state.selectedCardIndex - 1 : state.cards.length - 1;
    dispatch({ type: 'SET_SELECTED_CARD', payload: newIndex });
  };

  const handleNextCard = () => {
    const newIndex = state.selectedCardIndex < state.cards.length - 1 ? state.selectedCardIndex + 1 : 0;
    dispatch({ type: 'SET_SELECTED_CARD', payload: newIndex });
  };

  const currentCard = state.cards[state.selectedCardIndex];

  const tabs: Tab[] = [
    { id: 'settings', name: 'Card Settings', icon: CreditCardIcon },
    { id: 'limits', name: 'Set Limit', icon: CreditCardIcon },
    { id: 'transactions', name: 'Transaction Log', icon: CreditCardIcon },
  ];

  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId);
  };

  if (state.cards.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-walle-soft rounded-full flex items-center justify-center mx-auto mb-6">
          <CreditCardIcon className="w-10 h-10 text-walle-royal-blue" />
        </div>
        <h2 className="text-2xl font-bold text-walle-dark-blue mb-4">No Cards Available</h2>
        <p className="text-walle-ocean-blue mb-6">
          Generate your first Walle card from the Overview section
        </p>
        <button
          onClick={() => dispatch({ type: 'SET_SECTION', payload: 'overview' })}
          className="bg-walle-gradient text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Go to Overview
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Panel - Settings */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-1 space-y-6"
      >
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-walle-pale-cyan">
          <h2 className="text-xl font-bold text-walle-dark-blue mb-4">Card Management</h2>
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-walle-gradient text-white shadow-lg'
                    : 'text-walle-ocean-blue hover:bg-walle-ice-blue'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-walle-pale-cyan">
          {activeTab === 'settings' && <CardSettings card={currentCard} />}
          {activeTab === 'limits' && <SetLimit card={currentCard} />}
          {activeTab === 'transactions' && <TransactionLog card={currentCard} />}
        </div>
      </motion.div>

      {/* Right Panel - Card Display */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-2"
      >
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-walle-pale-cyan">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-walle-dark-blue">
              Your Cards ({state.cards.length})
            </h2>
            
            {state.cards.length > 1 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevCard}
                  className="p-2 rounded-xl bg-walle-soft text-walle-royal-blue hover:bg-walle-ice-blue transition-colors"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <span className="text-sm text-walle-ocean-blue font-medium">
                  {state.selectedCardIndex + 1} of {state.cards.length}
                </span>
                <button
                  onClick={handleNextCard}
                  className="p-2 rounded-xl bg-walle-soft text-walle-royal-blue hover:bg-walle-ice-blue transition-colors"
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          {/* Card Display */}
          <div className="flex justify-center">
            <motion.div
              key={state.selectedCardIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <WalleCard card={currentCard} />
            </motion.div>
          </div>

          {/* Card Info */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-walle-soft rounded-2xl p-4 text-center">
              <div className="text-sm text-walle-ocean-blue mb-1">Daily Limit</div>
              <div className="text-lg font-bold text-walle-dark-blue">
                {currentCard.limits.daily.toLocaleString()}
              </div>
            </div>
            <div className="bg-walle-soft rounded-2xl p-4 text-center">
              <div className="text-sm text-walle-ocean-blue mb-1">Used Today</div>
              <div className="text-lg font-bold text-walle-dark-blue">
                {currentCard.currentLimitUsed.toLocaleString()}
              </div>
            </div>
            <div className="bg-walle-soft rounded-2xl p-4 text-center">
              <div className="text-sm text-walle-ocean-blue mb-1">Status</div>
              <div className={`text-lg font-bold ${
                currentCard.isActive ? 'text-green-600' : 'text-red-600'
              }`}>
                {currentCard.isActive ? 'Active' : 'Inactive'}
              </div>
            </div>
            <div className="bg-walle-soft rounded-2xl p-4 text-center">
              <div className="text-sm text-walle-ocean-blue mb-1">Card ID</div>
              <div className="text-lg font-bold text-walle-dark-blue font-mono">
                {currentCard.id.slice(-6).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}