"use client";
import React from "react";
import { motion } from "framer-motion";
import GlowCard from "../utils/GlowCard";

interface FeatureCardProps {
  title: string;
  description: string;
  gradient: string;
  icon?: string;
  features?: string[];
}

export default function FeatureCard({
  title,
  description,
  gradient,
  icon = "💳",
  features = [],
}: FeatureCardProps) {
  return (
    <GlowCard className="group text-center hover:scale-105 transition-all duration-500">
      {/* Icon */}
      <motion.div
        className="relative mb-6"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl mx-auto flex items-center justify-center shadow-lg relative z-10`}
          animate={{
            boxShadow: [
              "0 10px 40px rgba(14, 165, 233, 0.2)",
              "0 20px 60px rgba(14, 165, 233, 0.4)",
              "0 10px 40px rgba(14, 165, 233, 0.2)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-2xl">{icon}</span>
        </motion.div>
        
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-30`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Title */}
      <h3 className="text-xl font-bold text-dark-800 mb-3 group-hover:text-primary-600 transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-dark-600 leading-relaxed mb-4">
        {description}
      </p>

      {/* Features */}
      {features.length > 0 && (
        <div className="space-y-2">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center gap-2 text-sm text-dark-700"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={`w-2 h-2 bg-gradient-to-r ${gradient} rounded-full`} />
              <span>{feature}</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Gradient Border */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} rounded-b-3xl`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
      />
    </GlowCard>
  );
}