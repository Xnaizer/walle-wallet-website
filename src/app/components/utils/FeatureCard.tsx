"use client";
import React from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  gradient: string;
}

export default function FeatureCard({
  title,
  description,
  gradient,
} : FeatureCardProps ) {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg"
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-lg mb-4`}
      ></div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};