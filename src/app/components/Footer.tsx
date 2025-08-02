// Footer.tsx
"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";
import WalleLogo from "../../../public/walle_logo.png"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-10%" });
  
  const footerLinks = {
    Product: ["Features", "How It Works", "Pricing", "Security", "API"],
    Company: ["About", "Blog", "Careers", "Press", "Partners"],
    Resources: ["Documentation", "Help Center", "Community", "Status", "Whitepaper"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Compliance"],
  };

  const socialIcons = [
    { name: "Twitter", icon: "𝕏", href: "#", color: "hover:bg-blue-600" },
    { name: "Discord", icon: "💬", href: "#", color: "hover:bg-purple-600" },
    { name: "Telegram", icon: "📱", href: "#", color: "hover:bg-blue-500" },
    { name: "LinkedIn", icon: "💼", href: "#", color: "hover:bg-blue-700" },
  ];

  return (
    <footer ref={footerRef} className="bg-white text-neutral-800 relative overflow-hidden ">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-primary-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 pt-20 pb-10 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 mb-42 border border-blue-200"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-3 text-neutral-800">Stay Updated</h3>
              <p className="text-neutral-600">
                Get the latest updates about Walle Wallet features, partnerships, and blockchain innovations.
              </p>
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-800 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <motion.button
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-colors duration-300 whitespace-nowrap cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          
          {/* Company Info - Takes more space */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
                {/* Mobile Logo */}
                <motion.div 
                  className="flex justify-start mb-2 pb-2 "
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <Image 
                      src={WalleLogo} 
                      alt="Walle Wallet Logo" 
                      width={120}
                      height={30}
                      className="h-14 w-auto object-contain"
                    />
                  </div>
                </motion.div>

            <p className="text-neutral-600 mb-8 text-md leading-relaxed">
              Your everyday payment card and crypto wallet. Tap. Pay. Done. 
              Experience seamless transactions in over 200 countries with our NFC-enabled cards.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-neutral-600">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPinIcon className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm">San Francisco, CA 94102</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-600">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <EnvelopeIcon className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm">hello@wallewallet.com</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-600">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <PhoneIcon className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className={`w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center ${social.color} transition-all duration-300 border border-neutral-200 hover:border-blue-300 hover:text-white`}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <span className="text-xl text-neutral-700">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          <div className="lg:col-span-8 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-6 text-neutral-800">{category}</h3>
                <ul className="space-y-4">
                  {links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <motion.a
                        href="#"
                        className="text-neutral-600 hover:text-blue-600 transition-all duration-300 text-sm font-medium flex items-center group"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>


        {/* Bottom Bar */}
        <motion.div
          className="border-t border-neutral-200 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <p className="text-neutral-600 text-sm">
              © 2025 Walle Wallet. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-8 text-sm">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
              <motion.a
                key={link}
                href="#"
                className="text-neutral-600 hover:text-blue-600 transition-colors duration-300 font-medium"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        </motion.div>



      </div>
    </footer>
  );
}