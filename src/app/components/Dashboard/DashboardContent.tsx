// components/Dashboard/DashboardContent.tsx
"use client";
import React from "react";
import { useDashboard } from "./DashboardContext";
import WalletConnectPrompt from "./WalletConnectPrompt";
import WelcomeModal from "./WelcomeModal";
import PinModal from "./PinModal";
import OverviewSection from "./OverviewSection";
import CardsSection from "./CardsSection";
import SettingsSection from "./SettingsSection";

export default function DashboardContent() {
  const { state } = useDashboard();

  if (!state.isWalletConnected) {
    return <WalletConnectPrompt />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Modals */}
      {state.showWelcomeModal && <WelcomeModal />}
      {state.showPinModal && <PinModal />}

      {/* Main Content */}
      {state.currentSection === 'overview' && <OverviewSection />}
      {state.currentSection === 'cards' && <CardsSection />}
      {state.currentSection === 'settings' && <SettingsSection />}
    </div>
  );
}