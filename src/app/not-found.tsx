"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  MagnifyingGlassIcon,
  HomeIcon,
  ArrowLeftIcon,
  CreditCardIcon,
  ChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full text-center"
      >


        {/* 404 Design consistent with Walle */}
        <motion.div
          variants={itemVariants}
          className="mb-12"
        >
          <div className="relative">
            <motion.h1
              className="text-7xl md:text-8xl font-black bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 bg-clip-text text-transparent mb-2"
              animate={{
                backgroundPosition: ['0%', '100%', '0%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              404
            </motion.h1>
            
            {/* Floating card icon */}
            <motion.div
              className="absolute -top-4 -right-8 w-20 h-20 bg-white rounded-2xl shadow-xl border border-neutral-200 flex items-center justify-center"
              animate={{
                y: [0, -8, 0],
                rotate: [0, 3, -3, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <MagnifyingGlassIcon className="w-10 h-10 text-primary-600" />
            </motion.div>
          </div>
        </motion.div>

        {/* Message consistent with Walle tone */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Page Not Found
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Looks like this page took an unexpected trip! 
            Don&apos;t worry, let&apos;s get you back to managing your finances.
          </p>
        </motion.div>


        {/* Action Buttons - Walle style */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link href="/">
            <motion.button
              className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 min-w-[180px]"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <HomeIcon className="w-5 h-5" />
              Back to Home
            </motion.button>
          </Link>

          <motion.button
            onClick={() => router.back()}
            className="bg-white hover:bg-neutral-50 text-neutral-700 px-8 py-4 rounded-2xl font-semibold border-2 border-neutral-200 hover:border-neutral-300 flex items-center gap-3 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 min-w-[180px]"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Go Back
          </motion.button>
        </motion.div>

        {/* Help Section - Walle style */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100"
        >
          <p className="text-neutral-600 mb-4 text-lg">
            Need assistance with your Walle account?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.a
              href="/help"
              className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Cog6ToothIcon className="w-5 h-5" />
              Help Center
            </motion.a>
            <motion.a
              href="/contact"
              className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <UserCircleIcon className="w-5 h-5" />
              Contact Support
            </motion.a>
          </div>
        </motion.div>

        {/* Footer branding */}
        <motion.div
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <p className="text-neutral-400 text-sm">
            © 2024 Walle Wallet. Your trusted financial companion.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}