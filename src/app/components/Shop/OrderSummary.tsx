// components/Shop/OrderSummary.tsx (Updated version)
"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCartIcon, CreditCardIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useShop } from "./ShopContext";
import MagneticButton from "../utils/MagneticButton";
import CheckoutProgress from "./CheckoutProgress";

export default function OrderSummary() {
  const { state, dispatch } = useShop();

  useEffect(() => {
    dispatch({ type: 'CALCULATE_TOTALS' });
  }, [state.selectedCard, state.quantity, state.shippingOption, dispatch]);

  const isReadyToCheckout = state.selectedCard && state.shippingOption;

  return (
    <div className="space-y-6 sticky top-8">
      {/* Progress Tracker */}
      <CheckoutProgress />
      
      {/* Order Summary */}
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary-100 rounded-xl">
            <ShoppingCartIcon className="w-6 h-6 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
        </div>

        {/* Selected Card Preview */}
        {state.selectedCard && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-2xl p-4 mb-6"
          >
            <div className="flex items-center gap-4">
              <div className={`w-16 h-10 rounded-lg bg-gradient-to-r ${state.selectedCard.gradient} shadow-lg`}></div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{state.selectedCard.name}</h3>
                <p className="text-sm text-gray-600">Quantity: {state.quantity}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">
                  ${(state.selectedCard.price * state.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Shipping Info */}
        {state.shippingOption && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-gray-200 pt-4 mb-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-gray-900">${state.shippingOption.price}</span>
            </div>
            <div className="text-sm text-gray-500">
              {state.shippingOption.name} - {state.shippingOption.duration}
            </div>
            {state.isWorldwide && (
              <div className="text-xs text-blue-600 mt-1">International shipping</div>
            )}
          </motion.div>
        )}

        {/* Price Breakdown */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-900">${state.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-gray-900">${state.shipping.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium text-gray-900">${state.tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-primary-600">${state.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Promo Code */}
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Promo code"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button className="px-4 py-2 text-primary-600 border border-primary-600 rounded-xl hover:bg-primary-50 transition-colors">
              Apply
            </button>
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-green-50 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheckIcon className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">Secure Checkout</span>
          </div>
          <div className="text-sm text-green-700 space-y-1">
            <div>• 256-bit SSL encryption</div>
            <div>• PCI DSS compliant</div>
            <div>• Money-back guarantee</div>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="space-y-4">
          <MagneticButton
            variant="primary"
            className={`w-full py-4 text-lg font-bold ${
              !isReadyToCheckout ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!isReadyToCheckout}
          >
            <div className="flex items-center justify-center gap-2">
              <CreditCardIcon className="w-5 h-5" />
              Proceed to Checkout
            </div>
          </MagneticButton>

          {!state.selectedCard && (
            <p className="text-sm text-gray-500 text-center">
              Please select a card to continue
            </p>
          )}

          {state.selectedCard && !state.shippingOption && (
            <p className="text-sm text-gray-500 text-center">
              Please select shipping option
            </p>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex items-center justify-between">
              <span>Free returns</span>
              <span className="text-green-600">✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span>2-year warranty</span>
              <span className="text-green-600">✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span>24/7 support</span>
              <span className="text-green-600">✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}