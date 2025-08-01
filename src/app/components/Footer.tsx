"use client";
import React from "react";
import { motion} from "framer-motion";
import {
  CreditCardIcon,
} from "@heroicons/react/24/outline";

interface FooterLinks {
  [key: string]: string[];
}

interface SocialIcon {
  name: string;
  icon: string;
}

export default function Footer()  {
  const footerLinks: FooterLinks = {
    Product: ["Features", "How It Works", "Pricing", "Security"],
    Company: ["About", "Blog", "Careers", "Press"],
    Resources: ["Documentation", "Help Center", "Community", "Status"],
    Legal: ["Privacy", "Terms", "Cookies", "Licenses"],
  };

  const socialIcons: SocialIcon[] = [
    { name: "Twitter", icon: "🐦" },
    { name: "Discord", icon: "💬" },
    { name: "Telegram", icon: "✈️" },
    { name: "LinkedIn", icon: "💼" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <CreditCardIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Walle Wallet</span>
            </motion.div>

            <motion.p
              className="text-gray-400 mb-6 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Your everyday payment card and wallet. Tap. Pay. Done. Crypto
              Anywhere with NFC-enabled cards for seamless transactions.
            </motion.p>

            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {socialIcons.map((social, index) => (
                <motion.a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(
            ([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-4">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          )}
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Walle Wallet. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};