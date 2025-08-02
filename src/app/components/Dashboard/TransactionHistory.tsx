// components/Dashboard/TransactionHistory.tsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClockIcon, 
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import { useDashboard } from "./DashboardContext";
import TransactionTable from "./TransactionTable";

export default function TransactionHistory() {
  const { state } = useDashboard();
  const [showModal, setShowModal] = useState(false);
  const [modalPage, setModalPage] = useState(1);
  const [mainPage, setMainPage] = useState(1);
  
  const TRANSACTIONS_PER_PAGE = 5;
  const MODAL_TRANSACTIONS_PER_PAGE = 50;

  // Calculate main table pagination
  const totalMainPages = Math.ceil(state.transactions.length / TRANSACTIONS_PER_PAGE);
  const mainStartIndex = (mainPage - 1) * TRANSACTIONS_PER_PAGE;
  const displayedTransactions = state.transactions.slice(
    mainStartIndex, 
    mainStartIndex + TRANSACTIONS_PER_PAGE
  );
  
  // Calculate modal pagination
  const totalModalPages = Math.ceil(state.transactions.length / MODAL_TRANSACTIONS_PER_PAGE);
  const modalStartIndex = (modalPage - 1) * MODAL_TRANSACTIONS_PER_PAGE;
  const modalEndIndex = modalStartIndex + MODAL_TRANSACTIONS_PER_PAGE;
  const modalTransactions = state.transactions.slice(modalStartIndex, modalEndIndex);

  const handleViewAll = () => {
    setShowModal(true);
    setModalPage(1);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handlePrevPage = () => {
    if (modalPage > 1) {
      setModalPage(modalPage - 1);
    }
  };

  const handleNextPage = () => {
    if (modalPage < totalModalPages) {
      setModalPage(modalPage + 1);
    }
  };

  const handleMainPrevPage = () => {
    if (mainPage > 1) {
      setMainPage(mainPage - 1);
    }
  };

  const handleMainNextPage = () => {
    if (mainPage < totalMainPages) {
      setMainPage(mainPage + 1);
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-8  ">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-walle-dark-blue flex items-center gap-3">
            Transaction History
          </h2>
          
            {state.transactions.length > 0 && (
              <button 
                onClick={handleViewAll}
                className="flex items-center justify-center gap-3 text-walle-royal-blue cursor-pointer hover:text-walle-dark-blue transition-colors font-medium group"
              >
                View All 
                <ArrowRightIcon className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
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
          <>
            <TransactionTable 
              transactions={displayedTransactions} 
              startIndex={mainStartIndex}
            />
            
            {/* Main Table Pagination */}
            {totalMainPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-slate-500">
                  Showing {mainStartIndex + 1}-{Math.min(mainStartIndex + TRANSACTIONS_PER_PAGE, state.transactions.length)} of {state.transactions.length} transactions
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMainPrevPage}
                    disabled={mainPage === 1}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                    Previous
                  </button>
                  
                  <span className="px-3 py-2 text-sm text-slate-600">
                    {mainPage} of {totalMainPages}
                  </span>
                  
                  <button
                    onClick={handleMainNextPage}
                    disabled={mainPage >= totalMainPages}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 cursor-pointer text-gray-700 hover:bg-walle-dark-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal for All Transactions */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4"
            onClick={handleModalClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-walle-dark-blue flex items-center gap-3">

                  All Transactions ({state.transactions.length})
                </h3>
                <button
                  onClick={handleModalClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-500 " />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-auto p-6">
                <TransactionTable 
                  transactions={modalTransactions} 
                  startIndex={modalStartIndex}
                />
              </div>

              {/* Modal Footer with Pagination */}
              {totalModalPages > 1 && (
                <div className="flex items-center justify-between p-6 border-t border-gray-200">
                  <div className="text-sm text-slate-600">
                    Page {modalPage} of {totalModalPages} 
                    ({modalTransactions.length} of {state.transactions.length} transactions)
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevPage}
                      disabled={modalPage === 1}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeftIcon className="w-4 h-4" />
                      Previous
                    </button>
                    
                    <span className="px-4 py-2 text-sm text-slate-600">
                      {modalPage}
                    </span>
                    
                    <button
                      onClick={handleNextPage}
                      disabled={modalPage === totalModalPages}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-150 text-slate-700 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}