// components/Dashboard/CardInfoModal.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { XMarkIcon, ClipboardIcon, CheckIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import { WalletCard, useDashboard } from "./DashboardContext";

interface CardInfoModalProps {
  card: WalletCard;
  onClose: () => void;
}

export default function CardInfoModal({ card, onClose }: CardInfoModalProps) {
  const { dispatch } = useDashboard();
  const [cardName, setCardName] = useState(card.name);
  const [copied, setCopied] = useState(false);

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(card.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_CARD',
      payload: {
        cardId: card.id,
        updates: { name: cardName }
      }
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-walle-gradient rounded-xl flex items-center justify-center">
              <CreditCardIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-walle-dark-blue">Change Card Info</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-walle-light-gray rounded-xl transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-walle-ocean-blue" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Card Name */}
          <div>
            <label className="block text-sm font-medium text-walle-dark-blue mb-2">
              Card Name
            </label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full px-4 py-3 border border-walle-light-gray rounded-xl focus:ring-2 focus:ring-walle-royal-blue focus:border-transparent transition-all duration-300"
              placeholder="Enter card name"
            />
          </div>

          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-walle-dark-blue mb-2">
              Card Number
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={card.cardNumber}
                readOnly
                className="flex-1 px-4 py-3 bg-gray-50 border border-walle-light-gray rounded-xl text-walle-ocean-blue font-mono"
              />
              <button
                onClick={handleCopyId}
                className="p-3 text-walle-royal-blue hover:text-walle-dark-blue hover:bg-walle-ice-blue rounded-xl transition-colors"
                title="Copy Card Number"
              >
                {copied ? (
                  <CheckIcon className="w-5 h-5 text-green-600" />
                ) : (
                  <ClipboardIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Card ID */}
          <div>
            <label className="block text-sm font-medium text-walle-dark-blue mb-2">
              Card ID
            </label>
            <input
              type="text"
              value={card.id}
              readOnly
              className="w-full px-4 py-3 bg-gray-50 border border-walle-light-gray rounded-xl text-walle-ocean-blue font-mono text-sm"
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-walle-dark-blue mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              value={card.expiryDate}
              readOnly
              className="w-full px-4 py-3 bg-gray-50 border border-walle-light-gray rounded-xl text-walle-ocean-blue"
            />
          </div>

          {/* Card Status */}
          <div>
            <label className="block text-sm font-medium text-walle-dark-blue mb-2">
              Status
            </label>
            <div className={`inline-flex px-3 py-2 rounded-full text-sm font-medium ${
              card.isActive 
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {card.isActive ? 'Active' : 'Inactive'}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-walle-light-gray text-walle-ocean-blue rounded-xl font-semibold hover:bg-walle-light-gray transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-walle-gradient text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}