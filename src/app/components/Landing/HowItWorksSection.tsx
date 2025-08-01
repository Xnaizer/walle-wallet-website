"use client";
import React from "react";
import { motion} from "framer-motion";


interface Step {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export default function HowItWorksSection () {
  const steps: Step[] = [
    {
      step: "1",
      title: "Buy NFC Card",
      description: "Purchase your NFC card from Walle Wallet platform",
      icon: "🛒",
    },
    {
      step: "2",
      title: "Connect Card",
      description: "Link your card to the app through our web interface",
      icon: "🔗",
    },
    {
      step: "3",
      title: "Set Allowance",
      description: "Manage spending limits and card settings",
      icon: "⚙️",
    },
    {
      step: "4",
      title: "Convert Currency",
      description: "Convert fiat to crypto seamlessly in the app",
      icon: "💱",
    },
    {
      step: "5",
      title: "Transact Globally",
      description: "Use your card with merchants worldwide",
      icon: "🌐",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with Walle Wallet in just 5 simple steps
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 transform -translate-y-1/2 hidden lg:block"></div>

          <div className="grid lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 relative z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {step.step}
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
                <div className="text-3xl mt-4">{step.icon}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};