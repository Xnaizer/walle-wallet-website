// components/Shop/ShopContext.tsx
"use client";
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export interface CardColor {
  id: string;
  name: string;
  color: string;
  gradient: string;
  price: number;
  image: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
}

export interface ShopState {
  selectedCard: CardColor | null;
  quantity: number;
  shippingOption: ShippingOption | null;
  isWorldwide: boolean;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

type ShopAction =
  | { type: 'SELECT_CARD'; payload: CardColor }
  | { type: 'SET_QUANTITY'; payload: number }
  | { type: 'SELECT_SHIPPING'; payload: ShippingOption }
  | { type: 'SET_WORLDWIDE'; payload: boolean }
  | { type: 'CALCULATE_TOTALS' };

const initialState: ShopState = {
  selectedCard: null,
  quantity: 1,
  shippingOption: null,
  isWorldwide: false,
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
};

const shopReducer = (state: ShopState, action: ShopAction): ShopState => {
  switch (action.type) {
    case 'SELECT_CARD':
      return { ...state, selectedCard: action.payload };
    case 'SET_QUANTITY':
      return { ...state, quantity: action.payload };
    case 'SELECT_SHIPPING':
      return { ...state, shippingOption: action.payload };
    case 'SET_WORLDWIDE':
      return { ...state, isWorldwide: action.payload };
    case 'CALCULATE_TOTALS':
      const subtotal = state.selectedCard ? state.selectedCard.price * state.quantity : 0;
      const shipping = state.shippingOption ? state.shippingOption.price : 0;
      const tax = subtotal * 0.1; // 10% tax
      const total = subtotal + shipping + tax;
      return { ...state, subtotal, shipping, tax, total };
    default:
      return state;
  }
};

const ShopContext = createContext<{
  state: ShopState;
  dispatch: React.Dispatch<ShopAction>;
} | null>(null);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within ShopProvider');
  }
  return context;
};