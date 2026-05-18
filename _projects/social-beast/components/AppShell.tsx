"use client";

import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { ensureSeedData } from "@/lib/seed-data";

export default function AppShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    ensureSeedData();
  }, []);

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-surface">
      <Sidebar />
      <div className="lg:pl-64 transition-all duration-300">
        <Navbar />
        <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
