// components/Dashboard/CardSettings.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  PencilIcon, 
  KeyIcon, 
  ClipboardIcon, 
  CheckIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";
import { WalletCard, useDashboard } from "./DashboardContext";
import CardInfoModal from "./CardInfoModal";
import ChangePinModal from "./ChangePinModal";

interface CardSettingsProps {
  card: WalletCard;
}

export default function CardSettings({ card }: CardSettingsProps) {
  const { dispatch } = useDashboard();
  const [showCardInfoModal, setShowCardInfoModal] = useState(false);
  const [showChangePinModal, setShowChangePinModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(card.cardNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleToggleStatus = () => {
    dispatch({
      type: 'UPDATE_CARD',
      payload: {
        cardId: card.id,
        updates: { isActive: !card.isActive }
      }
    });
  };

  const formatCardNumber = (number: string, show: boolean) => {
    if (show) {
      return number;
    }
    const parts = number.split(' ');
    return `${parts[0]} **** **** ${parts[parts.length - 1]}`;
  };

  return (
    <div className=" px-6">


      <div className="space-y-4">
        {/* Compact Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <motion.button
            onClick={() => setShowCardInfoModal(true)}
            className="group p-4 bg-slate-200 rounded-xl transition-all duration-300 border border-blue-200/50"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <PencilIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold text-blue-900 text-sm">Update Info</div>
                <div className="text-xs text-blue-700">Change details</div>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => setShowChangePinModal(true)}
            className="group p-4 bg-slate-200 rounded-xl transition-all duration-300 border border-green-200/50"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <KeyIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold text-green-900 text-sm">Change PIN</div>
                <div className="text-xs text-green-700">Update security</div>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Compact Card Information */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <InformationCircleIcon className="w-5 h-5 text-walle-royal-blue" />
            <h4 className="text-lg font-bold text-walle-dark-blue">Card Information</h4>
          </div>

          <div className="space-y-4">
            {/* Compact Card Name */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <label className="block text-sm font-semibold text-walle-dark-blue mb-2">
                Card Name
              </label>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-walle-soft rounded-lg flex items-center justify-center">
                  <CreditCardIcon className="w-4 h-4 text-walle-royal-blue" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-walle-dark-blue">{card.name}</div>
                  <div className="text-xs text-walle-ocean-blue">Primary identifier</div>
                </div>
              </div>
            </div>

            {/* Compact Card Number */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <label className="block text-sm font-semibold text-walle-dark-blue mb-2">
                Card Number
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formatCardNumber(card.cardNumber, showCardNumber)}
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-walle-dark-blue font-mono text-sm focus:outline-none"
                />
                <div className="flex gap-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCardNumber(!showCardNumber)}
                    className="p-2 rounded-lg bg-walle-soft text-walle-royal-blue hover:bg-walle-ice-blue transition-colors"
                    title="Toggle visibility"
                  >
                    {showCardNumber ? (
                      <EyeSlashIcon className="w-4 h-4" />
                    ) : (
                      <EyeIcon className="w-4 h-4" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyId}
                    className={`p-2 rounded-lg transition-colors ${
                      copied 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-walle-soft text-walle-royal-blue hover:bg-walle-ice-blue'
                    }`}
                    title="Copy card number"
                  >
                    {copied ? (
                      <CheckIcon className="w-4 h-4" />
                    ) : (
                      <ClipboardIcon className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Compact Card Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <label className="block text-sm font-semibold text-walle-dark-blue mb-2">
                  Expiry Date
                </label>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-xs">📅</span>
                  </div>
                  <div className="text-lg font-mono text-walle-dark-blue">{card.expiryDate}</div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <label className="block text-sm font-semibold text-walle-dark-blue mb-2">
                  Card ID
                </label>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-xs">#</span>
                  </div>
                  <div className="text-lg font-mono text-walle-dark-blue">
                    {card.id.slice(-6).toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Card Status Control */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheckIcon className="w-5 h-5 text-walle-royal-blue" />
            <h4 className="text-lg font-bold text-walle-dark-blue">Status Control</h4>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  card.isActive 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    card.isActive ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </div>
                <div>
                  <div className="font-bold text-walle-dark-blue">
                    {card.isActive ? 'Active' : 'Inactive'}
                  </div>
                  <div className="text-xs text-walle-ocean-blue">
                    {card.isActive 
                      ? 'Ready for transactions' 
                      : 'Disabled for security'}
                  </div>
                </div>
              </div>
              
              <motion.button
                onClick={handleToggleStatus}
                className={`relative w-14 h-8 rounded-full transition-all duration-300 shadow-md ${
                  card.isActive 
                    ? 'bg-green-500 shadow-green-200' 
                    : 'bg-gray-300 shadow-gray-200'
                }`}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm"
                  animate={{ x: card.isActive ? 28 : 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              </motion.button>
            </div>

            {!card.isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
              >
                <div className="text-xs text-yellow-800">
                  ⚠️ <strong>Warning:</strong> Card disabled. Enable to start transactions.
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCardInfoModal && (
        <CardInfoModal
          card={card}
          onClose={() => setShowCardInfoModal(false)}
        />
      )}
      
      {showChangePinModal && (
        <ChangePinModal
          card={card}
          onClose={() => setShowChangePinModal(false)}
        />
      )}
    </div>
  );
}