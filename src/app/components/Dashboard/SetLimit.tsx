// components/Dashboard/SetLimit.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { WalletCard, useDashboard } from "./DashboardContext";

interface SetLimitProps {
  card: WalletCard;
}

type LimitType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export default function SetLimit({ card }: SetLimitProps) {
  const { dispatch } = useDashboard();
  const [selectedLimitType, setSelectedLimitType] = useState<LimitType>('daily');
  const [limitAmount, setLimitAmount] = useState('');

  const limitTypes = [
    { key: 'daily', name: 'Daily', period: '24 hours' },
    { key: 'weekly', name: 'Weekly', period: '7 days' },
    { key: 'monthly', name: 'Monthly', period: '30 days' },
    { key: 'yearly', name: 'Yearly', period: '365 days' },
  ] as const;

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

    setLimitAmount('');
  };

  const getCurrentLimit = () => {
    return card.limits[selectedLimitType];
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-walle-dark-blue mb-6 flex items-center gap-2">
        <CurrencyDollarIcon className="w-5 h-5 text-walle-royal-blue" />
        Set Spending Limits
      </h3>

      {/* Current Limit Display */}
      <div className="mb-6 p-4 bg-walle-soft rounded-2xl">
        <div className="text-sm text-walle-ocean-blue mb-1">Current {selectedLimitType} limit</div>
        <div className="text-2xl font-bold text-walle-dark-blue">
          {getCurrentLimit() > 0 ? formatCurrency(getCurrentLimit()) : 'No limit set'}
        </div>
        {card.currentLimitUsed > 0 && (
          <div className="text-sm text-walle-ocean-blue mt-2">
            Used: {formatCurrency(card.currentLimitUsed)} 
            {getCurrentLimit() > 0 && ` (${((card.currentLimitUsed / getCurrentLimit()) * 100).toFixed(1)}%)`}
          </div>
        )}
      </div>

      {/* Limit Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-walle-dark-blue mb-3">
          Select Limit Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          {limitTypes.map((type) => (
            <motion.button
              key={type.key}
              onClick={() => setSelectedLimitType(type.key)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                selectedLimitType === type.key
                  ? 'border-walle-royal-blue bg-walle-soft'
                  : 'border-walle-light-gray hover:border-walle-pale-cyan'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`font-semibold ${
                selectedLimitType === type.key ? 'text-walle-dark-blue' : 'text-walle-ocean-blue'
              }`}>
                {type.name}
              </div>
              <div className="text-sm text-walle-ocean-blue">{type.period}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Limit Amount Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-walle-dark-blue mb-2">
          Set {selectedLimitType} limit amount
        </label>
        <div className="relative">
          <div className="absolute left-3 top-3 text-walle-ocean-blue">Rp</div>
          <input
            type="number"
            value={limitAmount}
            onChange={(e) => setLimitAmount(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-walle-light-gray rounded-xl focus:ring-2 focus:ring-walle-royal-blue focus:border-transparent transition-all duration-300"
            placeholder="0"
            min="0"
          />
        </div>
      </div>

      {/* Quick Amount Buttons */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-walle-dark-blue mb-3">
          Quick Amounts
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[100000, 500000, 1000000, 2000000, 5000000, 10000000].map((amount) => (
            <button
              key={amount}
              onClick={() => setLimitAmount(amount.toString())}
              className="p-3 text-sm font-medium text-walle-ocean-blue bg-white border border-walle-light-gray rounded-xl hover:bg-walle-ice-blue transition-colors"
            >
              {formatCurrency(amount)}
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <motion.button
        onClick={handleSave}
        disabled={!limitAmount}
        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
          limitAmount
            ? 'bg-walle-gradient text-white shadow-lg hover:shadow-xl'
            : 'bg-walle-light-gray text-gray-400 cursor-not-allowed'
        }`}
        whileHover={limitAmount ? { scale: 1.02 } : {}}
        whileTap={limitAmount ? { scale: 0.98 } : {}}
      >
        Save Limit
      </motion.button>

      {/* Limit History */}
      <div className="mt-8 pt-6 border-t border-walle-light-gray">
        <h4 className="text-md font-semibold text-walle-dark-blue mb-4">All Limits</h4>
        <div className="space-y-3">
          {limitTypes.map((type) => (
            <div key={type.key} className="flex justify-between items-center py-2">
              <div>
                <div className="font-medium text-walle-dark-blue">{type.name}</div>
                <div className="text-sm text-walle-ocean-blue">{type.period}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-walle-dark-blue">
                  {card.limits[type.key] > 0 ? formatCurrency(card.limits[type.key]) : 'No limit'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}