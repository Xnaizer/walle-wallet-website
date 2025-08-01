// components/Dashboard/DashboardContext.tsx
"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

export interface WalletCard {
  id: string;
  name: string;
  cardNumber: string;
  expiryDate: string;
  isActive: boolean;
  balance: {
    idr: number;
    usdt: number;
    usdc: number;
    idrx: number;
    idrt: number;
  };
  limits: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
  currentLimitUsed: number;
}

export interface Transaction {
  id: string;
  date: string;
  time: string;
  coinType: 'usdc' | 'usdt' | 'idrx' | 'idrt';
  amount: number;
  category: string;
  recipient: string;
  status: 'completed' | 'pending' | 'failed';
  cardId: string;
  type: 'received' | 'spending';
}

interface DashboardState {
  isWalletConnected: boolean;
  walletAddress: string;
  currentSection: 'overview' | 'cards' | 'settings';
  user: {
    name: string;
    walletAddress: string;
  };
  cards: WalletCard[];
  transactions: Transaction[];
  isFirstTime: boolean;
  hasPin: boolean;
  showWelcomeModal: boolean;
  showPinModal: boolean;
  selectedCardIndex: number;
}

type DashboardAction =
  | { type: 'CONNECT_WALLET'; payload: { address: string; hasPin: boolean; isFirstTime: boolean } }
  | { type: 'DISCONNECT_WALLET' }
  | { type: 'SET_SECTION'; payload: 'overview' | 'cards' | 'settings' }
  | { type: 'CLOSE_WELCOME_MODAL' }
  | { type: 'CLOSE_PIN_MODAL' }
  | { type: 'GENERATE_CARD'; payload: WalletCard }
  | { type: 'UPDATE_CARD'; payload: { cardId: string; updates: Partial<WalletCard> } }
  | { type: 'SET_SELECTED_CARD'; payload: number }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'SET_PIN'; payload: boolean };

const initialState: DashboardState = {
  isWalletConnected: false,
  walletAddress: '',
  currentSection: 'overview',
  user: {
    name: '',
    walletAddress: '',
  },
  cards: [],
  transactions: [],
  isFirstTime: true,
  hasPin: false,
  showWelcomeModal: false,
  showPinModal: false,
  selectedCardIndex: 0,
};

const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
  switch (action.type) {
    case 'CONNECT_WALLET':
      return {
        ...state,
        isWalletConnected: true,
        walletAddress: action.payload.address,
        user: {
          name: `${action.payload.address.slice(0, 6)}...`,
          walletAddress: action.payload.address,
        },
        hasPin: action.payload.hasPin,
        isFirstTime: action.payload.isFirstTime,
        showWelcomeModal: action.payload.isFirstTime,
        showPinModal: !action.payload.isFirstTime && action.payload.hasPin,
      };
    
    case 'DISCONNECT_WALLET':
      return initialState;
    
    case 'SET_SECTION':
      return {
        ...state,
        currentSection: action.payload,
      };
    
    case 'CLOSE_WELCOME_MODAL':
      return {
        ...state,
        showWelcomeModal: false,
        showPinModal: !state.hasPin,
      };
    
    case 'CLOSE_PIN_MODAL':
      return {
        ...state,
        showPinModal: false,
      };
    
    case 'GENERATE_CARD':
      return {
        ...state,
        cards: [...state.cards, action.payload],
      };
    
    case 'UPDATE_CARD':
      return {
        ...state,
        cards: state.cards.map(card =>
          card.id === action.payload.cardId
            ? { ...card, ...action.payload.updates }
            : card
        ),
      };
    
    case 'SET_SELECTED_CARD':
      return {
        ...state,
        selectedCardIndex: action.payload,
      };
    
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    
    case 'SET_PIN':
      return {
        ...state,
        hasPin: action.payload,
      };
    
    default:
      return state;
  }
};

interface DashboardContextType {
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};