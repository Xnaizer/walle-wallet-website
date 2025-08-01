// components/Dashboard/DashboardPinModal.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  XMarkIcon, 
  KeyIcon, 
  EyeIcon, 
  EyeSlashIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  CheckIcon
} from "@heroicons/react/24/outline";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input when step changes
  useEffect(() => {
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  }, [step]);

  const handlePinChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value) || value.length > 1) return;
    
    let newPinArray;
    
    switch (step) {
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
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    const currentPinArray = step === 'current' ? currentPin : step === 'new' ? newPin : confirmPin;
    
    if (e.key === 'Backspace') {
      if (!currentPinArray[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else if (currentPinArray[index]) {
        // Clear current input
        const newPinArray = [...currentPinArray];
        newPinArray[index] = '';
        
        switch (step) {
          case 'current': setCurrentPin(newPinArray); break;
          case 'new': setNewPin(newPinArray); break;
          case 'confirm': setConfirmPin(newPinArray); break;
        }
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const currentPinArray = step === 'current' ? currentPin : step === 'new' ? newPin : confirmPin;
    const newPinArray = [...currentPinArray];
    
    for (let i = 0; i < pastedData.length; i++) {
      newPinArray[i] = pastedData[i];
    }
    
    switch (step) {
      case 'current': setCurrentPin(newPinArray); break;
      case 'new': setNewPin(newPinArray); break;
      case 'confirm': setConfirmPin(newPinArray); break;
    }
    
    // Focus the next empty input or the last one
    const nextEmptyIndex = newPinArray.findIndex(digit => !digit);
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleNext = async () => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    switch (step) {
      case 'current':
        if (currentPin.some(digit => !digit)) {
          setError('Please enter your current dashboard PIN');
          setIsSubmitting(false);
          return;
        }
        // In real app, verify current PIN here
        setStep('new');
        break;
        
      case 'new':
        if (newPin.some(digit => !digit)) {
          setError('Please enter a new dashboard PIN');
          setIsSubmitting(false);
          return;
        }
        if (newPin.join('') === currentPin.join('')) {
          setError('New PIN must be different from current PIN');
          setIsSubmitting(false);
          return;
        }
        setStep('confirm');
        break;
        
      case 'confirm':
        if (confirmPin.some(digit => !digit)) {
          setError('Please confirm your new dashboard PIN');
          setIsSubmitting(false);
          return;
        }
        if (newPin.join('') !== confirmPin.join('')) {
          setError('PINs do not match. Please try again.');
          setConfirmPin(['', '', '', '', '', '']);
          setIsSubmitting(false);
          setTimeout(() => inputRefs.current[0]?.focus(), 100);
          return;
        }
        // Dashboard PIN changed successfully
        onClose();
        break;
    }
    
    setIsSubmitting(false);
  };

  const handleBack = () => {
    if (step === 'new') {
      setStep('current');
      setNewPin(['', '', '', '', '', '']);
    } else if (step === 'confirm') {
      setStep('new');
      setConfirmPin(['', '', '', '', '', '']);
    }
    setError('');
  };

  const clearAll = () => {
    switch (step) {
      case 'current': 
        setCurrentPin(['', '', '', '', '', '']);
        break;
      case 'new': 
        setNewPin(['', '', '', '', '', '']);
        break;
      case 'confirm': 
        setConfirmPin(['', '', '', '', '', '']);
        break;
    }
    inputRefs.current[0]?.focus();
  };

  const getCurrentPin = () => {
    switch (step) {
      case 'current': return currentPin;
      case 'new': return newPin;
      case 'confirm': return confirmPin;
    }
  };

  const getTitle = () => {
    switch (step) {
      case 'current': return 'Enter Current PIN';
      case 'new': return 'Create New PIN';
      case 'confirm': return 'Confirm New PIN';
    }
  };

  const getDescription = () => {
    switch (step) {
      case 'current': return 'Enter your current 6-digit dashboard PIN';
      case 'new': return 'Create a new 6-digit PIN for dashboard access';
      case 'confirm': return 'Please confirm your new dashboard PIN';
    }
  };

  const getStepNumber = () => {
    switch (step) {
      case 'current': return 0;
      case 'new': return 1;
      case 'confirm': return 2;
    }
  };

  const currentPinArray = getCurrentPin();
  const isComplete = currentPinArray.every(digit => digit !== '');
  const progress = (currentPinArray.filter(digit => digit !== '').length / 6) * 100;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -30 }}
          transition={{ 
            duration: 0.4,
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-neutral-200/20 relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-100/30 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary-100/30 to-transparent rounded-full blur-xl"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-xl transition-colors z-10 cursor-pointer"
          >
            <XMarkIcon className="w-5 h-5 text-neutral-600" />
          </button>

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <KeyIcon className="w-8 h-8 text-white" />
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 animate-ping opacity-10"></div>
            </motion.div>
            
            <motion.h2 
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-500 bg-clip-text text-transparent mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {getTitle()}
            </motion.h2>
            
            <motion.p 
              className="text-neutral-600 text-sm leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {getDescription()}
            </motion.p>

            {/* Progress Steps */}
            <motion.div
              className="flex items-center justify-center gap-2 mt-4"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[0, 1, 2].map((stepIndex) => (
                <div
                  key={stepIndex}
                  className={`w-8 h-1.5 rounded-full transition-all duration-300 ${
                    stepIndex === getStepNumber() 
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600' 
                      : stepIndex < getStepNumber() 
                        ? 'bg-green-500' 
                        : 'bg-neutral-200'
                  }`}
                />
              ))}
            </motion.div>

            {/* Current step progress */}
            <motion.div
              className="mt-2 w-full bg-neutral-200 rounded-full h-1 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </motion.div>
          </div>

          {/* PIN Input */}
          <div className="mb-8 relative z-10">
            <motion.div 
              className="flex justify-center gap-3 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              {currentPinArray.map((digit, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <input
                    ref={(el) => inputRefs.current[index] = el}
                    id={`dashboard-pin-input-${index}`}
                    type={showPin ? "text" : "password"}
                    value={digit}
                    onChange={(e) => handlePinChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                      digit 
                        ? 'border-primary-500 bg-primary-50/50 text-primary-700' 
                        : 'border-neutral-300 focus:border-primary-500'
                    } focus:ring-2 focus:ring-primary-200 focus:scale-105`}
                    maxLength={1}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                  {digit && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-primary-500/10"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
            
            {/* Show/Hide PIN Toggle & Clear All */}
            <motion.div 
              className="flex justify-center gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <button
                onClick={() => setShowPin(!showPin)}
                className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-600 transition-colors duration-300 px-3 py-1.5 rounded-lg hover:bg-neutral-50"
              >
                {showPin ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                {showPin ? 'Hide PIN' : 'Show PIN'}
              </button>

              {currentPinArray.some(digit => digit !== '') && (
                <button
                  onClick={clearAll}
                  className="text-sm text-neutral-500 hover:text-red-500 transition-colors duration-300 px-3 py-1.5 rounded-lg hover:bg-red-50"
                >
                  Clear All
                </button>
              )}
            </motion.div>
            
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className="bg-red-50 border border-red-200 text-red-600 text-sm text-center py-3 px-4 rounded-xl mb-4 relative"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 relative z-10">
            {/* Submit Button */}
            <motion.button
              onClick={handleNext}
              disabled={!isComplete || isSubmitting}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform relative overflow-hidden ${
                isComplete && !isSubmitting
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={isComplete && !isSubmitting ? { scale: 1.02 } : {}}
              whileTap={isComplete && !isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                <>
                  {step === 'confirm' ? (
                    <div className="flex items-center justify-center gap-2">
                      <CheckIcon className="w-5 h-5" />
                      Change Dashboard PIN
                    </div>
                  ) : (
                    'Continue'
                  )}
                  {isComplete && (
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-xl"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </>
              )}
            </motion.button>

            {/* Back Button */}
            <AnimatePresence>
              {step !== 'current' && (
                <motion.button
                  onClick={handleBack}
                  className="w-full py-3 text-neutral-600 hover:text-primary-600 transition-all duration-300 font-medium rounded-xl hover:bg-neutral-50 flex items-center justify-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 1.0 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  Back to {step === 'new' ? 'Current PIN' : 'New PIN'}
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Security Note */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-6 text-center relative z-10"
          >
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 bg-neutral-50/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-neutral-200/50">
              <ShieldCheckIcon className="w-3 h-3" />
              <span>Dashboard PIN is separate from your card PINs</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}