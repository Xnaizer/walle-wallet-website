// components/Dashboard/OverviewSection.tsx
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDashboard } from "./DashboardContext";
import { PlusIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import WalleCard from "./WalleCard";
import TransactionHistory from "./TransactionHistory";
import AddCardModal from "./AddCardModal";
import { useAccount } from "wagmi";
import { type Card } from "src/services/cardService";
import { useCardList } from "src/app/hooks/useCardQueries";

export default function OverviewSection() {
  const { state, dispatch } = useDashboard();
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const { isConnected } = useAccount();
  const {
    cardList,
    isLoading: isLoadingCards,
    error: cardError,
    refetch: refetchCards,
    refreshCardList,
    isRefreshing,
    isStale,
  } = useCardList();

  // Clear registration status after 5 seconds
  useEffect(() => {
    if (registrationStatus.type) {
      const timer = setTimeout(() => {
        setRegistrationStatus({ type: null, message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [registrationStatus.type]);

  const handleAddCard = async (cardData: { cardId: string; pin: string }) => {
    try {
      // Show success message
      setRegistrationStatus({
        type: "success",
        message: `Card ${cardData.cardId} has been registered successfully!`,
      });

      // Refresh the card list after a short delay
      setTimeout(() => {
        refetchCards();
      }, 1000);
    } catch (error) {
      console.error("Error in handleAddCard:", error);
      setRegistrationStatus({
        type: "error",
        message: "Failed to register card. Please try again.",
      });
    }
  };

  const handleRefreshCards = () => {
    if (!isConnected) return;
    refreshCardList();
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-walle-dark-blue mb-2">
          Hi, {state.user.name}
        </h1>
        <p className="text-walle-ocean-blue text-lg mb-8">
          Get started with your first Walle card. Securely manage Stable Coin in
          one smart wallet.
        </p>
      </motion.div>

      {/* Registration Status Message */}
      {registrationStatus.type && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`rounded-xl p-4 border ${
            registrationStatus.type === "success"
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                registrationStatus.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {registrationStatus.type === "success" ? (
                "✓"
              ) : (
                <ExclamationTriangleIcon />
              )}
            </div>
            <div>
              <h4
                className={`text-sm font-semibold mb-1 ${
                  registrationStatus.type === "success"
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {registrationStatus.type === "success"
                  ? "Registration Successful"
                  : "Registration Failed"}
              </h4>
              <p
                className={`text-xs ${
                  registrationStatus.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {registrationStatus.message}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-3xl p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-walle-dark-blue">
              Your Walle Cards
            </h2>
          </div>
          {isConnected && (
            <div className="flex gap-2">
              <motion.button
                onClick={handleRefreshCards}
                disabled={isRefreshing || isLoadingCards}
                className="bg-walle-royal-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-walle-dark-blue transition-all duration-300 disabled:opacity-50 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isRefreshing ? "Refreshing..." : "Refresh Cards"}
              </motion.button>
            </div>
          )}
        </div>

        {!isConnected ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="border-2 border-dashed border-yellow-200 rounded-2xl p-12 text-center"
          >
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-yellow-600 text-2xl">🔌</span>
            </div>
            <h3 className="text-xl font-semibold text-yellow-700 mb-2">
              Connect Your Wallet
            </h3>
            <p className="text-gray-600">
              Please connect your wallet to view and manage your cards
            </p>
          </motion.div>
        ) : isLoadingCards ? (
          <div className="flex gap-6 overflow-x-auto pb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 order-first"
            >
              <button
                onClick={() => setIsAddCardModalOpen(true)}
                className="w-80 h-48 border-2 border-dashed border-walle-royal-blue rounded-2xl flex items-center justify-center cursor-pointer hover:border-walle-dark-blue hover:bg-blue-50 transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-walle-soft rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-walle-royal-blue transition-all duration-300">
                    <PlusIcon className="w-6 h-6 text-walle-royal-blue group-hover:text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-walle-dark-blue mb-1">
                    Add New Card
                  </h3>
                  <p className="text-sm text-walle-ocean-blue">
                    Click to register a new card
                  </p>
                </div>
              </button>
            </motion.div>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-80 h-48 bg-gray-200 rounded-2xl animate-pulse flex-shrink-0"
              />
            ))}
          </div>
        ) : cardError ? (
          <div className="border-2 border-dashed border-red-200 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-500 text-2xl">⚠️</span>
            </div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              Failed to Load Cards
            </h3>
            <p className="text-gray-600 mb-6">
              {cardError?.message || "Unable to fetch your card list"}
            </p>
            <motion.button
              onClick={handleRefreshCards}
              disabled={isRefreshing}
              className="bg-red-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isRefreshing ? "Retrying..." : "Try Again"}
            </motion.button>
          </div>
        ) : state.cards.length === 0 && (!cardList || cardList.length === 0) ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="border-2 border-dashed border-walle-light-gray rounded-2xl p-12 text-center"
          >
            <div className="w-16 h-16 bg-walle-soft rounded-full flex items-center justify-center mx-auto mb-4">
              <PlusIcon className="w-8 h-8 text-walle-royal-blue" />
            </div>
            <h3 className="text-xl font-semibold text-walle-dark-blue mb-2">
              Register Your First Walle Card
            </h3>
            <p className="text-walle-ocean-blue mb-6">
              Create your first Walle card to start making secure blockchain
              payments
            </p>
            <motion.button
              onClick={() => setIsAddCardModalOpen(true)}
              className="bg-walle-gradient text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register Your First Card
            </motion.button>
          </motion.div>
        ) : (
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-walle-royal-blue scrollbar-track-gray-100">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 order-first"
              >
                <button
                  onClick={() => setIsAddCardModalOpen(true)}
                  className="w-80 h-48 border-2 border-dashed border-walle-royal-blue rounded-2xl flex items-center justify-center cursor-pointer hover:border-walle-dark-blue hover:bg-blue-50 transition-all duration-300 group"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-walle-soft rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-walle-royal-blue transition-all duration-300">
                      <PlusIcon className="w-6 h-6 text-walle-royal-blue group-hover:text-black" />
                    </div>
                    <h3 className="text-lg font-semibold text-walle-dark-blue mb-1">
                      Add New Card
                    </h3>
                    <p className="text-sm text-walle-ocean-blue">
                      Click to register a new card
                    </p>
                  </div>
                </button>
              </motion.div>
              {cardList &&
                cardList.map((card: Card, index: number) => (
                  <motion.div
                    key={card.id || index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex-shrink-0 cursor-pointer"
                    onClick={() =>
                      dispatch({ type: "SET_SECTION", payload: "cards" })
                    }
                  >
                    <WalleCard card={card} />
                  </motion.div>
                ))}
            </div>
            {((cardList && cardList.length > 0) || state.cards.length > 0) && (
              <div className="flex justify-center mt-4">
                <div className="text-xs text-gray-400 flex items-center gap-2">
                  <span>← Scroll to see more cards →</span>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <TransactionHistory />
      </motion.div>

      <AddCardModal
        isOpen={isAddCardModalOpen}
        onClose={() => setIsAddCardModalOpen(false)}
        onConfirm={handleAddCard}
      />
    </div>
  );
}
