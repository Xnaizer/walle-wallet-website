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
  status: 'done' | 'pending' | 'failed';
  cardId: string;
  cardAddress? : string;
  type: 'received' | 'spending';
}

export interface User {
  name: string;
  walletAddress: string;
  profileImage?: string | null;
}

interface DashboardState {
  isWalletConnected: boolean;
  walletAddress: string;
  currentSection: 'overview' | 'cards' | 'settings';
  user: User;
  cards: WalletCard[];
  transactions: Transaction[];
  isFirstTime: boolean;
  hasPin: boolean;
  showWelcomeModal: boolean;
  showPinModal: boolean;
  selectedCardIndex: number;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type DashboardAction =
  | { type: 'CONNECT_WALLET'; payload: { address: string; hasPin: boolean; isFirstTime: boolean } }
  | { type: 'DISCONNECT_WALLET' }
  | { type: 'SET_SECTION'; payload: 'overview' | 'cards' | 'settings' }
  | { type: 'CLOSE_WELCOME_MODAL' }
  | { type: 'CLOSE_PIN_MODAL' }
  | { type: 'SHOW_PIN_MODAL' }
  | { type: 'GENERATE_CARD'; payload: WalletCard }
  | { type: 'UPDATE_CARD'; payload: { cardId: string; updates: Partial<WalletCard> } }
  | { type: 'DELETE_CARD'; payload: string }
  | { type: 'SET_SELECTED_CARD'; payload: number }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'SET_PIN'; payload: boolean }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'UPDATE_USER_PROFILE'; payload: { name: string; profileImage: string | null } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Mock data generators
const generateMockCards = (): WalletCard[] => [
  {
    id: 'card-1',
    name: 'Main Card',
    cardNumber: '4532 **** **** 1234',
    expiryDate: '12/26',
    isActive: true,
    balance: {
      idr: 2500000,
      usdt: 150.50,
      usdc: 200.00,
      idrx: 1800000,
      idrt: 900000
    },
    limits: {
      daily: 5000000,
      weekly: 25000000,
      monthly: 100000000,
      yearly: 500000000
    },
    currentLimitUsed: 750000
  },
  {
    id: 'card-2',
    name: 'Savings Card',
    cardNumber: '5421 **** **** 5678',
    expiryDate: '09/27',
    isActive: true,
    balance: {
      idr: 5000000,
      usdt: 300.75,
      usdc: 450.25,
      idrx: 3200000,
      idrt: 1500000
    },
    limits: {
      daily: 3000000,
      weekly: 15000000,
      monthly: 60000000,
      yearly: 300000000
    },
    currentLimitUsed: 450000
  }
];

// Fungsi untuk format tanggal dengan region
const formatDateWithRegion = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Jakarta'
  });
};

const generateMockTransactions = (): Transaction[] => [
  {
    id: 'tx-1',
    date: formatDateWithRegion('2024-08-01'),
    time: '14:30 WIB',
    coinType: 'usdt',
    amount: 25.50,
    category: 'Food & Beverage',
    recipient: 'Starbucks Indonesia',
    status: 'done',
    cardId: 'card-1',
    cardAddress: '543246137864',
    type: 'spending'
  },
  {
    id: 'tx-2',
    date: formatDateWithRegion('2024-08-01'),
    time: '09:15 WIB',
    coinType: 'usdc',
    amount: 100.00,
    category: 'Transfer',
    recipient: 'John Doe',
    status: 'done',
    cardId: 'card-1',
    cardAddress: '9877564123298',
    type: 'received'
  },
  {
    id: 'tx-3',
    date: formatDateWithRegion('2024-08-01'),
    time: '16:45 WIB',
    coinType: 'idrx',
    amount: 75000,
    category: 'Transportation',
    recipient: 'Gojek',
    status: 'pending', // Transaksi sedang diproses
    cardId: 'card-2',
    cardAddress: '12398675641298',
    type: 'spending'
  },
  {
    id: 'tx-4',
    date: formatDateWithRegion('2024-07-31'),
    time: '12:22 WIB',
    coinType: 'usdt',
    amount: 50.25,
    category: 'Shopping',
    recipient: 'Tokopedia',
    status: 'failed', // Transaksi gagal
    cardId: 'card-1',
    cardAddress: '543246137864',
    type: 'spending'
  },
  {
    id: 'tx-5',
    date: formatDateWithRegion('2024-07-31'),
    time: '08:30 WIB',
    coinType: 'idrt',
    amount: 150000,
    category: 'Utilities',
    recipient: 'PLN Indonesia',
    status: 'done',
    cardId: 'card-2',
    cardAddress: '12398675641298',
    type: 'spending'
  },
  {
    id: 'tx-6',
    date: formatDateWithRegion('2024-07-30'),
    time: '19:45 WITA',
    coinType: 'usdc',
    amount: 75.00,
    category: 'Entertainment',
    recipient: 'Netflix Indonesia',
    status: 'pending',
    cardId: 'card-1',
    cardAddress: '543246137864',
    type: 'spending'
  },
  {
    id: 'tx-7',
    date: formatDateWithRegion('2024-07-30'),
    time: '15:12 WIB',
    coinType: 'idrx',
    amount: 200000,
    category: 'Healthcare',
    recipient: 'RS Siloam',
    status: 'done',
    cardId: 'card-2',
    cardAddress: '12398675641298',
    type: 'spending'
  },
  {
    id: 'tx-8',
    date: formatDateWithRegion('2024-07-29'),
    time: '11:00 WIB',
    coinType: 'usdt',
    amount: 500.00,
    category: 'Salary',
    recipient: 'PT Tech Company',
    status: 'done',
    cardId: 'card-1',
    cardAddress: '9877564123298',
    type: 'received'
  },
  {
    id: 'tx-9',
    date: formatDateWithRegion('2024-07-29'),
    time: '13:20 WIB',
    coinType: 'usdc',
    amount: 35.75,
    category: 'Food & Beverage',
    recipient: 'KFC Indonesia',
    status: 'failed',
    cardId: 'card-1',
    cardAddress: '543246137864',
    type: 'spending'
  },
  {
    id: 'tx-10',
    date: formatDateWithRegion('2024-07-28'),
    time: '21:30 WIT',
    coinType: 'idrt',
    amount: 120000,
    category: 'Education',
    recipient: 'Coursera',
    status: 'pending',
    cardId: 'card-2',
    cardAddress: '12398675641298',
    type: 'spending'
  }
];
const initialState: DashboardState = {
  isWalletConnected: false,
  walletAddress: '',
  currentSection: 'overview',
  user: {
    name: '',
    walletAddress: '',
    profileImage: null
  },
  cards: [],
  transactions: [],
  isFirstTime: true,
  hasPin: false,
  showWelcomeModal: false,
  showPinModal: false,
  selectedCardIndex: 0,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
  switch (action.type) {
    case 'CONNECT_WALLET':
      const userName = `${action.payload.address.slice(0, 6)}...${action.payload.address.slice(-4)}`;
      return {
        ...state,
        isWalletConnected: true,
        walletAddress: action.payload.address,
        user: {
          ...state.user,
          name: userName,
          walletAddress: action.payload.address,
        },
        hasPin: action.payload.hasPin,
        isFirstTime: action.payload.isFirstTime,
        showWelcomeModal: action.payload.isFirstTime,
        showPinModal: !action.payload.hasPin || (!action.payload.isFirstTime && action.payload.hasPin),
        cards: generateMockCards(),
        transactions: generateMockTransactions(),
        error: null
      };
    
    case 'DISCONNECT_WALLET':
      return {
        ...initialState
      };
    
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
        isAuthenticated: true
      };

    case 'SHOW_PIN_MODAL':
      return {
        ...state,
        showPinModal: true,
        isAuthenticated: false
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

    case 'DELETE_CARD':
      return {
        ...state,
        cards: state.cards.filter(card => card.id !== action.payload),
        selectedCardIndex: state.selectedCardIndex > 0 ? state.selectedCardIndex - 1 : 0
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
        showPinModal: false,
        isAuthenticated: action.payload
      };

    case 'SET_AUTHENTICATED':
      return {
        ...state,
        isAuthenticated: action.payload,
        showPinModal: !action.payload
      };

    case 'UPDATE_USER_PROFILE':
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.name,
          profileImage: action.payload.profileImage
        }
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    
    default:
      return state;
  }
};

interface DashboardContextType {
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
  // Helper functions
  connectWallet: (address: string, hasPin?: boolean, isFirstTime?: boolean) => void;
  disconnectWallet: () => void;
  setSection: (section: 'overview' | 'cards' | 'settings') => void;
  updateProfile: (name: string, profileImage: string | null) => void;
  addCard: (card: WalletCard) => void;
  updateCard: (cardId: string, updates: Partial<WalletCard>) => void;
  deleteCard: (cardId: string) => void;
  addTransaction: (transaction: Transaction) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Helper functions
  const connectWallet = (address: string, hasPin: boolean = false, isFirstTime: boolean = true) => {
    dispatch({
      type: 'CONNECT_WALLET',
      payload: { address, hasPin, isFirstTime }
    });
  };

  const disconnectWallet = () => {
    dispatch({ type: 'DISCONNECT_WALLET' });
  };

  const setSection = (section: 'overview' | 'cards' | 'settings') => {
    dispatch({ type: 'SET_SECTION', payload: section });
  };

  const updateProfile = (name: string, profileImage: string | null) => {
    dispatch({
      type: 'UPDATE_USER_PROFILE',
      payload: { name, profileImage }
    });
  };

  const addCard = (card: WalletCard) => {
    dispatch({ type: 'GENERATE_CARD', payload: card });
  };

  const updateCard = (cardId: string, updates: Partial<WalletCard>) => {
    dispatch({ type: 'UPDATE_CARD', payload: { cardId, updates } });
  };

  const deleteCard = (cardId: string) => {
    dispatch({ type: 'DELETE_CARD', payload: cardId });
  };

  const addTransaction = (transaction: Transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  };

  const setAuthenticated = (isAuthenticated: boolean) => {
    dispatch({ type: 'SET_AUTHENTICATED', payload: isAuthenticated });
  };

  const contextValue: DashboardContextType = {
    state,
    dispatch,
    connectWallet,
    disconnectWallet,
    setSection,
    updateProfile,
    addCard,
    updateCard,
    deleteCard,
    addTransaction,
    setAuthenticated
  };

  return (
    <DashboardContext.Provider value={contextValue}>
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