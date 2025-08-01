// components/Dashboard/TransactionHistory.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { ClockIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { useDashboard } from "./DashboardContext";

const coinIcons: Record<string, string> = {
  usdc: "💙",
  usdt: "💚", 
  idrx: "🔷",
  idrt: "🔶"
};

const statusColors: Record<string, string> = {
  completed: "text-green-600 bg-green-50 border-green-200",
  pending: "text-yellow-600 bg-yellow-50 border-yellow-200",
  failed: "text-red-600 bg-red-50 border-red-200"
};

export default function TransactionHistory() {
  const { state } = useDashboard();

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg border border-walle-pale-cyan">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-walle-dark-blue flex items-center gap-3">
          <ClockIcon className="w-7 h-7 text-walle-royal-blue" />
          Transaction History
        </h2>
        
        {state.transactions.length > 0 && (
          <button className="text-walle-royal-blue hover:text-walle-dark-blue transition-colors font-medium">
            View All
          </button>
        )}
      </div>

      {state.transactions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-walle-soft rounded-full flex items-center justify-center mx-auto mb-4">
            <ClockIcon className="w-8 h-8 text-walle-royal-blue" />
          </div>
          <h3 className="text-xl font-semibold text-walle-dark-blue mb-2">
            No Transactions Yet
          </h3>
          <p className="text-walle-ocean-blue">
            Your transaction history will appear here once you start using your Walle cards
          </p>
        </motion.div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-walle-light-gray">
                <th className="text-left py-3 px-4 text-sm font-semibold text-walle-dark-blue">No</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-walle-dark-blue">Date & Time</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-walle-dark-blue">Coin</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-walle-dark-blue">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-walle-dark-blue">Category</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-walle-dark-blue">Recipient</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-walle-dark-blue">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-walle-dark-blue">Card</th>
              </tr>
            </thead>
            <tbody>
              {state.transactions.map((transaction, index) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-walle-light-gray hover:bg-walle-ice-blue transition-colors"
                >
                  <td className="py-4 px-4 text-sm text-walle-ocean-blue">
                    #{index + 1}
                  </td>
                  <td className="py-4 px-4 text-sm text-walle-dark-blue">
                    <div>{transaction.date}</div>
                    <div className="text-xs text-walle-ocean-blue">{transaction.time}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{coinIcons[transaction.coinType]}</span>
                      <span className="text-sm font-medium text-walle-dark-blue uppercase">
                        {transaction.coinType}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`flex items-center gap-1 ${
                      transaction.type === 'received' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'received' ? (
                        <ArrowDownIcon className="w-4 h-4" />
                      ) : (
                        <ArrowUpIcon className="w-4 h-4" />
                      )}
                      <span className="font-semibold">
                        {transaction.type === 'received' ? '+' : '-'}{transaction.amount.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-walle-ocean-blue">
                    {transaction.category}
                  </td>
                  <td className="py-4 px-4 text-sm text-walle-ocean-blue">
                    {transaction.recipient}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                      statusColors[transaction.status]
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm font-mono text-walle-ocean-blue">
                    {transaction.cardId.slice(-6).toUpperCase()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}