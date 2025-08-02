// components/Dashboard/CardInfoModal.tsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  XMarkIcon, 
  ClipboardIcon, 
  CheckIcon, 
  CreditCardIcon,
  CalendarIcon,
  IdentificationIcon,
  ShieldCheckIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { WalletCard, useDashboard } from "./DashboardContext";

interface CardInfoModalProps {
  card: WalletCard;
  onClose: () => void;
}

export default function CardInfoModal({ card, onClose }: CardInfoModalProps) {
  const { dispatch } = useDashboard();
  const [cardName, setCardName] = useState(card.name);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(card.cardNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleSave = async () => {
    if (cardName.trim() === '') return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      dispatch({
        type: 'UPDATE_CARD',
        payload: {
          cardId: card.id,
          updates: { name: cardName.trim() }
        }
      });
      setIsLoading(false);
      onClose();
    }, 800);
  };

  const hasChanges = cardName.trim() !== card.name && cardName.trim() !== '';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ 
            duration: 0.3,
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          className="bg-gradient-to-br from-cyan-50/95 via-white/95 to-blue-50/95 backdrop-blur-xl rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-cyan-200/50 relative overflow-hidden"
        >
          {/* Background Decorations */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-300/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-300/20 to-transparent rounded-full blur-xl"></div>

          {/* Header */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg relative">
                <CreditCardIcon className="w-6 h-6 text-white" />
                <SparklesIcon className="absolute -top-1 -right-1 w-3 h-3 text-amber-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">
                  Card Information
                </h2>
                <p className="text-xs text-slate-600">{card.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-cyan-100/50 rounded-xl transition-colors text-slate-600"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Compact Form */}
          <div className="space-y-4 relative z-10">
            {/* Editable Card Name */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-2">
                <CreditCardIcon className="w-4 h-4 text-cyan-600" />
                Card Name
              </label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="w-full px-3 py-2 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all bg-white/80 text-slate-800 text-sm"
                placeholder="Enter card name"
                maxLength={30}
              />
              <div className="text-xs text-cyan-600 mt-1">{cardName.length}/30</div>
            </div>

            {/* Read-only Information Grid */}
            <div className="grid grid-cols-1 gap-3">
              {/* Card Number with Copy */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-2">
                  <IdentificationIcon className="w-4 h-4 text-slate-600" />
                  Card Number
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={card.cardNumber}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-mono text-sm"
                  />
                  <button
                    onClick={handleCopyId}
                    className={`p-2 rounded-lg transition-all ${
                      copied 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-cyan-100 text-cyan-600 hover:bg-cyan-200'
                    }`}
                  >
                    {copied ? <CheckIcon className="w-4 h-4" /> : <ClipboardIcon className="w-4 h-4" />}
                  </button>
                </div>
                {copied && (
                  <div className="text-xs text-emerald-600 mt-1">✓ Copied!</div>
                )}
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-2 gap-3">
                {/* Card ID */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <label className="flex items-center gap-1 text-sm font-semibold text-slate-800 mb-2">
                    <span className="text-xs">🔐</span>
                    ID
                  </label>
                  <div className="px-3 py-2 bg-white border border-amber-300 rounded-lg text-slate-700 font-mono text-xs">
                    {card.id.slice(-6).toUpperCase()}
                  </div>
                </div>

                {/* Expiry */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <label className="flex items-center gap-1 text-sm font-semibold text-slate-800 mb-2">
                    <CalendarIcon className="w-4 h-4 text-blue-600" />
                    Expiry
                  </label>
                  <div className="px-3 py-2 bg-white border border-blue-300 rounded-lg text-slate-700 font-mono text-sm">
                    {card.expiryDate}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-2">
                  <ShieldCheckIcon className="w-4 h-4 text-slate-600" />
                  Status
                </label>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-semibold ${
                  card.isActive 
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${card.isActive ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  {card.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>
          </div>

          {/* Compact Action Buttons */}
          <div className="flex gap-3 mt-6 relative z-10">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges || isLoading}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                hasChanges && !isLoading
                  ? 'bg-gradient-to-r from-cyan-500 to-amber-500 text-white shadow-md hover:shadow-lg'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </div>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>

          {/* Compact Footer */}
          <div className="mt-4 pt-3 border-t border-cyan-200/50 text-center relative z-10">
            <div className="text-xs text-slate-500 flex items-center justify-center gap-1">
              🔒 Securely encrypted
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}