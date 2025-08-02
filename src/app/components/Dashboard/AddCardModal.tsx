// components/Dashboard/AddCardModal.tsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  XMarkIcon,
  CreditCardIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon
} from "@heroicons/react/24/outline";

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (cardData: {
    cardId: string;
    cardName: string;
    pin: string;
  }) => void;
}

export default function AddCardModal({ isOpen, onClose, onConfirm }: AddCardModalProps) {
  const [cardId, setCardId] = useState("");
  const [cardName, setCardName] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!cardId.trim()) {
      newErrors.cardId = "Card ID is required";
    } else if (cardId.length < 8) {
      newErrors.cardId = "Card ID must be at least 8 characters";
    }

    if (!cardName.trim()) {
      newErrors.cardName = "Card name is required";
    } else if (cardName.length < 3) {
      newErrors.cardName = "Card name must be at least 3 characters";
    }

    if (!pin) {
      newErrors.pin = "PIN is required";
    } else if (pin.length !== 6 || !/^\d+$/.test(pin)) {
      newErrors.pin = "PIN must be exactly 6 digits";
    }

    if (!confirmPin) {
      newErrors.confirmPin = "Please confirm your PIN";
    } else if (pin !== confirmPin) {
      newErrors.confirmPin = "PINs do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onConfirm({
        cardId: cardId.trim(),
        cardName: cardName.trim(),
        pin: pin
      });
      
      // Reset form
      setCardId("");
      setCardName("");
      setPin("");
      setConfirmPin("");
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setCardId("");
    setCardName("");
    setPin("");
    setConfirmPin("");
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Sangat transparan
          backdropFilter: 'blur(2px)',
        }}
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border-2 border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-walle-dark-blue flex items-center gap-3">
              <CreditCardIcon className="w-6 h-6 text-walle-royal-blue" />
              Add New Card
            </h3>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Modal Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Card ID Input */}
            <div>
              <label className="block text-sm font-semibold text-walle-dark-blue mb-2">
                Card ID
              </label>
              <input
                type="text"
                value={cardId}
                onChange={(e) => setCardId(e.target.value)}
                placeholder="Enter your card ID (min. 8 characters)"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.cardId 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-walle-royal-blue'
                }`}
              />
              {errors.cardId && (
                <p className="text-red-500 text-sm mt-1">{errors.cardId}</p>
              )}
            </div>

            {/* Card Name Input */}
            <div>
              <label className="block text-sm font-semibold text-walle-dark-blue mb-2">
                Card Name
              </label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Enter card name (e.g., My Main Card)"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.cardName 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-walle-royal-blue'
                }`}
              />
              {errors.cardName && (
                <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
              )}
            </div>

            {/* PIN Input */}
            <div>
              <label className="block text-sm font-semibold text-walle-dark-blue mb-2">
                <LockClosedIcon className="w-4 h-4 inline mr-1" />
                Set PIN (6 digits)
              </label>
              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit PIN"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all pr-12 ${
                    errors.pin 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-walle-royal-blue'
                  }`}
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPin ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.pin && (
                <p className="text-red-500 text-sm mt-1">{errors.pin}</p>
              )}
            </div>

            {/* Confirm PIN Input */}
            <div>
              <label className="block text-sm font-semibold text-walle-dark-blue mb-2">
                Confirm PIN
              </label>
              <div className="relative">
                <input
                  type={showConfirmPin ? "text" : "password"}
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Confirm your 6-digit PIN"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all pr-12 ${
                    errors.confirmPin 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-walle-royal-blue'
                  }`}
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPin(!showConfirmPin)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPin ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPin && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPin}</p>
              )}
            </div>

            {/* Security Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <LockClosedIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-800 mb-1">
                    Security Information
                  </h4>
                  <p className="text-xs text-blue-600">
                    Your PIN is encrypted and stored securely. Make sure to remember it as it will be required for transactions.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl cursor-pointer font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white hover:text-slate-100 rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Add Card
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}