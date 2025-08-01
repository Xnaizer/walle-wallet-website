"use client";
import React  from "react";
import { motion} from "framer-motion";
import {
  ArrowRightIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import CardDisplay from "../utils/CardDisplay";

export default function HeroSection() {
  return (
    <section className="pt-20 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your Everyday{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Payment Card
              </span>{" "}
              and Wallet
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Tap. Pay. Done. Crypto Anywhere. The revolutionary DApp that
              bridges cryptocurrency and everyday payments through NFC-enabled
              cards. Easy, fast, safe.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get Your Card Now
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>

              <motion.button
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlayIcon className="w-5 h-5" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$7T</div>
                <div className="text-sm text-gray-600">Global Market</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">0.1s</div>
                <div className="text-sm text-gray-600">Transaction Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100+</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-end"
          >
            <CardDisplay />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
