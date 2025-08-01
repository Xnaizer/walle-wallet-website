// components/Dashboard/CardSettings.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PencilIcon, KeyIcon, ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";
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

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(card.id);
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

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-walle-dark-blue mb-6">Card Settings</h3>

      <div className="space-y-4">
        {/* Change Card Info Button */}
        <motion.button
          onClick={() => setShowCardInfoModal(true)}
          className="w-full flex items-center gap-3 p-4 bg-walle-soft hover:bg-walle-ice-blue rounded-xl transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 bg-walle-royal-blue/10 rounded-xl flex items-center justify-center">
            <PencilIcon className="w-5 h-5 text-walle-royal-blue" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-semibold text-walle-dark-blue">Change Card Info</div>
            <div className="text-sm text-walle-ocean-blue">Update card name and details</div>
          </div>
        </motion.button>

        {/* Change PIN Button */}
        <motion.button
          onClick={() => setShowChangePinModal(true)}
          className="w-full flex items-center gap-3 p-4 bg-walle-soft hover:bg-walle-ice-blue rounded-xl transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 bg-walle-royal-blue/10 rounded-xl flex items-center justify-center">
            <KeyIcon className="w-5 h-5 text-walle-royal-blue" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-semibold text-walle-dark-blue">Change PIN</div>
            <div className="text-sm text-walle-ocean-blue">Update your card PIN</div>
          </div>
        </motion.button>

        {/* Card ID Section */}
        <div className="border-t border-walle-light-gray pt-4 mt-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-walle-dark-blue mb-2">
              Card Number ID
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={card.cardNumber}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-50 border border-walle-light-gray rounded-lg text-walle-ocean-blue font-mono text-sm"
              />
              <button
                onClick={handleCopyId}
                className="p-2 text-walle-royal-blue hover:text-walle-dark-blue transition-colors"
                title="Copy Card ID"
              >
                {copied ? (
                  <CheckIcon className="w-5 h-5 text-green-600" />
                ) : (
                  <ClipboardIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-walle-dark-blue mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              value={card.expiryDate}
              readOnly
              className="w-full px-3 py-2 bg-gray-50 border border-walle-light-gray rounded-lg text-walle-ocean-blue"
            />
          </div>
        </div>

        {/* Card Status Toggle */}
        <div className="border-t border-walle-light-gray pt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-walle-dark-blue">Card Status</div>
              <div className="text-sm text-walle-ocean-blue">
                {card.isActive ? 'Card is currently active' : 'Card is currently inactive'}
              </div>
            </div>
            <motion.button
              onClick={handleToggleStatus}
              className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                card.isActive ? 'bg-green-500' : 'bg-gray-300'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                animate={{ x: card.isActive ? 24 : 4 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
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