import { createContext, useContext, useState, useCallback } from 'react';
import api from '@/lib/axios';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('sf_admin_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password }, { withCredentials: true });
    localStorage.setItem('sf_admin_token', data.token);
    localStorage.setItem('sf_admin_user', JSON.stringify(data.user));
    setAdmin(data.user);
  }, []);

  const logout = useCallback(() => {
    api.get('/auth/logout').catch(() => {});
    setAdmin(null);
    localStorage.removeItem('sf_admin_token');
    localStorage.removeItem('sf_admin_user');
  }, []);

  const value = { isAuthenticated: !!admin, admin, login, logout, sidebarOpen, setSidebarOpen, loading: false };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be inside AdminProvider');
  return ctx;
}
