'use client'

import React from "react";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./wagmi"; 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { XellarKitProvider, lightTheme } from "@xellar/kit";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider theme={lightTheme}>
          <div suppressHydrationWarning>
            {children}
          </div>
        </XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}