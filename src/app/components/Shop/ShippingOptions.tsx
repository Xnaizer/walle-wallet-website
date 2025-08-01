// components/Shop/ShippingOptions.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { TruckIcon, GlobeAltIcon, ClockIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useShop, ShippingOption } from "./ShopContext";

const localShippingOptions: ShippingOption[] = [
  {
    id: "standard-local",
    name: "Standard Shipping",
    price: 5.99,
    duration: "3-5 business days",
    description: "Regular delivery to your doorstep"
  },
  {
    id: "express-local", 
    name: "Express Shipping",
    price: 12.99,
    duration: "1-2 business days",
    description: "Priority delivery for faster arrival"
  },
  {
    id: "overnight-local",
    name: "Overnight Shipping",
    price: 24.99,
    duration: "Next business day",
    description: "Express overnight delivery"
  }
];

const worldwideShippingOptions: ShippingOption[] = [
  {
    id: "standard-worldwide",
    name: "International Standard",
    price: 15.99,
    duration: "7-14 business days",
    description: "Standard international delivery"
  },
  {
    id: "express-worldwide",
    name: "International Express", 
    price: 29.99,
    duration: "3-7 business days",
    description: "Express international delivery"
  },
  {
    id: "priority-worldwide",
    name: "International Priority",
    price: 49.99,
    duration: "1-3 business days",
    description: "Priority international delivery"
  }
];

export default function ShippingOptions() {
  const { state, dispatch } = useShop();
  
  const currentOptions = state.isWorldwide ? worldwideShippingOptions : localShippingOptions;

  const handleShippingToggle = (isWorldwide: boolean) => {
    dispatch({ type: 'SET_WORLDWIDE', payload: isWorldwide });
    dispatch({ type: 'SELECT_SHIPPING', payload: currentOptions[0] });
    dispatch({ type: 'CALCULATE_TOTALS' });
  };

  const handleShippingSelect = (option: ShippingOption) => {
    dispatch({ type: 'SELECT_SHIPPING', payload: option });
    dispatch({ type: 'CALCULATE_TOTALS' });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Shipping Options</h2>
          <p className="text-gray-600">Choose your delivery preference</p>
        </div>
      </div>

      {/* Local vs Worldwide Toggle */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-2xl flex">
          <button
            onClick={() => handleShippingToggle(false)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              !state.isWorldwide
                ? 'bg-white shadow-md text-primary-600'
                : 'text-gray-600 hover:text-primary-600'
            }`}
          >
            <TruckIcon className="w-5 h-5" />
            Local Shipping
          </button>
          <button
            onClick={() => handleShippingToggle(true)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              state.isWorldwide
                ? 'bg-white shadow-md text-primary-600'
                : 'text-gray-600 hover:text-primary-600'
            }`}
          >
            <GlobeAltIcon className="w-5 h-5" />
            Worldwide Shipping
          </button>
        </div>
      </div>

      {/* Shipping Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => handleShippingSelect(option)}
            className={`relative cursor-pointer border-2 rounded-2xl p-6 transition-all duration-300 ${
              state.shippingOption?.id === option.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300 bg-white'
            }`}
          >
            {/* Selected Indicator */}
            {state.shippingOption?.id === option.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
              >
                <CheckIcon className="w-4 h-4 text-white" />
              </motion.div>
            )}

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className={`p-3 rounded-2xl ${
                  state.shippingOption?.id === option.id 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <ClockIcon className="w-6 h-6" />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{option.description}</p>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary-600">${option.price}</div>
                <div className="text-sm font-medium text-gray-700">{option.duration}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-8 p-6 bg-blue-50 rounded-2xl">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <TruckIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipping Information</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• All orders are tracked and insured</li>
              <li>• Signature confirmation required for delivery</li>
              <li>• Cards are shipped in discrete, secure packaging</li>
              {state.isWorldwide && <li>• International orders may be subject to customs fees</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}