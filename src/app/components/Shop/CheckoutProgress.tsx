// components/Shop/CheckoutProgress.tsx (Compact Version)
"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useShop } from "./ShopContext";

const steps = [
  { id: 1, name: "Card", description: "Select" },
  { id: 2, name: "Shipping", description: "Delivery" },
  { id: 3, name: "Details", description: "Information" },
  { id: 4, name: "Payment", description: "Complete" },
];

export default function CheckoutProgress() {
  const { state } = useShop();

  const getCurrentStep = () => {
    if (!state.selectedCard) return 0;
    if (!state.shippingOption) return 1;
    if (state.shippingOption && state.selectedCard) return 2;
    return 3;
  };

  const currentStep = getCurrentStep();

  return (
    <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
        <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>
      
      <div className="relative">
        {/* Background Line */}
        <div className="absolute top-6 left-6 right-6 h-1 bg-gray-200 rounded-full"></div>
        
        {/* Progress Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute top-6 left-6 h-1 bg-gradient-to-r from-green-400 to-primary-500 rounded-full z-10"
        />
        
        <div className="flex justify-between items-start relative z-20">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center group">
              {/* Circle */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: index <= currentStep ? 1.1 : 0.9 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15,
                  delay: index * 0.1 
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center border-3 shadow-lg relative ${
                  index < currentStep
                    ? "bg-green-500 border-green-500 text-white"
                    : index === currentStep
                    ? "bg-primary-500 border-primary-500 text-white shadow-primary-200"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {index < currentStep ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <CheckIcon className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <span className="text-sm font-bold">{step.id}</span>
                )}
                
                {/* Pulse effect for current step */}
                {index === currentStep && (
                  <motion.div
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-primary-400 opacity-25"
                  />
                )}
              </motion.div>
              
              {/* Text */}
              <div className="mt-3 text-center">
                <div className={`text-sm font-semibold transition-colors ${
                  index <= currentStep ? "text-gray-900" : "text-gray-400"
                }`}>
                  {step.name}
                </div>
                <div className={`text-xs transition-colors ${
                  index <= currentStep ? "text-gray-600" : "text-gray-400"
                }`}>
                  {step.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Current Step Info */}
      <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-100">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-primary-900">
              Current: {steps[currentStep]?.name}
            </div>
            <div className="text-xs text-primary-700">
              {steps[currentStep]?.description}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </div>
            <div className="text-xs text-primary-600">Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
}