// components/Dashboard/TransactionLog.tsx
"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClockIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  DocumentArrowDownIcon
} from "@heroicons/react/24/outline";
import { WalletCard, useDashboard } from "./DashboardContext";

interface TransactionLogProps {
  card: WalletCard;
}

const statusConfig = {
  done: {
    icon: <CheckCircleIcon className="w-3 h-3" />,
    color: "text-green-700 bg-green-50 border-green-200",
    textColor: "text-green-700"
  },
  pending: {
    icon: <ExclamationCircleIcon className="w-3 h-3" />,
    color: "text-yellow-700 bg-yellow-50 border-yellow-200",
    textColor: "text-yellow-700"
  },
  failed: {
    icon: <XCircleIcon className="w-3 h-3" />,
    color: "text-red-700 bg-red-50 border-red-200",
    textColor: "text-red-700"
  }
};

export default function TransactionLog({ card }: TransactionLogProps) {
  const { state } = useDashboard();
  const [filter, setFilter] = useState<'all' | 'received' | 'spending'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'done' | 'pending' | 'failed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);

  // Filter transactions for this specific card
  const cardTransactions = useMemo(() => {
    let filtered = state.transactions.filter(transaction => transaction.cardId === card.id);
    
    if (filter !== 'all') {
      filtered = filtered.filter(t => t.type === filter);
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [state.transactions, card.id, filter, statusFilter, searchTerm]);

  const visibleTransactions = cardTransactions.slice(0, visibleCount);

  // Calculate summary statistics
  const summary = useMemo(() => {
    const totalReceived = cardTransactions
      .filter(t => t.type === 'received' && t.status === 'done')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalSpending = cardTransactions
      .filter(t => t.type === 'spending' && t.status === 'done')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const pendingAmount = cardTransactions
      .filter(t => t.status === 'pending')
      .reduce((sum, t) => sum + t.amount, 0);

    return { totalReceived, totalSpending, pendingAmount };
  }, [cardTransactions]);

  // Format currency with K, M, B abbreviations
  const formatCompactCurrency = (amount: number): string => {
    if (amount === 0) return 'Rp 0';
    
    const absAmount = Math.abs(amount);
    
    if (absAmount >= 1_000_000_000) {
      return `Rp ${(amount / 1_000_000_000).toFixed(1)}B`;
    } else if (absAmount >= 1_000_000) {
      return `Rp ${(amount / 1_000_000).toFixed(1)}M`;
    } else if (absAmount >= 1_000) {
      return `Rp ${(amount / 1_000).toFixed(1)}K`;
    } else {
      return `Rp ${amount.toLocaleString()}`;
    }
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  return (
    <div className="px-5">


      {/* Compact Filters */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-walle-ocean-blue" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-walle-royal-blue focus:border-walle-royal-blue transition-all text-sm"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-walle-royal-blue focus:border-walle-royal-blue transition-all text-sm"
          >
            <option value="all">All Types</option>
            <option value="received">Received</option>
            <option value="spending">Spending</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-walle-royal-blue focus:border-walle-royal-blue transition-all text-sm"
          >
            <option value="all">All Status</option>
            <option value="done">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Filter Results Info - Compact */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
          <FunnelIcon className="w-3 h-3 text-walle-ocean-blue" />
          <span className="text-xs text-walle-ocean-blue">
            {visibleTransactions.length} of {cardTransactions.length} shown
          </span>
        </div>
      </div>

      {/* Compact Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-green-50 rounded-xl p-3 border border-green-200"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
              <ArrowDownIcon className="w-3 h-3 text-white" />
            </div>
            <div className="text-xs font-semibold text-green-700">Received</div>
          </div>
          <div className="text-lg font-bold text-green-800">
            {formatCompactCurrency(summary.totalReceived)}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-red-50 rounded-xl p-3 border border-red-200"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center">
              <ArrowUpIcon className="w-3 h-3 text-white" />
            </div>
            <div className="text-xs font-semibold text-red-700">Spending</div>
          </div>
          <div className="text-lg font-bold text-red-800">
            {formatCompactCurrency(summary.totalSpending)}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-yellow-50 rounded-xl p-3 border border-yellow-200"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-yellow-500 rounded-lg flex items-center justify-center">
              <ExclamationCircleIcon className="w-3 h-3 text-white" />
            </div>
            <div className="text-xs font-semibold text-yellow-700">Pending</div>
          </div>
          <div className="text-lg font-bold text-yellow-800">
            {formatCompactCurrency(summary.pendingAmount)}
          </div>
        </motion.div>
      </div>

      {/* Compact Transaction List */}
      {cardTransactions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-white rounded-2xl border border-gray-200"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-walle-royal-blue to-walle-ocean-blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ClockIcon className="w-8 h-8 text-white" />
          </div>
          <h4 className="text-lg font-bold text-walle-dark-blue mb-2">
            No Transactions Found
          </h4>
          <p className="text-walle-ocean-blue text-sm">
            {searchTerm || filter !== 'all' || statusFilter !== 'all' 
              ? 'Try adjusting your filters' 
              : 'No transactions found for this card yet'}
          </p>
        </motion.div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-100">
            <AnimatePresence>
              {visibleTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="p-4 hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    {/* Left Side - Compact */}
                    <div className="flex items-center gap-3 flex-1">
                      {/* Transaction Type Icon - Smaller */}
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        transaction.type === 'received' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'received' ? (
                          <ArrowDownIcon className="w-4 h-4" />
                        ) : (
                          <ArrowUpIcon className="w-4 h-4" />
                        )}
                      </div>

                      {/* Transaction Details - Compact */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-walle-dark-blue text-sm truncate">
                            {transaction.recipient}
                          </span>
                          <span className="text-xs font-medium text-walle-ocean-blue bg-walle-soft px-2 py-0.5 rounded-md uppercase">
                            {transaction.coinType}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs text-walle-ocean-blue">
                          <span>{transaction.date}</span>
                          <span>{transaction.time}</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md font-medium">
                            {transaction.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Compact */}
                    <div className="text-right ml-4">
                      {/* Amount - Compact */}
                      <div className={`text-lg font-bold mb-1 ${
                        transaction.type === 'received' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'received' ? '+' : '-'}
                        {formatCompactCurrency(transaction.amount)}
                      </div>

                      {/* Status - Smaller */}
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold border ${
                        statusConfig[transaction.status as keyof typeof statusConfig]?.color || statusConfig.pending.color
                      }`}>
                        {statusConfig[transaction.status as keyof typeof statusConfig]?.icon || statusConfig.pending.icon}
                        <span className="capitalize">{transaction.status}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Compact Load More */}
          {visibleTransactions.length < cardTransactions.length && (
            <div className="p-4 border-t border-gray-200 text-center">
              <motion.button
                onClick={loadMore}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 bg-walle-gradient text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-sm"
              >
                Load More ({cardTransactions.length - visibleTransactions.length})
              </motion.button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}