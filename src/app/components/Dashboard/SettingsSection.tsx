// components/Dashboard/SettingsSection.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  KeyIcon, 
  InformationCircleIcon, 
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  CogIcon,
  UserIcon,
  BellIcon,
  EyeIcon,
  EyeSlashIcon
} from "@heroicons/react/24/outline";
import { useDashboard } from "./DashboardContext";
import DashboardPinModal from "./DashboardPinModal";

export default function SettingsSection() {
  const { state } = useDashboard();
  const [showDashboardPinModal, setShowDashboardPinModal] = useState(false);
  const [notifications, setNotifications] = useState({
    transactions: true,
    security: true,
    updates: false,
  });
  const [privacy, setPrivacy] = useState({
    showBalance: true,
    showTransactionHistory: true,
  });

  const settingsGroups = [
    {
      title: "Security",
      icon: ShieldCheckIcon,
      items: [
        {
          id: "dashboard-pin",
          name: "Dashboard PIN",
          description: "Change your dashboard login PIN",
          icon: KeyIcon,
          action: () => setShowDashboardPinModal(true),
          showArrow: true,
        }
      ]
    },
    {
      title: "Privacy",
      icon: EyeIcon,
      items: [
        {
          id: "show-balance",
          name: "Show Balance",
          description: "Display card balances on dashboard",
          icon: EyeIcon,
          toggle: true,
          value: privacy.showBalance,
          onChange: (value: boolean) => setPrivacy(prev => ({ ...prev, showBalance: value })),
        },
        {
          id: "show-history",
          name: "Show Transaction History",
          description: "Display transaction history to others",
          icon: EyeSlashIcon,
          toggle: true,
          value: privacy.showTransactionHistory,
          onChange: (value: boolean) => setPrivacy(prev => ({ ...prev, showTransactionHistory: value })),
        }
      ]
    },
    {
      title: "Notifications",
      icon: BellIcon,
      items: [
        {
          id: "transaction-notifications",
          name: "Transaction Alerts",
          description: "Get notified of all transactions",
          icon: BellIcon,
          toggle: true,
          value: notifications.transactions,
          onChange: (value: boolean) => setNotifications(prev => ({ ...prev, transactions: value })),
        },
        {
          id: "security-notifications",
          name: "Security Alerts",
          description: "Get notified of security events",
          icon: ShieldCheckIcon,
          toggle: true,
          value: notifications.security,
          onChange: (value: boolean) => setNotifications(prev => ({ ...prev, security: value })),
        },
        {
          id: "update-notifications",
          name: "Product Updates",
          description: "Get notified of new features",
          icon: InformationCircleIcon,
          toggle: true,
          value: notifications.updates,
          onChange: (value: boolean) => setNotifications(prev => ({ ...prev, updates: value })),
        }
      ]
    },
    {
      title: "Support & Information",
      icon: InformationCircleIcon,
      items: [
        {
          id: "product-info",
          name: "About Walle Wallet",
          description: "Learn more about Walle Wallet",
          icon: InformationCircleIcon,
          action: () => window.open('/about', '_blank'),
          showArrow: true,
        },
        {
          id: "customer-service",
          name: "Customer Service",
          description: "Get help from our support team",
          icon: ChatBubbleLeftRightIcon,
          action: () => window.open('mailto:support@walle.com'),
          showArrow: true,
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-walle-dark-blue mb-2">Settings</h1>
        <p className="text-walle-ocean-blue">
          Manage your account settings and preferences
        </p>
      </motion.div>

      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-walle-pale-cyan mb-8"
      >
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-walle-gradient rounded-full flex items-center justify-center">
            <UserIcon className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-walle-dark-blue mb-2">
              {state.user.name}
            </h2>
            <div className="text-walle-ocean-blue space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm">Wallet Address:</span>
                <span className="font-mono text-sm">
                  {state.walletAddress.slice(0, 10)}...{state.walletAddress.slice(-8)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Cards:</span>
                <span className="text-sm font-semibold">{state.cards.length} active</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-xl">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-semibold">Connected</span>
          </div>
        </div>
      </motion.div>

      {/* Settings Groups */}
      <div className="space-y-8">
        {settingsGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + groupIndex * 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-walle-pale-cyan"
          >
            <h2 className="text-xl font-bold text-walle-dark-blue mb-6 flex items-center gap-3">
              <group.icon className="w-6 h-6 text-walle-royal-blue" />
              {group.title}
            </h2>

            <div className="space-y-4">
              {group.items.map((item, itemIndex) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                    item.action ? 'hover:bg-walle-ice-blue cursor-pointer' : ''
                  }`}
                  onClick={item.action}
                >
                  <div className="w-10 h-10 bg-walle-soft rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-walle-royal-blue" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-semibold text-walle-dark-blue mb-1">
                      {item.name}
                    </div>
                    <div className="text-sm text-walle-ocean-blue">
                      {item.description}
                    </div>
                  </div>

                  {item.toggle && item.onChange && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        item.onChange(!item.value);
                      }}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                        item.value ? 'bg-walle-royal-blue' : 'bg-gray-300'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                        animate={{ x: item.value ? 24 : 4 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  )}

                  {item.showArrow && (
                    <div className="text-walle-ocean-blue">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* App Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-walle-pale-cyan mt-8"
      >
        <h2 className="text-xl font-bold text-walle-dark-blue mb-6">App Information</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-walle-ocean-blue">Version</span>
            <span className="font-semibold text-walle-dark-blue">1.0.0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-walle-ocean-blue">Build</span>
            <span className="font-semibold text-walle-dark-blue">2024.01.15</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-walle-ocean-blue">Network</span>
            <span className="font-semibold text-walle-dark-blue">Ethereum Mainnet</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-walle-light-gray">
          <div className="flex items-center justify-center gap-6 text-sm text-walle-ocean-blue">
            <a href="/privacy" className="hover:text-walle-dark-blue transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-walle-dark-blue transition-colors">
              Terms of Service
            </a>
            <a href="/support" className="hover:text-walle-dark-blue transition-colors">
              Support Center
            </a>
          </div>
          <div className="text-center text-xs text-walle-ocean-blue mt-4">
            © 2024 Walle Wallet. All rights reserved.
          </div>
        </div>
      </motion.div>

      {/* Dashboard PIN Modal */}
      {showDashboardPinModal && (
        <DashboardPinModal onClose={() => setShowDashboardPinModal(false)} />
      )}
    </div>
  );
}