"use client";
import React from "react";
import { motion} from "framer-motion";
import {
  CheckIcon,
} from "@heroicons/react/24/outline";
import FeatureCard from "../utils/FeatureCard";


export default function FeaturesSection()  {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Advanced Features for Modern Payments
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Experience the future of payments with our comprehensive suite of
              features designed for both consumers and merchants.
            </p>

            <div className="space-y-6">
              {[
                "Multi-card management from single dashboard",
                "Real-time transaction notifications",
                "Advanced security with PIN authentication",
                "International payment support",
                "Merchant EDC integration",
                "Stablecoin stability",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid gap-6"
          >
            <FeatureCard
              title="Web Management"
              description="Complete control over your cards and transactions"
              gradient="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              title="Mobile EDC"
              description="Simple payment processing for merchants"
              gradient="from-purple-500 to-pink-500"
            />
            <FeatureCard
              title="NFC Technology"
              description="Secure tap-and-pay functionality"
              gradient="from-green-500 to-emerald-500"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
