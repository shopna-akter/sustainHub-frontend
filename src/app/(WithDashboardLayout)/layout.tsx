import WithDashboardLayout from '@/components/layout/DashboardLayout';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WithDashboardLayout>{children}</WithDashboardLayout>;
}