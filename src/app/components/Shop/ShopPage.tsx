// components/Shop/ShopPage.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import ShopHero from "./ShopHero";
import CardSelector from "./CardSelector";
import ShippingOptions from "./ShippingOptions";
import OrderSummary from "./OrderSummary";
import MobileAppPromo from "./MobileAppPromo";
import PaymentMethods from "./PaymentMethods";
import ShippingForm from "./ShippingForm";
import { ShopProvider } from "./ShopContext";

export default function ShopPage() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Shop Hero Section */}
        <ShopHero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Product Selection */}
            <div className="lg:col-span-2 space-y-8">
              {/* Card Selection */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <CardSelector />
              </motion.section>
              
              {/* Shipping Options */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <ShippingOptions />
              </motion.section>
              
              {/* Mobile App Promo */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <MobileAppPromo />
              </motion.section>
              
              {/* Shipping Form */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <ShippingForm />
              </motion.section>
              
              {/* Payment Methods */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <PaymentMethods />
              </motion.section>
            </div>
            
            {/* Right Column - Order Summary (Sticky) */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-24"
              >
                <OrderSummary />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </ShopProvider>
  );
}