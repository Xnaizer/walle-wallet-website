"use client";
import React from "react";
import { motion} from "framer-motion";
import {
  CreditCardIcon,
  ShieldCheckIcon,
  BoltIcon,
  GlobeAltIcon,

} from "@heroicons/react/24/outline";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactElement;
  color: string;
}

export default function SolutionSection () {
  const features: Feature[] = [
    {
      title: "Simple",
      description: "NFC cards that work exactly like traditional debit cards",
      icon: <CreditCardIcon className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Protected",
      description: "Secure NFC chip technology with PIN authentication",
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Rapid",
      description: "Instant blockchain transaction processing",
      icon: <BoltIcon className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Anywhere",
      description: "Global stablecoin support eliminates currency barriers",
      icon: <GlobeAltIcon className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Solution: Walle Wallet
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We bridge the gap between crypto innovation and everyday payment
            convenience through familiar card-based interface powered by
            blockchain technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 mx-auto`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};