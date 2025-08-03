// components/Dashboard/CardsSection.tsx
"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CreditCardIcon,
  CogIcon,
  ShieldCheckIcon,
  ClockIcon,
  EyeIcon,
  EyeSlashIcon,
  BanknotesIcon,
  CalendarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useDashboard } from "./DashboardContext";
import WalleCard from "./WalleCard";
import CardSettings from "./CardSettings";
import SetLimit from "./SetLimit";
import TransactionLog from "./TransactionLog";
import AddCardModal from "src/app/components/Dashboard/AddCardModal";
import CardModal from "src/app/components/Dashboard/CardModal";
import { privateKeyToAccount } from "viem/accounts";
import { accessCard } from "src/utils/tap2payhelper";
import { useEbiIdrcBalanceOf } from "src/app/hooks/useIdrc";
import { useAccount } from "wagmi";

// Define proper types for tab IDs
type TabId = "settings" | "limits" | "transactions";

interface Tab {
  id: TabId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export default function CardsSection() {
  const { state, dispatch } = useDashboard();
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [activeTab, setActiveTab] = useState<TabId>("settings");
  const [showBalance, setShowBalance] = useState(true);

  const [cardAccount, setCardAccount] = useState<any>();

  const { address, isConnected, chain } = useAccount();
  const { data: idrcBalance } = useEbiIdrcBalanceOf({
    args: [address as `0x${string}`],
  });

  const handlePrevCard = () => {
    const newIndex =
      state.selectedCardIndex > 0
        ? state.selectedCardIndex - 1
        : state.cards.length - 1;
    dispatch({ type: "SET_SELECTED_CARD", payload: newIndex });
  };

  const handleNextCard = () => {
    const newIndex =
      state.selectedCardIndex < state.cards.length - 1
        ? state.selectedCardIndex + 1
        : 0;
    dispatch({ type: "SET_SELECTED_CARD", payload: newIndex });
  };

  const currentCard = state.cards[state.selectedCardIndex];

  const tabs: Tab[] = [
    {
      id: "settings",
      name: "Card Settings",
      icon: CogIcon,
      description: "Manage card preferences and basic settings",
    },
    {
      id: "limits",
      name: "Set Limits",
      icon: ShieldCheckIcon,
      description: "Configure spending limits and restrictions",
    },
    {
      id: "transactions",
      name: "Transaction Log",
      icon: ClockIcon,
      description: "View detailed transaction history",
    },
  ];

  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId);
  };

  const formatBalance = (bal: any): string => {
    if (bal === null || bal === undefined || isNaN(Number(bal))) {
      return "Loading...";
    }

    const num = Number(bal.toString().slice(0, -2));

    const tiers = [
      { value: 1e9, symbol: "B" },
      { value: 1e6, symbol: "M" },
      { value: 1e3, symbol: "K" },
    ];

    const tier = tiers.find((t) => Math.abs(num) >= t.value);

    let formatted;

    if (tier) {
      const val = num / tier.value;
      const fixedVal = val.toFixed(2);

      formatted = fixedVal + tier.symbol;
    } else {
      formatted = num.toString();
    }

    return `${formatted} IDRC`;
  };

  // Calculate total balance in IDR equivalent (mock conversion)
  const getTotalBalance = () => {
    if (!currentCard) return 0;
    const { balance } = currentCard;
    // Mock conversion rates to IDR
    return formatBalance(idrcBalance);
  };

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === "idr" || currency === "idrx" || currency === "idrt") {
      return `Rp ${amount.toLocaleString()}`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const handleSiginCard = async (cardData: {
    cardId: string;
    pin: string;
    secretKey: string;
  }) => {
    try {
      const privateKey = accessCard(
        cardData.cardId,
        cardData.pin,
        cardData.secretKey
      );

      const currentCardAccount = privateKeyToAccount(privateKey);

      console.log("currentCardAccount", currentCardAccount);
      setCardAccount(currentCardAccount);

      setRegistrationStatus({
        type: "success",
        message: `Card ${cardData.cardId} has been signed successfully!`,
      });
    } catch (error) {
      console.error("Error in handleAddCard:", error);
      setRegistrationStatus({
        type: "error",
        message: "Failed to sign card. Please try again.",
      });
    }
  };

  if (state.cards.length === 0) {
    return (
      <div className="text-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-24 h-24 bg-gradient-to-br from-walle-royal-blue to-walle-ocean-blue rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <CreditCardIcon className="w-12 h-12 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-walle-dark-blue mb-4">
          No Cards Available
        </h2>
        <p className="text-walle-ocean-blue mb-8 text-lg">
          Generate your first Walle card to start managing your digital payments
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => dispatch({ type: "SET_SECTION", payload: "overview" })}
          className="bg-walle-gradient text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Go to Overview
        </motion.button>
      </div>
    );
  }

  useEffect(() => {
    setIsAddCardModalOpen(true);
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
      {/* Left Panel - Card Information */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="xl:col-span-2 space-y-6"
      >
        {/* Card Display Section */}
        <div className="bg-white rounded-3xl p-8 ">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-walle-dark-blue">
                Your Cards
              </h2>
              {/* <p className="text-sm text-walle-ocean-blue mt-1">
                {state.selectedCardIndex + 1} of {state.cards.length} cards
              </p> */}
            </div>

            {/* {state.cards.length > 1 && (
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevCard}
                  className="p-3 rounded-xl bg-walle-soft text-walle-royal-blue hover:bg-walle-ice-blue transition-colors shadow-md"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextCard}
                  className="p-3 rounded-xl bg-walle-soft text-walle-royal-blue hover:bg-walle-ice-blue transition-colors shadow-md"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </motion.button>
              </div>
            )} */}
          </div>

          {/* Card Display */}
          <div className="flex justify-center mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={state.selectedCardIndex}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <WalleCard card={""} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Card Status */}
          <div className="flex items-center justify-center mb-6">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                currentCard.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  currentCard.isActive ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span className="text-sm font-semibold">
                {currentCard.isActive ? "Active Card" : "Inactive Card"}
              </span>
            </div>
          </div>
        </div>

        {/* Card Information */}
        <div className="bg-white rounded-2xl px-6 ">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-slate-800">
                Card Information
              </h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              {showBalance ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </motion.button>
          </div>

          {/* Total Balance - Compact */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 mb-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <BanknotesIcon className="w-5 h-5 opacity-90" />
                <span className="text-sm opacity-90 font-medium">
                  Total Balance
                </span>
              </div>
              <div className="text-2xl font-bold mb-1">
                {showBalance
                  ? `Rp ${getTotalBalance().toLocaleString()}`
                  : "Rp ****"}
              </div>
              <div className="text-xs opacity-75">
                Available across all currencies
              </div>
            </div>
          </div>

          {/* Balance Breakdown - Compact Grid */}
          {/* <div className="space-y-4 mb-6">
            <h4 className="font-semibold text-slate-800 text-lg">
              Balance Breakdown
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(currentCard.balance).map(
                ([currency, amount], index) => {
                  const colors = [
                    {
                      bg: "bg-emerald-50",
                      border: "border-emerald-200",
                      text: "text-emerald-700",
                      icon: "bg-emerald-500",
                    },
                    {
                      bg: "bg-blue-50",
                      border: "border-blue-200",
                      text: "text-blue-700",
                      icon: "bg-blue-500",
                    },
                    {
                      bg: "bg-purple-50",
                      border: "border-purple-200",
                      text: "text-purple-700",
                      icon: "bg-purple-500",
                    },
                    {
                      bg: "bg-orange-50",
                      border: "border-orange-200",
                      text: "text-orange-700",
                      icon: "bg-orange-500",
                    },
                  ];
                  const colorSet = colors[index % colors.length];

                  return (
                    <motion.div
                      key={currency}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className={`${colorSet.bg} ${colorSet.border} border rounded-xl p-4 relative overflow-hidden`}
                    >
                      <div
                        className={`absolute top-2 right-2 w-8 h-8 ${colorSet.icon} rounded-lg opacity-20`}
                      ></div>
                      <div className="relative z-10">
                        <div
                          className={`text-xs ${colorSet.text} mb-2 uppercase font-semibold tracking-wide`}
                        >
                          {currency}
                        </div>
                        <div className={`text-lg font-bold ${colorSet.text}`}>
                          {showBalance
                            ? formatCurrency(amount, currency)
                            : "****"}
                        </div>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </div>
          </div> */}

          {/* Spending Limits - Modern Design */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-slate-800 text-lg">
                Spending Limits
              </h4>
            </div>

            {/* Daily Limit with Progress */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <ClockIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">
                      Daily Limit
                    </div>
                    <div className="text-xs text-slate-600">24 hours</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-800">
                    Rp {(currentCard.limits.daily / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-xs text-slate-600">
                    Used: Rp{" "}
                    {(currentCard.currentLimitUsed / 1000000).toFixed(1)}M
                  </div>
                </div>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    (currentCard.currentLimitUsed / currentCard.limits.daily) *
                      100 >
                    80
                      ? "bg-gradient-to-r from-red-500 to-red-600"
                      : (currentCard.currentLimitUsed /
                          currentCard.limits.daily) *
                          100 >
                        60
                      ? "bg-gradient-to-r from-amber-500 to-amber-600"
                      : "bg-gradient-to-r from-emerald-500 to-emerald-600"
                  }`}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(
                      (currentCard.currentLimitUsed /
                        currentCard.limits.daily) *
                        100,
                      100
                    )}%`,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-slate-600">
                  {(
                    (currentCard.currentLimitUsed / currentCard.limits.daily) *
                    100
                  ).toFixed(1)}
                  % used
                </span>
                {(currentCard.currentLimitUsed / currentCard.limits.daily) *
                  100 >
                  80 && (
                  <span className="text-xs text-red-600 flex items-center gap-1">
                    <ExclamationTriangleIcon className="w-3 h-3" />
                    Near limit
                  </span>
                )}
              </div>
            </div>

            {/* Other Limits - Compact Cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  key: "weekly",
                  name: "Weekly",
                  period: "7d",
                  icon: CalendarIcon,
                  color: "emerald",
                },
                {
                  key: "monthly",
                  name: "Monthly",
                  period: "30d",
                  icon: ChartBarIcon,
                  color: "purple",
                },
                {
                  key: "yearly",
                  name: "Yearly",
                  period: "365d",
                  icon: Cog6ToothIcon,
                  color: "orange",
                },
              ].map((limit) => (
                <motion.div
                  key={limit.key}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`bg-${limit.color}-50 border border-${limit.color}-200 rounded-lg p-3 text-center`}
                >
                  <div
                    className={`w-8 h-8 bg-${limit.color}-500 rounded-lg flex items-center justify-center mx-auto mb-2`}
                  >
                    <limit.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xs text-slate-600 mb-1">
                    {limit.name}
                  </div>
                  <div className="text-xs text-slate-500 mb-2">
                    {limit.period}
                  </div>
                  <div className={`text-sm font-bold text-${limit.color}-700`}>
                    {(
                      currentCard.limits[
                        limit.key as keyof typeof currentCard.limits
                      ] / 1000000
                    ).toFixed(1)}
                    M
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Panel - Card Management */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="xl:col-span-3 space-y-6"
      >
        {/* Tab Navigation - Redesigned */}
        <div className="bg-white rounded-2xl p-4 ">
          {/* Modern Tab Style */}
          <div className="flex flex-wrap gap-2 bg-gray-100 p-1 rounded-xl">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTabClick(tab.id)}
                className={`flex-1 min-w-0 px-4 py-4 rounded-lg transition-all duration-300 font-medium text-sm ${
                  activeTab === tab.id
                    ? "bg-white text-walle-dark-blue shadow-sm border border-gray-200"
                    : "text-gray-600 hover:text-walle-dark-blue hover:bg-white/50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <tab.icon
                    className={`w-4 h-4 ${
                      activeTab === tab.id
                        ? "text-walle-royal-blue"
                        : "text-gray-500"
                    }`}
                  />
                  <span className="truncate">{tab.name}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Management Content */}
        <div className="bg-white rounded-3xl  min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {activeTab === "settings" && <CardSettings card={currentCard} />}
              {activeTab === "limits" && (
                <SetLimit cardAccount={cardAccount} card={currentCard} />
              )}
              {activeTab === "transactions" && (
                <TransactionLog card={currentCard} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <CardModal
        isOpen={isAddCardModalOpen}
        onClose={(success = false) => {
          if (!success) dispatch({ type: "SET_SECTION", payload: "overview" });
          setIsAddCardModalOpen(false);
        }}
        onConfirm={handleSiginCard}
      />
    </div>
  );
}
