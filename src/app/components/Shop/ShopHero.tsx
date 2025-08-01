// components/Shop/ShopHero.tsx (Breadcrumb version)
"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBagIcon, 
  StarIcon, 
  TruckIcon, 
  ShieldCheckIcon,
  ChevronRightIcon,
  HomeIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ShopHero() {
  const features = [
    { icon: StarIcon, text: "Premium Quality" },
    { icon: TruckIcon, text: "Fast Shipping" },
    { icon: ShieldCheckIcon, text: "Secure Payment" },
  ];

  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-8 text-sm"
        >
          <Link href="/" className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <HomeIcon className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <ChevronRightIcon className="w-4 h-4 text-white/50" />
          <span className="text-white font-medium">Shop</span>
        </motion.nav>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
              <ShoppingBagIcon className="w-8 h-8" />
            </div>
            <h3 className="text-4xl md:text-5xl font-bold">Shop Walle Cards</h3>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Choose your perfect crypto payment card. Available in multiple colors with worldwide shipping.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <feature.icon className="w-5 h-5" />
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}