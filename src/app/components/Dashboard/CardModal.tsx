"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  CreditCardIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useAccount } from "wagmi";
import {
  useAccessCard,
  useCardOperationPermissions,
} from "src/app/hooks/useCardEIP712";

interface CardSignInModalProps {
  isOpen: boolean;
  onClose: (success?: boolean) => void;
  onConfirm: (cardData: {
    cardId: string;
    pin: string;
    secretKey: string;
  }) => void;
}

export default function CardSignInModal({
  isOpen,
  onClose,
  onConfirm,
}: CardSignInModalProps) {
  const [cardId, setCardId] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [signInStep, setSignInStep] = useState<
    "form" | "signing" | "submitting" | "success"
  >("form");

  const { address, isConnected } = useAccount();
  const accessCardMutation = useAccessCard();
  const { data: permissions } = useCardOperationPermissions();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!cardId.trim()) {
      newErrors.cardId = "Card ID is required";
    } else if (cardId.length < 8) {
      newErrors.cardId = "Card ID must be at least 8 characters";
    }

    if (!pin) {
      newErrors.pin = "PIN is required";
    } else if (pin.length !== 6) {
      newErrors.pin = "PIN must be exactly 6 digits";
    } else if (!/^\d+$/.test(pin)) {
      newErrors.pin = "PIN must contain only numbers";
    }

    if (!isConnected) {
      newErrors.wallet = "Please connect your wallet first";
    } else if (permissions && !permissions.canAccess) {
      newErrors.wallet =
        permissions.reason || "Cannot access cards at this time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setSignInStep("signing");

    try {
      const result = await accessCardMutation.mutateAsync({
        cardId: cardId.trim(),
        pin: pin,
      });

      setSignInStep("success");

      setTimeout(() => {
        // Success - call the parent callback
        onConfirm({
          cardId: cardId.trim(),
          pin: pin,
          secretKey: result.hsmKey as string,
        });

        // Reset form
        resetForm();
        onClose(true);
      }, 2000);
    } catch (error: any) {
      console.error("Card sign in error:", error);
      setErrors({
        general:
          error.message || "Failed to sign in with card. Please try again.",
      });
      setSignInStep("form");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCardId("");
    setPin("");
    setErrors({});
    setSignInStep("form");
  };

  const handleClose = () => {
    if (!isLoading && !accessCardMutation.isPending) {
      resetForm();
      onClose();
    }
  };

  // Update sign in step based on mutation state
  useEffect(() => {
    if (accessCardMutation.isPending) {
      setIsLoading(true);
      if (signInStep === "form") {
        setSignInStep("signing");
      }
      // Check if we're in the submitting phase
      setTimeout(() => {
        if (accessCardMutation.isPending && signInStep === "signing") {
          setSignInStep("submitting");
        }
      }, 3000); // After 3 seconds of signing, assume we're submitting
    } else {
      setIsLoading(false);
    }
  }, [accessCardMutation.isPending, signInStep]);

  // Clear errors when mutation succeeds
  useEffect(() => {
    if (accessCardMutation.isSuccess) {
      setErrors({});
    }
  }, [accessCardMutation.isSuccess]);

  // Handle mutation error
  useEffect(() => {
    if (accessCardMutation.error) {
      setErrors({
        general: accessCardMutation.error.message || "Sign in failed",
      });
      setSignInStep("form");
    }
  }, [accessCardMutation.error]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(2px)",
        }}
        onClick={!isLoading ? handleClose : undefined}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border-2 border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-walle-dark-blue flex items-center gap-3">
              <CreditCardIcon className="w-6 h-6 text-walle-royal-blue" />
              {signInStep === "form" && "Sign In with Card"}
              {signInStep === "signing" && "Sign Transaction"}
              {signInStep === "submitting" && "Accessing Card"}
              {signInStep === "success" && "Sign In Successful"}
            </h3>
            {!isLoading && signInStep !== "success" && (
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            )}
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {signInStep === "form" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* General Error */}
                {errors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-red-800 mb-1">
                          Sign In Failed
                        </h4>
                        <p className="text-xs text-red-600">{errors.general}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Wallet Connection Error */}
                {errors.wallet && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-yellow-800 mb-1">
                          Wallet Required
                        </h4>
                        <p className="text-xs text-yellow-600">
                          {errors.wallet}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card ID Input */}
                <div>
                  <label className="block text-sm font-semibold text-walle-dark-blue mb-2">
                    Card ID / UUID
                  </label>
                  <input
                    type="text"
                    value={cardId}
                    onChange={(e) => setCardId(e.target.value)}
                    placeholder="Enter your card UUID (e.g., 94a57839-b7ef-4ff7-a1d6-54d37315a635)"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.cardId
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-walle-royal-blue"
                    }`}
                    disabled={isLoading}
                  />
                  {errors.cardId && (
                    <p className="text-red-500 text-sm mt-1">{errors.cardId}</p>
                  )}
                </div>

                {/* PIN Input */}
                <div>
                  <label className="block text-sm font-semibold text-walle-dark-blue mb-2">
                    <LockClosedIcon className="w-4 h-4 inline mr-1" />
                    PIN (6 digits)
                  </label>
                  <div className="relative">
                    <input
                      type={showPin ? "text" : "password"}
                      value={pin}
                      onChange={(e) =>
                        setPin(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      placeholder="Enter 6-digit PIN"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all pr-12 ${
                        errors.pin
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-walle-royal-blue"
                      }`}
                      maxLength={6}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      disabled={isLoading}
                    >
                      {showPin ? (
                        <EyeSlashIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.pin && (
                    <p className="text-red-500 text-sm mt-1">{errors.pin}</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl cursor-pointer font-medium hover:bg-gray-50 transition-colors"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white hover:text-slate-100 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                    disabled={
                      isLoading ||
                      !isConnected ||
                      accessCardMutation.isPending ||
                      (permissions && !permissions.canAccess)
                    }
                  >
                    {accessCardMutation.isPending ? "Processing..." : "Sign In"}
                  </button>
                </div>
              </form>
            )}

            {/* Signing Step */}
            {signInStep === "signing" && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LockClosedIcon className="w-8 h-8 text-blue-600 animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-walle-dark-blue mb-2">
                  Sign Transaction
                </h3>
                <p className="text-gray-600 mb-4">
                  Please sign the transaction in your wallet to access your
                  card.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-yellow-700">
                    Check your wallet for the signing request. This will verify
                    your card access permissions.
                  </p>
                </div>
              </div>
            )}

            {/* Submitting Step */}
            {signInStep === "submitting" && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-lg font-semibold text-walle-dark-blue mb-2">
                  Accessing Card
                </h3>
                <p className="text-gray-600">
                  Verifying your card credentials on the blockchain...
                </p>
              </div>
            )}

            {/* Success Step */}
            {signInStep === "success" && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Card Access Granted!
                </h3>
                <p className="text-gray-600 mb-4">
                  You have successfully signed in with your card.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="text-sm text-green-700">
                    <p className="font-medium mb-1">Card ID: {cardId}</p>
                    <p>You can now use this card for secure payments.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
