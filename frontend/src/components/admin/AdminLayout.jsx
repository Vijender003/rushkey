import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import { ToastProvider } from './Toast';
import { seedMockData } from '@/data/adminMockData';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    if (!seeded) {
      seedMockData();
      setSeeded(true);
    }
  }, [seeded]);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:pl-64">
          <AdminTopbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main className="p-4 lg:p-6">
            <AnimatePresence mode="wait">
              <Outlet />
            </AnimatePresence>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
