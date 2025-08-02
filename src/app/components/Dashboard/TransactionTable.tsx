// components/Dashboard/TransactionTable.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  ShoppingBagIcon,
  HomeIcon,
  GiftIcon,
  AcademicCapIcon,
  HeartIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  TruckIcon
} from "@heroicons/react/24/outline";

// Define transaction type - sesuaikan dengan DashboardContext
interface Transaction {
  id: string;
  date: string;
  time: string;
  coinType: string;
  amount: number;
  type: 'received' | 'spending'; // Changed from 'send' to 'spending'
  category?: string;
  recipient: string;
  status: 'done' | 'pending' | 'failed';
  cardId: string;
  cardAddress?: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  startIndex?: number;
}

// Mapping kategori dengan key yang sesuai dengan data
const categoryIcons: Record<string, JSX.Element> = {
  "Food & Beverage": <ShoppingBagIcon className="w-4 h-4" />,
  "Transportation": <TruckIcon className="w-4 h-4" />,
  "Transfer": <ArrowPathIcon className="w-4 h-4" />,
  "Shopping": <ShoppingBagIcon className="w-4 h-4" />,
  "Utilities": <HomeIcon className="w-4 h-4" />,
  "Entertainment": <GiftIcon className="w-4 h-4" />,
  "Education": <AcademicCapIcon className="w-4 h-4" />,
  "Healthcare": <HeartIcon className="w-4 h-4" />,
  "Salary": <CurrencyDollarIcon className="w-4 h-4" />,
  "Investment": <BanknotesIcon className="w-4 h-4" />,
  "received": <ArrowDownIcon className="w-4 h-4 text-green-600" />,
  "spending": <ArrowUpIcon className="w-4 h-4 text-red-600" /> // Changed from 'send' to 'spending'
};

const statusConfig = {
  done: {
    icon: <CheckCircleIcon className="w-4 h-4" />,
    color: "bg-green-100 text-green-700 border-green-200"
  },
  pending: {
    icon: <ExclamationCircleIcon className="w-4 h-4" />,
    color: "bg-yellow-100 text-yellow-700 border-yellow-200"
  },
  failed: {
    icon: <XCircleIcon className="w-4 h-4" />,
    color: "bg-red-100 text-red-700 border-red-200"
  }
} as const;

// Component untuk tabel transaksi yang bisa digunakan ulang
const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, startIndex = 0 }) => {
  // Fungsi untuk menentukan kategori berdasarkan type
  const getDisplayCategory = (transaction: Transaction): string => {
    if (!transaction.category || transaction.category === 'unknown') {
      return transaction.type === 'received' ? 'received' : 'spending';
    }
    return transaction.category;
  };

  // Fungsi untuk format nomor kartu menggunakan cardAddress
  const formatCardNumber = (cardAddress: string): string => {
    if (!cardAddress || cardAddress.length < 4) return cardAddress || '****';
    const last4 = cardAddress.slice(-4);
    const first3 = cardAddress.slice(0, 3);
    return `${first3}****${last4}`;
  };

  // Fungsi untuk mendapatkan nama kartu berdasarkan cardId
  const getCardName = (cardId: string): string => {
    const cardNames: Record<string, string> = {
      'card-1': 'Main Card',
      'card-2': 'Savings Card',
      'card-3': 'Business Card'
    };
    return cardNames[cardId] || 'Walle Card';
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-xl">
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-white border-b-2 border-gray-200">
            <th className="text-left py-4 px-6 text-sm font-semibold text-walle-dark-blue">No</th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-walle-dark-blue">Date & Time</th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-walle-dark-blue">Coin</th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-walle-dark-blue">Amount</th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-walle-dark-blue">Category</th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-walle-dark-blue">Recipient</th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-walle-dark-blue">Status</th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-walle-dark-blue">Card</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => {
            const displayCategory = getDisplayCategory(transaction);
            const isOddRow = index % 2 === 0;
            
            return (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`border-b border-gray-100 hover:shadow-sm transition-all duration-200 ${
                  isOddRow ? 'bg-blue-50' : 'bg-white'
                }`}
              >
                <td className="py-4 px-6 text-sm font-medium text-slate-600">
                  {startIndex + index + 1}
                </td>
                
                <td className="py-4 px-6 text-sm text-slate-600">
                  <div className="font-medium">{transaction.date}</div>
                  <div className="text-xs font-medium">{transaction.time}</div>
                </td>
                
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600 uppercase">
                      {transaction.coinType}
                    </span>
                  </div>
                </td>
                
                <td className="py-4 px-6">
                  <div className={`flex items-center gap-2 font-medium ${
                    transaction.type === 'received' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <div className={`p-1 rounded-full ${
                      transaction.type === 'received' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'received' ? (
                        <ArrowDownIcon className="w-3 h-3" />
                      ) : (
                        <ArrowUpIcon className="w-3 h-3" />
                      )}
                    </div>
                    <span>
                      {transaction.type === 'received' ? '+' : '-'}
                      {transaction.amount.toLocaleString()}
                    </span>
                  </div>
                </td>
                
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${
                      displayCategory === 'received' ? 'bg-green-100 text-green-600' :
                      displayCategory === 'spending' ? 'bg-red-100 text-red-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {categoryIcons[displayCategory] || <CurrencyDollarIcon className="w-4 h-4" />}
                    </div>
                    <span className="text-sm font-medium text-slate-600">
                      {displayCategory}
                    </span>
                  </div>
                </td>
                
                <td className="py-4 px-6 text-sm text-slate-600 font-medium">
                  {transaction.recipient}
                </td>
                
                <td className="py-4 px-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${
                    statusConfig[transaction.status]?.color || statusConfig.pending.color
                  }`}>
                    {statusConfig[transaction.status]?.icon || statusConfig.pending.icon}
                    <span className="capitalize">
                      {transaction.status}
                    </span>
                  </div>
                </td>
                
                <td className="py-4 px-6">
                  <div className="text-sm">
                    <div className="font-medium text-slate-600">
                      {getCardName(transaction.cardId)}
                    </div>
                    <div className="text-xs font-mono font-medium text-slate-600">
                      {formatCardNumber(transaction.cardAddress || transaction.cardId)}
                    </div>
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
export type { Transaction };