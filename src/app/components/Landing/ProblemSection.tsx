"use client";
import React from "react";
import { motion,  } from "framer-motion";
import {

} from "@heroicons/react/24/outline";

interface Problem {
  title: string;
  description: string;
  icon: string;
}

export default function ProblemSection() {
  const problems: Problem[] = [
    {
      title: "High Processing Fees",
      description: "Traditional banking charges 3-5% in processing fees",
      icon: "💳",
    },
    {
      title: "Slow Transactions",
      description: "Conventional systems delay transactions for days",
      icon: "⏰",
    },
    {
      title: "Technical Complexity",
      description: "Crypto payments require expertise most people don't have",
      icon: "🔧",
    },
    {
      title: "International Barriers",
      description: "Cross-border payments remain expensive and slow",
      icon: "🌍",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Problem We&apos;re Solving
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Today&apos;s payment landscape traps users between two broken
            systems, leaving businesses and consumers frustrated with high fees
            and complex processes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-200"
            >
              <div className="text-4xl mb-4">{problem.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {problem.title}
              </h3>
              <p className="text-gray-600">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
