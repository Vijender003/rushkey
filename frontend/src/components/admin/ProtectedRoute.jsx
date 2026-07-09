import { Navigate, Outlet } from 'react-router-dom';
import { isAdminAuthenticated } from '@/utils/adminAuth';

export default function ProtectedRoute() {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
}
