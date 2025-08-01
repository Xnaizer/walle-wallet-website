// components/Dashboard/DashboardPinModal.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { XMarkIcon, KeyIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface DashboardPinModalProps {
  onClose: () => void;
}

export default function DashboardPinModal({ onClose }: DashboardPinModalProps) {
  const [currentPin, setCurrentPin] = useState(['', '', '', '', '', '']);
  const [newPin, setNewPin] = useState(['', '', '', '', '', '']);
  const [confirmPin, setConfirmPin] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'current' | 'new' | 'confirm'>('current');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');

  const handlePinChange = (index: number, value: string, pinType: 'current' | 'new' | 'confirm') => {
    if (value.length > 1) return;
    
    let newPinArray;
    
    switch (pinType) {
      case 'current':
        newPinArray = [...currentPin];
        newPinArray[index] = value;
        setCurrentPin(newPinArray);
        break;
      case 'new':
        newPinArray = [...newPin];
        newPinArray[index] = value;
        setNewPin(newPinArray);
        break;
      case 'confirm':
        newPinArray = [...confirmPin];
        newPinArray[index] = value;
        setConfirmPin(newPinArray);
        break;
    }
    
    setError('');
    
    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`dashboard-${pinType}-pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent, pinType: 'current' | 'new' | 'confirm') => {
    const currentPinArray = pinType === 'current' ? currentPin : pinType === 'new' ? newPin : confirmPin;
    
    if (e.key === 'Backspace' && !currentPinArray[index] && index > 0) {
      const prevInput = document.getElementById(`dashboard-${pinType}-pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleNext = () => {
    switch (step) {
      case 'current':
        if (currentPin.some(digit => !digit)) {
          setError('Please enter your current dashboard PIN');
          return;
        }
        // In real app, verify current PIN here
        setStep('new');
        break;
        
      case 'new':
        if (newPin.some(digit => !digit)) {
          setError('Please enter a new dashboard PIN');
          return;
        }
        if (newPin.join('') === currentPin.join('')) {
          setError('New PIN must be different from current PIN');
          return;
        }
        setStep('confirm');
        break;
        
      case 'confirm':
        if (confirmPin.some(digit => !digit)) {
          setError('Please confirm your new dashboard PIN');
          return;
        }
        if (newPin.join('') !== confirmPin.join('')) {
          setError('PINs do not match. Please try again.');
          setConfirmPin(['', '', '', '', '', '']);
          return;
        }
        // Dashboard PIN changed successfully
        onClose();
        break;
    }
  };

  const getCurrentPin = () => {
    switch (step) {
      case 'current': return currentPin;
      case 'new': return newPin;
      case 'confirm': return confirmPin;
    }
  };

  const getCurrentStep = () => {
    switch (step) {
      case 'current': return 'current';
      case 'new': return 'new';
      case 'confirm': return 'confirm';
    }
  };

  const getTitle = () => {
    switch (step) {
      case 'current': return 'Enter Current Dashboard PIN';
      case 'new': return 'Enter New Dashboard PIN';
      case 'confirm': return 'Confirm New Dashboard PIN';
    }
  };

  const getDescription = () => {
    switch (step) {
      case 'current': return 'Please enter your current 6-digit dashboard PIN';
      case 'new': return 'Create a new 6-digit PIN for dashboard access';
      case 'confirm': return 'Please confirm your new dashboard PIN';
    }
  };

  const isComplete = getCurrentPin().every(digit => digit !== '');

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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-walle-gradient rounded-xl flex items-center justify-center">
              <KeyIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-walle-dark-blue">{getTitle()}</h2>
              <div className="text-sm text-walle-ocean-blue">Dashboard Security</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-walle-light-gray rounded-xl transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-walle-ocean-blue" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {['current', 'new', 'confirm'].map((stepName, index) => (
            <div
              key={stepName}
              className={`w-12 h-2 rounded-full transition-colors ${
                stepName === step ? 'bg-walle-royal-blue' : 
                ['current', 'new', 'confirm'].indexOf(step) > index ? 'bg-green-500' : 'bg-walle-light-gray'
              }`}
            />
          ))}
        </div>

        <div className="text-center mb-8">
          <p className="text-walle-ocean-blue">{getDescription()}</p>
          <div className="mt-2 text-sm text-walle-ocean-blue bg-walle-soft rounded-xl p-3">
            <strong>Note:</strong> This PIN is different from your card PINs and is used specifically for dashboard access.
          </div>
        </div>

        {/* PIN Input */}
        <div className="mb-8">
          <div className="flex justify-center gap-3 mb-6">
            {getCurrentPin().map((digit, index) => (
              <input
                key={index}
                id={`dashboard-${getCurrentStep()}-pin-${index}`}
                type={showPin ? "text" : "password"}
                value={digit}
                onChange={(e) => handlePinChange(index, e.target.value, getCurrentStep())}
                onKeyDown={(e) => handleKeyDown(index, e, getCurrentStep())}
                className="w-14 h-14 text-center text-xl font-bold border-2 border-walle-light-gray rounded-xl focus:border-walle-royal-blue focus:outline-none transition-colors"
                maxLength={1}
              />
            ))}
          </div>
          
          {/* Show/Hide PIN Toggle */}
          <div className="flex justify-center mb-6">
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
              className="text-red-500 text-sm text-center mb-6 bg-red-50 rounded-xl p-3 border border-red-200"
            >
              {error}
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {step !== 'current' && (
            <button
              onClick={() => {
                if (step === 'new') {
                  setStep('current');
                  setNewPin(['', '', '', '', '', '']);
                } else {
                  setStep('new');
                  setConfirmPin(['', '', '', '', '', '']);
                }
                setError('');
              }}
              className="flex-1 px-6 py-3 border-2 border-walle-light-gray text-walle-ocean-blue rounded-xl font-semibold hover:bg-walle-light-gray transition-all duration-300"
            >
              Back
            </button>
          )}
          
          <button
            onClick={step === 'current' && !isComplete ? onClose : handleNext}
            disabled={!isComplete && step !== 'current'}
            className={`${step === 'current' && !isComplete ? 'flex-1' : 'flex-1'} px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              isComplete || step === 'current'
                ? 'bg-walle-gradient text-white shadow-lg hover:shadow-xl'
                : 'bg-walle-light-gray text-gray-400 cursor-not-allowed'
            }`}
          >
            {step === 'current' && !isComplete ? 'Cancel' : 
             step === 'confirm' ? 'Change Dashboard PIN' : 'Next'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}