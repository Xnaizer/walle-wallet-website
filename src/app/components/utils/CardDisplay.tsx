"use client";
import React, { useState} from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function CardDisplay() {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="relative">
      {/* Floating elements */}
      <motion.div
        className="absolute -top-10 -left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Card */}
      <motion.div
        className="relative w-80 h-48 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-2xl shadow-2xl cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
          scale: 1.05,
          rotateY: 5,
          boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Card Content */}
        <div className="relative p-6 h-full flex flex-col justify-between text-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold">Walle Card</h3>
              <p className="text-blue-100 text-sm">NFC Enabled</p>
            </div>
            <div className="flex gap-1">
              <div className="w-8 h-6 bg-white/20 rounded"></div>
              <div className="w-6 h-6 bg-white/30 rounded-full"></div>
            </div>
          </div>

          <div>
            <div className="text-lg font-mono mb-2">**** **** **** 1234</div>
            <div className="flex justify-between text-sm">
              <span>VALID THRU</span>
              <span>12/28</span>
            </div>
          </div>
        </div>

        {/* NFC Symbol */}
        <motion.div
          className="absolute top-4 right-4 w-8 h-8"
          animate={{ rotate: isHovered ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full h-full border-2 border-white/50 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 border border-white/50 rounded-full"></div>
          </div>
        </motion.div>
      </motion.div>

      {/* Transaction Animation */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            ✓ Transaction Complete
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};