'use client'

import React from "react";
import {WagmiProvider} from "wagmi";
import {wagmiConfig as wagmiConfig} from "./wagmi";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

const queryClient = new QueryClient()

export default function RootLayoutClient({children}: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                     {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}