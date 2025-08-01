// components/Dashboard/DashboardLayout.tsx
"use client";
import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import { DashboardProvider } from "./DashboardContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gradient-to-br from-walle-ice-blue to-walle-light-gray">
        <DashboardNavbar />
        <main className="pt-32">
          {children}
        </main>
      </div>
    </DashboardProvider>
  );
}