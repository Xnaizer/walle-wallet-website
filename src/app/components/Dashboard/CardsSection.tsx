// components/Dashboard/CardsSection.tsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  CreditCardIcon,
  CogIcon,
  ShieldCheckIcon,
  ClockIcon,
  EyeIcon,
  EyeSlashIcon,
  BanknotesIcon
} from "@heroicons/react/24/outline";
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
  description: string;
}

export default function CardsSection() {
  const { state, dispatch } = useDashboard();
  const [activeTab, setActiveTab] = useState<TabId>('settings');
  const [showBalance, setShowBalance] = useState(true);

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
    { 
      id: 'settings', 
      name: 'Card Settings', 
      icon: CogIcon,
      description: 'Manage card preferences and basic settings'
    },
    { 
      id: 'limits', 
      name: 'Set Limits', 
      icon: ShieldCheckIcon,
      description: 'Configure spending limits and restrictions'
    },
    { 
      id: 'transactions', 
      name: 'Transaction Log', 
      icon: ClockIcon,
      description: 'View detailed transaction history'
    },
  ];

  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId);
  };

  // Calculate total balance in IDR equivalent (mock conversion)
  const getTotalBalance = () => {
    if (!currentCard) return 0;
    const { balance } = currentCard;
    // Mock conversion rates to IDR
    return balance.idr + 
           (balance.usdt * 15000) + 
           (balance.usdc * 15000) + 
           balance.idrx + 
           balance.idrt;
  };

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'idr' || currency === 'idrx' || currency === 'idrt') {
      return `Rp ${amount.toLocaleString()}`;
    }
    return `$${amount.toLocaleString()}`;
  };

  if (state.cards.length === 0) {
    return (
      <div className="text-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-24 h-24 bg-gradient-to-br from-walle-royal-blue to-walle-ocean-blue rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <CreditCardIcon className="w-12 h-12 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-walle-dark-blue mb-4">No Cards Available</h2>
        <p className="text-walle-ocean-blue mb-8 text-lg">
          Generate your first Walle card to start managing your digital payments
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => dispatch({ type: 'SET_SECTION', payload: 'overview' })}
          className="bg-walle-gradient text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Go to Overview
        </motion.button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
      {/* Left Panel - Card Information */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="xl:col-span-2 space-y-6"
      >
        {/* Card Display Section */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-walle-pale-cyan">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-walle-dark-blue">
                Your Cards
              </h2>
              <p className="text-sm text-walle-ocean-blue mt-1">
                {state.selectedCardIndex + 1} of {state.cards.length} cards
              </p>
            </div>
            
            {state.cards.length > 1 && (
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevCard}
                  className="p-3 rounded-xl bg-walle-soft text-walle-royal-blue hover:bg-walle-ice-blue transition-colors shadow-md"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextCard}
                  className="p-3 rounded-xl bg-walle-soft text-walle-royal-blue hover:bg-walle-ice-blue transition-colors shadow-md"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </div>

          {/* Card Display */}
          <div className="flex justify-center mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={state.selectedCardIndex}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <WalleCard card={currentCard} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Card Status */}
          <div className="flex items-center justify-center mb-6">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              currentCard.isActive 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                currentCard.isActive ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className="text-sm font-semibold">
                {currentCard.isActive ? 'Active Card' : 'Inactive Card'}
              </span>
            </div>
          </div>
        </div>

        {/* Card Information */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-walle-pale-cyan">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-walle-dark-blue">Card Information</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 rounded-lg bg-walle-soft text-walle-royal-blue hover:bg-walle-ice-blue transition-colors"
            >
              {showBalance ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </motion.button>
          </div>

          {/* Total Balance */}
          <div className="bg-gradient-to-r from-walle-royal-blue to-walle-ocean-blue rounded-2xl p-6 mb-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <BanknotesIcon className="w-6 h-6" />
              <span className="text-sm opacity-90">Total Balance</span>
            </div>
            <div className="text-3xl font-bold">
              {showBalance ? `Rp ${getTotalBalance().toLocaleString()}` : 'Rp ****'}
            </div>
          </div>

          {/* Balance Breakdown */}
          <div className="space-y-4 mb-6">
            <h4 className="font-semibold text-walle-dark-blue">Balance Breakdown</h4>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(currentCard.balance).map(([currency, amount]) => (
                <motion.div
                  key={currency}
                  whileHover={{ scale: 1.02 }}
                  className="bg-walle-soft rounded-xl p-4 text-center"
                >
                  <div className="text-xs text-walle-ocean-blue mb-1 uppercase font-medium">
                    {currency}
                  </div>
                  <div className="text-lg font-bold text-walle-dark-blue">
                    {showBalance ? formatCurrency(amount, currency) : '****'}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Card Limits Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-walle-dark-blue">Spending Limits</h4>
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-walle-soft rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-walle-ocean-blue">Daily Limit</span>
                  <span className="font-semibold text-walle-dark-blue">
                    Rp {currentCard.limits.daily.toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-walle-gradient h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min((currentCard.currentLimitUsed / currentCard.limits.daily) * 100, 100)}%` 
                    }}
                  />
                </div>
                <div className="text-xs text-walle-ocean-blue mt-1">
                  Used: Rp {currentCard.currentLimitUsed.toLocaleString()}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-walle-soft rounded-lg p-3 text-center">
                  <div className="text-xs text-walle-ocean-blue">Weekly</div>
                  <div className="text-sm font-semibold text-walle-dark-blue">
                    {(currentCard.limits.weekly / 1000000).toFixed(0)}M
                  </div>
                </div>
                <div className="bg-walle-soft rounded-lg p-3 text-center">
                  <div className="text-xs text-walle-ocean-blue">Monthly</div>
                  <div className="text-sm font-semibold text-walle-dark-blue">
                    {(currentCard.limits.monthly / 1000000).toFixed(0)}M
                  </div>
                </div>
                <div className="bg-walle-soft rounded-lg p-3 text-center">
                  <div className="text-xs text-walle-ocean-blue">Yearly</div>
                  <div className="text-sm font-semibold text-walle-dark-blue">
                    {(currentCard.limits.yearly / 1000000).toFixed(0)}M
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Panel - Card Management */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="xl:col-span-3 space-y-6"
      >
{/* Tab Navigation - Redesigned */}
<div className="bg-white rounded-2xl p-6 ">

  
  {/* Modern Tab Style */}
  <div className="flex flex-wrap gap-2 bg-gray-100 p-1 rounded-xl">
    {tabs.map((tab) => (
      <motion.button
        key={tab.id}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleTabClick(tab.id)}
        className={`flex-1 min-w-0 px-4 py-3 rounded-lg transition-all duration-300 font-medium text-sm ${
          activeTab === tab.id
            ? 'bg-white text-walle-dark-blue shadow-sm border border-gray-200'
            : 'text-gray-600 hover:text-walle-dark-blue hover:bg-white/50'
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <tab.icon className={`w-4 h-4 ${
            activeTab === tab.id ? 'text-walle-royal-blue' : 'text-gray-500'
          }`} />
          <span className="truncate">{tab.name}</span>
        </div>
      </motion.button>
    ))}
  </div>
  

</div>

        {/* Management Content */}
        <div className="bg-white rounded-3xl  min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {activeTab === 'settings' && <CardSettings card={currentCard} />}
              {activeTab === 'limits' && <SetLimit card={currentCard} />}
              {activeTab === 'transactions' && <TransactionLog card={currentCard} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}