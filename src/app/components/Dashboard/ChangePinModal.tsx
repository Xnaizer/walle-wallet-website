// components/Dashboard/ChangePinModal.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  EyeIcon, 
  EyeSlashIcon, 
  ShieldCheckIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { WalletCard } from "./DashboardContext";

interface ChangePinModalProps {
  card: WalletCard;
  onClose: () => void;
}

export default function ChangePinModal({ card, onClose }: ChangePinModalProps) {
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
    const currentPinArray = getCurrentPin();
    
    if (e.key === 'Backspace') {
      if (!currentPinArray[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else if (currentPinArray[index]) {
        // Clear current input
        const newPinArray = [...currentPinArray];
        newPinArray[index] = '';
        updateCurrentPin(newPinArray);
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
    const newPinArray = [...getCurrentPin()];
    
    for (let i = 0; i < pastedData.length; i++) {
      newPinArray[i] = pastedData[i];
    }
    
    updateCurrentPin(newPinArray);
    
    // Focus the next empty input or the last one
    const nextEmptyIndex = newPinArray.findIndex(digit => !digit);
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
    inputRefs.current[focusIndex]?.focus();
  };

  const updateCurrentPin = (newPinArray: string[]) => {
    switch (step) {
      case 'current':
        setCurrentPin(newPinArray);
        break;
      case 'new':
        setNewPin(newPinArray);
        break;
      case 'confirm':
        setConfirmPin(newPinArray);
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

  const clearCurrentPin = () => {
    const emptyPin = ['', '', '', '', '', ''];
    updateCurrentPin(emptyPin);
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    switch (step) {
      case 'current':
        if (getCurrentPin().some(digit => !digit)) {
          setError('Please enter your current PIN');
          setIsSubmitting(false);
          return;
        }
        // In real app, verify current PIN here
        setStep('new');
        break;
        
      case 'new':
        if (getCurrentPin().some(digit => !digit)) {
          setError('Please enter a new PIN');
          setIsSubmitting(false);
          return;
        }
        setStep('confirm');
        break;
        
      case 'confirm':
        if (getCurrentPin().some(digit => !digit)) {
          setError('Please confirm your new PIN');
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
        // PIN changed successfully
        onClose();
        break;
    }
    
    setIsSubmitting(false);
  };

  const handleBack = () => {
    setError('');
    if (step === 'new') {
      setStep('current');
      setNewPin(['', '', '', '', '', '']);
    } else if (step === 'confirm') {
      setStep('new');
      setConfirmPin(['', '', '', '', '', '']);
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
      case 'current': return `Enter your current 6-digit PIN for ${card.name} to proceed`;
      case 'new': return 'Create a strong 6-digit PIN for enhanced security';
      case 'confirm': return 'Re-enter your new PIN to confirm the changes';
    }
  };

  const getStepNumber = () => {
    switch (step) {
      case 'current': return 1;
      case 'new': return 2; 
      case 'confirm': return 3;
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
        onClick={(e) => e.target === e.currentTarget && onClose()}
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
          className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200/20 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-100/30 to-transparent rounded-full blur-xl"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-slate-100/50 rounded-xl transition-colors z-20"
          >
            <XMarkIcon className="w-5 h-5 text-slate-600" />
          </button>

          {/* Header */}
          <div className="text-center mb-8 relative z-10">

            

            
            <motion.h2 
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-emerald-500 bg-clip-text text-transparent mb-3 mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {getTitle()}
            </motion.h2>

            <motion.div
              className="flex items-center justify-center gap-2 mb-6 mt-6" 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              {[1, 2, 3].map((stepNum, index) => {
                const isActive = stepNum === getStepNumber();
                const isCompleted = getStepNumber() > stepNum;
                
                return (
                  <div key={stepNum} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-emerald-500 text-white' 
                        : isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {isCompleted ? <CheckCircleIcon className="w-4 h-4" /> : stepNum}
                    </div>
                    {index < 2 && (
                      <div className={`w-8 h-0.5 mx-1 transition-colors duration-300 ${
                        isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </motion.div>
            
            <motion.p 
              className="text-slate-600 text-sm leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {getDescription()}
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="mt-4 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
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
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    id={`pin-input-${index}`}
                    type={showPin ? "text" : "password"}
                    value={digit}
                    onChange={(e) => handlePinChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                      digit 
                        ? 'border-blue-500 bg-blue-50/50 text-blue-700' 
                        : 'border-slate-300 focus:border-blue-500'
                    } focus:ring-2 focus:ring-blue-200 focus:scale-105`}
                    maxLength={1}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                  {digit && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-blue-500/10"
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
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors duration-300 px-3 py-1.5 rounded-lg hover:bg-slate-50"
              >
                {showPin ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                {showPin ? 'Hide PIN' : 'Show PIN'}
              </button>

              {currentPinArray.some(digit => digit !== '') && (
                <button
                  onClick={clearCurrentPin}
                  className="text-sm text-slate-500 hover:text-red-500 transition-colors duration-300 px-3 py-1.5 rounded-lg hover:bg-red-50"
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

          {/* Security Tips */}
          {step === 'new' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-xl p-4 mb-6 relative z-10"
            >
              <div className="text-blue-800 text-xs">
                <div className="font-semibold mb-2 flex items-center gap-2">
                  💡 PIN Security Tips:
                </div>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Avoid sequential numbers (123456)</li>
                  <li>Don&apos;t use birthdays or common patterns</li>
                  <li>Keep your PIN private and secure</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            onClick={handleSubmit}
            disabled={!isComplete || isSubmitting}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform relative overflow-hidden ${
              isComplete && !isSubmitting
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
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
                {step === 'current' ? 'Verify Current PIN' : 
                 step === 'new' ? 'Set New PIN' : 'Confirm PIN Change'}
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
                className="w-full mt-4 py-3 text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium rounded-xl hover:bg-slate-50 flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 1.0 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <ArrowLeftIcon className="w-4 h-4" />
                {step === 'new' ? 'Back to Current PIN' : 'Back to New PIN'}
              </motion.button>
            )}
          </AnimatePresence>

          {/* Security Note */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-6 text-center relative z-10"
          >
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 bg-slate-50/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-200/50">
              <ShieldCheckIcon className="w-3 h-3" />
              <span>Your PIN is stored securely and encrypted</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}