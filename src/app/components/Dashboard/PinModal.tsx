// components/Dashboard/PinModal.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useDashboard } from "./DashboardContext";

export default function PinModal() {
  const { state, dispatch } = useDashboard();
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [confirmPin, setConfirmPin] = useState(['', '', '', '', '', '']);
  const [isConfirming, setIsConfirming] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newPin = isConfirming ? [...confirmPin] : [...pin];
    newPin[index] = value;
    
    if (isConfirming) {
      setConfirmPin(newPin);
    } else {
      setPin(newPin);
    }
    
    setError('');
    
    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`pin-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = () => {
    if (!state.hasPin) {
      // Setting new PIN
      if (!isConfirming) {
        if (pin.some(digit => !digit)) {
          setError('Please enter a complete 6-digit PIN');
          return;
        }
        setIsConfirming(true);
        return;
      }
      
      // Confirming PIN
      if (pin.join('') !== confirmPin.join('')) {
        setError('PINs do not match. Please try again.');
        setConfirmPin(['', '', '', '', '', '']);
        return;
      }
      
      dispatch({ type: 'SET_PIN', payload: true });
    }
    
    // PIN verified or set successfully
    dispatch({ type: 'CLOSE_PIN_MODAL' });
  };

  const currentPin = isConfirming ? confirmPin : pin;
  const isComplete = currentPin.every(digit => digit !== '');

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
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-walle-gradient rounded-full flex items-center justify-center mx-auto mb-4">
            <LockClosedIcon className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-walle-dark-blue mb-2">
            {state.hasPin 
              ? 'Enter Your PIN' 
              : isConfirming 
                ? 'Confirm Your PIN'
                : 'Create Your PIN'
            }
          </h2>
          
          <p className="text-walle-ocean-blue text-sm">
            {state.hasPin
              ? 'Enter your 6-digit PIN to access your dashboard'
              : isConfirming
                ? 'Please confirm your 6-digit PIN'
                : 'Create a 6-digit PIN for dashboard access'
            }
          </p>
        </div>

        {/* PIN Input */}
        <div className="mb-6">
          <div className="flex justify-center gap-3 mb-4">
            {currentPin.map((digit, index) => (
              <input
                key={index}
                id={`pin-input-${index}`}
                type={showPin ? "text" : "password"}
                value={digit}
                onChange={(e) => handlePinChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-walle-light-gray rounded-xl focus:border-walle-royal-blue focus:outline-none transition-colors"
                maxLength={1}
              />
            ))}
          </div>
          
          {/* Show/Hide PIN Toggle */}
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowPin(!showPin)}
              className="flex items-center gap-2 text-sm text-walle-ocean-blue hover:text-walle-dark-blue transition-colors"
            >
              {showPin ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
              {showPin ? 'Hide PIN' : 'Show PIN'}
            </button>
          </div>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center mb-4"
            >
              {error}
            </motion.div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isComplete}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
            isComplete
              ? 'bg-walle-gradient text-white shadow-lg hover:shadow-xl'
              : 'bg-walle-light-gray text-gray-400 cursor-not-allowed'
          }`}
        >
          {state.hasPin 
            ? 'Access Dashboard' 
            : isConfirming 
              ? 'Confirm PIN'
              : 'Set PIN'
          }
        </button>

        {/* Back Button for Confirmation */}
        {isConfirming && !state.hasPin && (
          <button
            onClick={() => {
              setIsConfirming(false);
              setConfirmPin(['', '', '', '', '', '']);
              setError('');
            }}
            className="w-full mt-3 py-2 text-walle-ocean-blue hover:text-walle-dark-blue transition-colors"
          >
            Back to Create PIN
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}