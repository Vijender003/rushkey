import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import SearchResults from '@/pages/SearchResults';
import PropertyDetails from '@/pages/PropertyDetails';
import AuthPage from '@/pages/AuthPage';
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/NotFound';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminListings from '@/pages/admin/AdminListings';
import AdminAddListing from '@/pages/admin/AdminAddListing';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminLeads from '@/pages/admin/AdminLeads';
import AdminSettings from '@/pages/admin/AdminSettings';

function UserProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth || {});
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/login" element={<AuthPage initialTab="login" />} />
          <Route path="/signup" element={<AuthPage initialTab="signup" />} />
          <Route path="/dashboard" element={<UserProtectedRoute><Dashboard /></UserProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="listings" element={<AdminListings />} />
          <Route path="listings/new" element={<AdminAddListing />} />
          <Route path="listings/:id" element={<AdminAddListing />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
  );
}
