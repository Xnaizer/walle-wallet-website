// components/Dashboard/TransactionLog.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { ClockIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { WalletCard, useDashboard } from "./DashboardContext";

interface TransactionLogProps {
  card: WalletCard;
}

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

export default function TransactionLog({ card }: TransactionLogProps) {
  const { state } = useDashboard();

  // Filter transactions for this specific card
  const cardTransactions = state.transactions.filter(transaction => transaction.cardId === card.id);

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-walle-dark-blue mb-6 flex items-center gap-2">
        <ClockIcon className="w-5 h-5 text-walle-royal-blue" />
        Transaction Log
      </h3>

      {cardTransactions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 bg-walle-soft rounded-full flex items-center justify-center mx-auto mb-4">
            <ClockIcon className="w-8 h-8 text-walle-royal-blue" />
          </div>
          <h4 className="text-lg font-semibold text-walle-dark-blue mb-2">
            No Transactions
          </h4>
          <p className="text-walle-ocean-blue text-sm">
            No transactions found for this card yet
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {cardTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-2xl p-4 border border-walle-light-gray hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Transaction Type Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'received' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'received' ? (
                      <ArrowDownIcon className="w-5 h-5" />
                    ) : (
                      <ArrowUpIcon className="w-5 h-5" />
                    )}
                  </div>

                  {/* Transaction Details */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-walle-dark-blue">
                        {transaction.type === 'received' ? 'Received' : 'Spending'}
                      </span>
                      <span className="text-lg">{coinIcons[transaction.coinType]}</span>
                      <span className="text-sm font-medium text-walle-ocean-blue uppercase">
                        {transaction.coinType}
                      </span>
                    </div>
                    
                    <div className="text-sm text-walle-ocean-blue">
                      {transaction.date} at {transaction.time}
                    </div>
                    
                    <div className="text-sm text-walle-ocean-blue">
                      {transaction.category} • {transaction.recipient}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  {/* Amount */}
                  <div className={`text-lg font-bold ${
                    transaction.type === 'received' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'received' ? '+' : '-'}
                    {transaction.amount.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                    })}
                  </div>

                  {/* Status */}
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-2 ${
                    statusColors[transaction.status]
                  }`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Load More Button (if needed) */}
          {cardTransactions.length > 5 && (
            <div className="text-center pt-4">
              <button className="text-walle-royal-blue hover:text-walle-dark-blue font-medium">
                Load More Transactions
              </button>
            </div>
          )}
        </div>
      )}

      {/* Transaction Summary */}
      {cardTransactions.length > 0 && (
        <div className="mt-6 pt-6 border-t border-walle-light-gray">
          <h4 className="text-md font-semibold text-walle-dark-blue mb-4">Transaction Summary</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="text-green-600 text-sm font-medium mb-1">Total Received</div>
              <div className="text-green-800 text-lg font-bold">
                {cardTransactions
                  .filter(t => t.type === 'received')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                  })}
              </div>
            </div>
            
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <div className="text-red-600 text-sm font-medium mb-1">Total Spending</div>
              <div className="text-red-800 text-lg font-bold">
                {cardTransactions
                  .filter(t => t.type === 'spending')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}