// components/Shop/PaymentMethods.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCardIcon, 
  BuildingLibraryIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon 
} from "@heroicons/react/24/outline";
import { useShop } from "./ShopContext";

// Payment logo icons as SVG components
const PaymentLogos = {
  visa: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 40 24" {...props}>
      <rect width="40" height="24" rx="4" fill="#1A1F71"/>
      <text x="20" y="15" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">VISA</text>
    </svg>
  ),
  mastercard: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 40 24" {...props}>
      <rect width="40" height="24" rx="4" fill="#EB001B"/>
      <circle cx="15" cy="12" r="7" fill="#FF5F00"/>
      <circle cx="25" cy="12" r="7" fill="#F79E1B"/>
    </svg>
  ),
  amex: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 40 24" {...props}>
      <rect width="40" height="24" rx="4" fill="#006FCF"/>
      <text x="20" y="15" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">AMEX</text>
    </svg>
  ),
  discover: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 40 24" {...props}>
      <rect width="40" height="24" rx="4" fill="#FF6000"/>
      <text x="20" y="15" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">DISCOVER</text>
    </svg>
  ),
  bitcoin: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 40 24" {...props}>
      <rect width="40" height="24" rx="4" fill="#F7931A"/>
      <text x="20" y="15" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">₿</text>
    </svg>
  ),
  ethereum: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 40 24" {...props}>
      <rect width="40" height="24" rx="4" fill="#627EEA"/>
      <text x="20" y="15" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Ξ</text>
    </svg>
  ),
  usdc: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 40 24" {...props}>
      <rect width="40" height="24" rx="4" fill="#2775CA"/>
      <text x="20" y="15" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">USDC</text>
    </svg>
  ),
  usdt: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 40 24" {...props}>
      <rect width="40" height="24" rx="4" fill="#26A17B"/>
      <text x="20" y="15" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">USDT</text>
    </svg>
  ),
  "apple-pay": (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 40 24" {...props}>
      <rect width="40" height="24" rx="4" fill="#000000"/>
      <text x="20" y="15" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold"> Pay</text>
    </svg>
  ),
  "google-pay": (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 40 24" {...props}>
      <rect width="40" height="24" rx="4" fill="#4285F4"/>
      <text x="20" y="15" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">G Pay</text>
    </svg>
  ),
  paypal: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 40 24" {...props}>
      <rect width="40" height="24" rx="4" fill="#003087"/>
      <text x="20" y="15" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">PayPal</text>
    </svg>
  ),
};

type PaymentLogoKey = keyof typeof PaymentLogos;

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  fees: string;
  processingTime: string;
  logos: PaymentLogoKey[];
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "credit-card",
    name: "Credit/Debit Card",
    description: "Pay with your credit or debit card",
    icon: CreditCardIcon,
    fees: "Free",
    processingTime: "Instant",
    logos: ["visa", "mastercard", "amex", "discover"]
  },
  {
    id: "crypto",
    name: "Cryptocurrency",
    description: "Pay with Bitcoin, Ethereum, or other cryptocurrencies",
    icon: BuildingLibraryIcon,
    fees: "Network fees apply",
    processingTime: "5-15 minutes",
    logos: ["bitcoin", "ethereum", "usdc", "usdt"]
  },
  {
    id: "digital-wallet",
    name: "Digital Wallet",
    description: "Pay with Apple Pay, Google Pay, or PayPal",
    icon: DevicePhoneMobileIcon,
    fees: "Free",
    processingTime: "Instant",
    logos: ["apple-pay", "google-pay", "paypal"]
  }
];

interface CardData {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
}

interface DigitalWallet {
  name: string;
  available: boolean;
  icon: PaymentLogoKey;
}

export default function PaymentMethods() {
  const { state } = useShop();
  const [selectedMethod, setSelectedMethod] = useState<string>("credit-card");
  const [cardData, setCardData] = useState<CardData>({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });

  if (!state.selectedCard || !state.shippingOption) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="text-center py-8">
          <CreditCardIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Method</h2>
          <p className="text-gray-600">Complete previous steps to continue</p>
        </div>
      </div>
    );
  }

  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts: string[] = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardDataChange = (field: keyof CardData, value: string): void => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const digitalWallets: DigitalWallet[] = [
    { name: "Apple Pay", available: true, icon: "apple-pay" },
    { name: "Google Pay", available: true, icon: "google-pay" },
    { name: "PayPal", available: true, icon: "paypal" }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary-100 rounded-xl">
          <CreditCardIcon className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Payment Method</h2>
          <p className="text-gray-600">Choose how you&apos;d like to pay</p>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {paymentMethods.map((method, index) => {
          const IconComponent = method.icon;
          
          return (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedMethod(method.id)}
              className={`cursor-pointer border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${
                selectedMethod === method.id
                  ? 'border-primary-500 bg-primary-50 shadow-lg'
                  : 'border-gray-200 hover:border-primary-300 bg-white'
              }`}
            >
              <div className="text-center">
                <div className={`inline-flex p-3 rounded-2xl mb-4 transition-colors ${
                  selectedMethod === method.id 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{method.description}</p>
                
                <div className="space-y-2 text-xs mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fees:</span>
                    <span className="font-medium text-gray-700">{method.fees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Processing:</span>
                    <span className="font-medium text-gray-700">{method.processingTime}</span>
                  </div>
                </div>
                
                {/* Payment Logos */}
                <div className="flex justify-center gap-2 flex-wrap">
                  {method.logos.map((logoKey) => {
                    const LogoComponent = PaymentLogos[logoKey];
                    return (
                      <div key={logoKey} className="w-10 h-6 rounded border border-gray-200 overflow-hidden">
                        <LogoComponent className="w-full h-full" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Payment Form Based on Selected Method */}
      {selectedMethod === "credit-card" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <CreditCardIcon className="w-5 h-5 text-primary-600" />
            Card Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number *
              </label>
              <input
                type="text"
                value={cardData.number}
                onChange={(e) => handleCardDataChange("number", formatCardNumber(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  value={cardData.expiry}
                  onChange={(e) => handleCardDataChange("expiry", formatExpiry(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV *
                </label>
                <input
                  type="text"
                  value={cardData.cvv}
                  onChange={(e) => handleCardDataChange("cvv", e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white"
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name *
              </label>
              <input
                type="text"
                value={cardData.name}
                onChange={(e) => handleCardDataChange("name", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white"
                placeholder="John Doe"
              />
            </div>

            <div className="flex items-center gap-3 mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <input type="checkbox" id="save-card" className="w-4 h-4 text-primary-600 rounded" />
              <label htmlFor="save-card" className="text-sm text-blue-800">
                Save this card for future purchases (optional)
              </label>
            </div>
          </div>
        </motion.div>
      )}

      {selectedMethod === "crypto" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <BuildingLibraryIcon className="w-5 h-5 text-orange-600" />
            Cryptocurrency Payment
          </h3>
          
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BuildingLibraryIcon className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-gray-600 mb-6">
              You&apos;ll be redirected to complete your cryptocurrency payment
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
              {(["bitcoin", "ethereum", "usdc", "usdt"] as PaymentLogoKey[]).map((crypto) => {
                const CryptoIcon = PaymentLogos[crypto];
                return (
                  <div key={crypto} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="w-12 h-8 mx-auto mb-2">
                      <CryptoIcon className="w-full h-full" />
                    </div>
                    <div className="text-xs text-gray-600 capitalize font-medium">{crypto}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {selectedMethod === "digital-wallet" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <DevicePhoneMobileIcon className="w-5 h-5 text-blue-600" />
            Digital Wallet
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {digitalWallets.map((wallet) => {
              const WalletIcon = PaymentLogos[wallet.icon];
              return (
                <button
                  key={wallet.name}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    wallet.available
                      ? 'border-gray-200 hover:border-primary-300 bg-white hover:bg-primary-50 hover:shadow-lg'
                      : 'border-gray-100 bg-gray-100 cursor-not-allowed'
                  }`}
                  disabled={!wallet.available}
                >
                  <div className="w-16 h-10 mx-auto mb-3">
                    <WalletIcon className="w-full h-full" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{wallet.name}</div>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Security Notice */}
      <div className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-200">
        <div className="flex items-start gap-4">
          <ShieldCheckIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-green-800 mb-2">Your payment is secure</h3>
            <div className="text-sm text-green-700 space-y-1">
              <div>• All transactions are encrypted with 256-bit SSL</div>
              <div>• We never store your payment information</div>
              <div>• PCI DSS Level 1 compliant</div>
              <div>• 30-day money-back guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}