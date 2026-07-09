import { useSelector, useDispatch } from 'react-redux';
import {
  login as loginAction,
  register as registerAction,
  logout as logoutAction,
  updateProfile as updateProfileAction,
} from '@/features/auth/authSlice';

export default function useAuth() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  const login = (credentials) => dispatch(loginAction(credentials));
  const register = (data) => dispatch(registerAction(data));
  const logout = () => dispatch(logoutAction());
  const updateProfile = (data) => dispatch(updateProfileAction(data));

  return { user, isAuthenticated, loading, login, register, logout, updateProfile };
}
