// components/Dashboard/SettingsSection.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  KeyIcon, 
  InformationCircleIcon, 
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  UserIcon,
  BellIcon,
  EyeIcon,
  EyeSlashIcon,
  ChevronRightIcon,
  CheckIcon,
  PencilIcon
} from "@heroicons/react/24/outline";
import { useDashboard } from "./DashboardContext";
import DashboardPinModal from "./DashboardPinModal";
import ProfileEditModal from "./ProfileEditModal";
import Image from "next/image";

// Define proper types for settings items
interface BaseSettingItem {
  id: string;
  name: string;
  description: string;
  icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & { title?: string | undefined; titleId?: string | undefined; } & React.RefAttributes<SVGSVGElement>>;
}

interface ActionSettingItem extends BaseSettingItem {
  action: () => void;
  showArrow: true;
  toggle?: never;
  value?: never;
  onChange?: never;
}

interface ToggleSettingItem extends BaseSettingItem {
  toggle: true;
  value: boolean;
  onChange: (value: boolean) => void;
  action?: never;
  showArrow?: never;
}

type SettingItem = ActionSettingItem | ToggleSettingItem;

interface SettingsGroup {
  title: string;
  icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & { title?: string | undefined; titleId?: string | undefined; } & React.RefAttributes<SVGSVGElement>>;
  color: string;
  bgColor: string;
  items: SettingItem[];
}

export default function SettingsSection() {
  const { state } = useDashboard();
  const [showDashboardPinModal, setShowDashboardPinModal] = useState(false);
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [notifications, setNotifications] = useState({
    transactions: true,
    security: true,
    updates: false,
  });
  const [privacy, setPrivacy] = useState({
    showBalance: true,
    showTransactionHistory: true,
  });

  const settingsGroups: SettingsGroup[] = [
    {
      title: "Account",
      icon: UserIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      items: [
        {
          id: "edit-profile",
          name: "Edit Profile",
          description: "Update your display name and profile photo",
          icon: UserIcon,
          action: () => setShowProfileEditModal(true),
          showArrow: true,
        }
      ]
    },
    {
      title: "Security",
      icon: ShieldCheckIcon,
      color: "text-red-600",
      bgColor: "bg-red-50",
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
      color: "text-purple-600",
      bgColor: "bg-purple-50",
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
      color: "text-green-600",
      bgColor: "bg-green-50",
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
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      items: [
        {
          id: "product-info",
          name: "About Walle",
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
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">Settings</h1>
        <p className="text-neutral-600 text-lg">
          Manage your account settings and preferences
        </p>
      </motion.div>

      {/* User Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-3xl p-6 md:p-8  border border-neutral-200/50 mb-8"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center overflow-hidden">
              {state.user.profileImage ? (
                <Image
                  src={state.user.profileImage}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon className="w-10 h-10 text-white" />
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
              <CheckIcon className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-2xl font-bold text-neutral-800">
                {state.user.name}
              </h2>
              <button
                onClick={() => setShowProfileEditModal(true)}
                className="text-primary-600 hover:text-primary-700 transition-colors duration-300 p-1.5 hover:bg-primary-50 rounded-lg cursor-pointer"
                title="Edit Profile"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-neutral-600">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Wallet:</span>
                <span className="font-mono text-sm bg-neutral-100 px-2 py-1 rounded-lg">
                  {state.walletAddress.slice(0, 6)}...{state.walletAddress.slice(-4)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Active Cards:</span>
                <span className="text-sm font-semibold text-primary-600">{state.cards.length}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-xl">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold">Connected</span>
          </div>
        </div>
      </motion.div>

      {/* Settings Groups */}
      <div className="space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + groupIndex * 0.1 }}
            className="bg-white rounded-3xl p-6 md:p-8  border border-neutral-200/50"
          >
            {/* Group Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 ${group.bgColor} rounded-2xl flex items-center justify-center`}>
                <group.icon className={`w-6 h-6 ${group.color}`} />
              </div>
              <h2 className="text-xl font-bold text-neutral-800">{group.title}</h2>
            </div>

            {/* Group Items */}
            <div className="space-y-3">
              {group.items.map((item, itemIndex) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
                    'action' in item && item.action ? 'hover:bg-neutral-50 cursor-pointer hover:shadow-sm' : ''
                  }`}
                  onClick={'action' in item ? item.action : undefined}
                >
                  {/* Item Icon */}
                  <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-neutral-200 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-neutral-600" />
                  </div>
                  
                  {/* Item Content */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-neutral-800 mb-1">
                      {item.name}
                    </div>
                    <div className="text-sm text-neutral-600 leading-relaxed">
                      {item.description}
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  {'toggle' in item && item.toggle && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        item.onChange(!item.value);
                      }}
                      className={`relative cursor-pointer w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-primary-200 ${
                        item.value 
                          ? 'bg-gradient-to-r from-primary-500 to-primary-600 shadow-sm' 
                          : 'bg-neutral-300'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm cursor-pointer"
                        animate={{ x: item.value ? 26 : 2 }}
                        transition={{ duration: 0.2, type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </motion.button>
                  )}

                  {/* Arrow Icon */}
                  {'showArrow' in item && item.showArrow && (
                    <ChevronRightIcon className="w-5 h-5 text-neutral-400 group-hover:text-neutral-600 transition-colors duration-300" />
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
        className="bg-white rounded-3xl p-6 md:p-8  border border-neutral-200/50 mt-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center">
            <InformationCircleIcon className="w-6 h-6 text-neutral-600" />
          </div>
          <h2 className="text-xl font-bold text-neutral-800">App Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-neutral-50 rounded-2xl p-4 text-center">
            <div className="text-sm text-neutral-600 mb-1">Version</div>
            <div className="font-bold text-neutral-800">1.0.0</div>
          </div>
          <div className="bg-neutral-50 rounded-2xl p-4 text-center">
            <div className="text-sm text-neutral-600 mb-1">Build</div>
            <div className="font-bold text-neutral-800">2024.01.15</div>
          </div>
          <div className="bg-neutral-50 rounded-2xl p-4 text-center">
            <div className="text-sm text-neutral-600 mb-1">Network</div>
            <div className="font-bold text-neutral-800">Ethereum</div>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-200">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-600 mb-4">
            <a href="/privacy" className="hover:text-primary-600 transition-colors duration-300 font-medium">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-primary-600 transition-colors duration-300 font-medium">
              Terms of Service
            </a>
            <a href="/support" className="hover:text-primary-600 transition-colors duration-300 font-medium">
              Support Center
            </a>
          </div>
          <div className="text-center text-xs text-neutral-500">
            © 2024 Walle Wallet. All rights reserved.
          </div>
        </div>
      </motion.div>

      {/* Dashboard PIN Modal */}
      {showDashboardPinModal && (
        <DashboardPinModal onClose={() => setShowDashboardPinModal(false)} />
      )}

      {/* Profile Edit Modal */}
      {showProfileEditModal && (
        <ProfileEditModal onClose={() => setShowProfileEditModal(false)} />
      )}
    </div>
  );
}