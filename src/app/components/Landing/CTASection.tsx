"use client";
import React from "react";
import { motion} from "framer-motion";
import {
  ShieldCheckIcon,
  BoltIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

export default function CTASection ()  {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Payments?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the revolution and experience the future of payments with Walle
            Wallet. Get your NFC card today and start transacting globally.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-200"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(255,255,255,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Your Card Now
            </motion.button>

            <motion.button
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex items-center justify-center gap-8 text-white/80 flex-wrap">
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5" />
                <span className="text-sm">Bank-Grade Security</span>
              </div>
              <div className="flex items-center gap-2">
                <BoltIcon className="w-5 h-5" />
                <span className="text-sm">Instant Transactions</span>
              </div>
              <div className="flex items-center gap-2">
                <GlobeAltIcon className="w-5 h-5" />
                <span className="text-sm">Global Coverage</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};