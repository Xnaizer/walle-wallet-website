// components/Dashboard/SetLimit.tsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CurrencyDollarIcon,
  ClockIcon,
  CalendarIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";
import { WalletCard, useDashboard } from "./DashboardContext";

interface SetLimitProps {
  card: WalletCard;
}

type LimitType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export default function SetLimit({ card }: SetLimitProps) {
  const { dispatch } = useDashboard();
  const [selectedLimitType, setSelectedLimitType] = useState<LimitType>('daily');
  const [limitAmount, setLimitAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const limitTypes = [
    { 
      key: 'daily', 
      name: 'Daily', 
      period: '24h',
      icon: ClockIcon,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-500',
      textColor: 'text-blue-700'
    },
    { 
      key: 'weekly', 
      name: 'Weekly', 
      period: '7d',
      icon: CalendarIcon,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      iconBg: 'bg-emerald-500',
      textColor: 'text-emerald-700'
    },
    { 
      key: 'monthly', 
      name: 'Monthly', 
      period: '30d',
      icon: ChartBarIcon,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-500',
      textColor: 'text-purple-700'
    },
    { 
      key: 'yearly', 
      name: 'Yearly', 
      period: '365d',
      icon: Cog6ToothIcon,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      iconBg: 'bg-orange-500',
      textColor: 'text-orange-700'
    },
  ] as const;

  const quickAmounts = [
    { amount: 100000, label: '100K' },
    { amount: 500000, label: '500K' },
    { amount: 1000000, label: '1M' },
    { amount: 2000000, label: '2M' },
    { amount: 5000000, label: '5M' },
    { amount: 10000000, label: '10M' },
  ];

  const handleSave = () => {
    if (!limitAmount || isNaN(Number(limitAmount))) {
      alert('Please enter a valid amount');
      return;
    }

    const newLimits = { ...card.limits };
    newLimits[selectedLimitType] = Number(limitAmount);

    dispatch({
      type: 'UPDATE_CARD',
      payload: {
        cardId: card.id,
        updates: { limits: newLimits }
      }
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setLimitAmount('');
  };

  const getCurrentLimit = () => {
    return card.limits[selectedLimitType];
  };

  // Compact currency formatting
  const formatCompactCurrency = (amount: number): string => {
    if (amount === 0) return 'Rp 0';
    
    const absAmount = Math.abs(amount);
    
    if (absAmount >= 1_000_000_000) {
      return `Rp ${(amount / 1_000_000_000).toFixed(1)}B`;
    } else if (absAmount >= 1_000_000) {
      return `Rp ${(amount / 1_000_000).toFixed(1)}M`;
    } else if (absAmount >= 1_000) {
      return `Rp ${(amount / 1_000).toFixed(1)}K`;
    } else {
      return `Rp ${amount.toLocaleString()}`;
    }
  };

  const getUsagePercentage = () => {
    const limit = getCurrentLimit();
    if (limit <= 0) return 0;
    return Math.min((card.currentLimitUsed / limit) * 100, 100);
  };

  const currentLimitType = limitTypes.find(type => type.key === selectedLimitType);

  return (
    <div className="px-6 pb-6">


      {/* Compact Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2"
          >
            <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
            <div className="text-sm text-emerald-800">
              <span className="font-semibold">Updated!</span> {selectedLimitType} limit set successfully.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        {/* Current Limit Display - Compact */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            {currentLimitType && (
              <div className={`w-8 h-8 ${currentLimitType.iconBg} rounded-lg flex items-center justify-center`}>
                <currentLimitType.icon className="w-4 h-4 text-white" />
              </div>
            )}
            <div>
              <div className="text-sm font-semibold text-slate-800">
                {selectedLimitType.charAt(0).toUpperCase() + selectedLimitType.slice(1)} Limit
              </div>
              <div className="text-xs text-slate-600">{currentLimitType?.period}</div>
            </div>
          </div>

          <div className="mb-3">
            <div className="text-2xl font-bold text-slate-800 mb-2">
              {getCurrentLimit() > 0 ? formatCompactCurrency(getCurrentLimit()) : 'No limit'}
            </div>
            
            {getCurrentLimit() > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Used today</span>
                  <span className="font-semibold text-slate-800">
                    {formatCompactCurrency(card.currentLimitUsed)}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${
                      getUsagePercentage() > 80 
                        ? 'bg-gradient-to-r from-red-500 to-red-600'
                        : getUsagePercentage() > 60
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                        : 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${getUsagePercentage()}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">
                    {getUsagePercentage().toFixed(1)}% used
                  </span>
                  {getUsagePercentage() > 80 && (
                    <span className="text-red-600 flex items-center gap-1">
                      <ExclamationTriangleIcon className="w-3 h-3" />
                      Near limit
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Compact Limit Type Selection */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
          <h4 className="text-lg font-semibold text-slate-800 mb-3">Select Period</h4>
          <div className="grid grid-cols-2 gap-2">
            {limitTypes.map((type) => (
              <motion.button
                key={type.key}
                onClick={() => setSelectedLimitType(type.key)}
                className={`p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                  selectedLimitType === type.key
                    ? `${type.borderColor} ${type.bgColor}`
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    selectedLimitType === type.key
                      ? type.iconBg
                      : 'bg-slate-100'
                  }`}>
                    <type.icon className={`w-4 h-4 ${
                      selectedLimitType === type.key ? 'text-white' : 'text-slate-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold text-sm ${
                      selectedLimitType === type.key ? 'text-slate-800' : 'text-slate-700'
                    }`}>
                      {type.name}
                    </div>
                    <div className="text-xs text-slate-600">{type.period}</div>
                  </div>
                  <div className="text-xs font-mono text-slate-800">
                    {card.limits[type.key] > 0 ? formatCompactCurrency(card.limits[type.key]) : '--'}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Compact Input Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
          <h4 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <CurrencyDollarIcon className="w-4 h-4 text-blue-600" />
            Set New Amount
          </h4>
          
          <div className="mb-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600 font-semibold text-sm">
                Rp
              </div>
              <input
                type="number"
                value={limitAmount}
                onChange={(e) => setLimitAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg font-semibold text-slate-800"
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          {/* Compact Quick Amount Buttons */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Quick Select
            </label>
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map(({ amount, label }) => (
                <motion.button
                  key={amount}
                  onClick={() => setLimitAmount(amount.toString())}
                  className="p-2 text-sm font-semibold bg-slate-100 text-slate-800 rounded-lg hover:bg-slate-200 transition-all duration-300 border border-slate-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Compact Save Button */}
          <motion.button
            onClick={handleSave}
            disabled={!limitAmount}
            className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
              limitAmount
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
            whileHover={limitAmount ? { scale: 1.02, y: -1 } : {}}
            whileTap={limitAmount ? { scale: 0.98 } : {}}
          >
            {limitAmount ? `Set ${selectedLimitType} Limit` : 'Enter Amount'}
          </motion.button>
        </div>

        {/* Compact All Limits Overview */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200">
          <h4 className="text-lg font-semibold text-slate-800 mb-3">All Limits</h4>
          <div className="space-y-2">
            {limitTypes.map((type) => (
              <motion.div
                key={type.key}
                className="bg-white rounded-xl p-3 shadow-sm border border-slate-200"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 ${type.iconBg} rounded-md flex items-center justify-center`}>
                      <type.icon className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-800">{type.name}</div>
                      <div className="text-xs text-slate-600">{type.period}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-slate-800">
                      {card.limits[type.key] > 0 ? formatCompactCurrency(card.limits[type.key]) : 'No limit'}
                    </div>
                    {card.limits[type.key] > 0 && (
                      <div className="text-xs text-emerald-600">
                        Active
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}