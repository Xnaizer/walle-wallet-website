// app/dashboard/page.tsx
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import DashboardContent from "../components/Dashboard/DashboardContent";

export const metadata = {
  title: 'Dashboard - Walle Wallet',
  description: 'Manage your Walle cards and transactions in one place',
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
}