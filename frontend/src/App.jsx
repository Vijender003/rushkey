import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import SearchResults from '@/pages/SearchResults';
import PropertyDetails from '@/pages/PropertyDetails';
import AuthPage from '@/pages/AuthPage';
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/NotFound';

import { AdminProvider } from '@/pages/admin/AdminContext';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProperties from '@/pages/admin/AdminProperties';
import AdminAddProperty from '@/pages/admin/AdminAddProperty';
import AdminBookings from '@/pages/admin/AdminBookings';
import AdminTenants from '@/pages/admin/AdminTenants';
import AdminReviews from '@/pages/admin/AdminReviews';

function UserProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth || {});
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AdminProvider>
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
          <Route path="properties" element={<AdminProperties />} />
          <Route path="add-property" element={<AdminAddProperty />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="tenants" element={<AdminTenants />} />
          <Route path="reviews" element={<AdminReviews />} />
        </Route>
      </Routes>
    </AdminProvider>
  );
}
