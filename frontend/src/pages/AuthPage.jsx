import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import AuthLayout from '@/components/ui/AuthLayout';
import LoginForm from '@/components/ui/LoginForm';
import SignupForm from '@/components/ui/SignupForm';
import { login, register, clearError } from '@/features/auth/authSlice';

export default function AuthPage({ initialTab = 'login' }) {
  const [isLogin, setIsLogin] = useState(initialTab === 'login');
  const [direction, setDirection] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (isAuthenticated) navigate(redirect, { replace: true });
  }, [isAuthenticated, navigate, redirect]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleLogin = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      toast.success('Welcome back!');
    } catch {}
  };

  const handleSignup = async (data) => {
    try {
      await dispatch(register(data)).unwrap();
      toast.success('Account created!');
    } catch {}
  };

  const switchToLogin = useCallback(() => {
    if (!isLogin) { setDirection(1); setIsLogin(true); }
  }, [isLogin]);

  const switchToSignup = useCallback(() => {
    if (isLogin) { setDirection(-1); setIsLogin(false); }
  }, [isLogin]);

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 30 : -30 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -30 : 30 }),
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center mb-8">
        <div className="relative flex bg-gray-100 rounded-full p-1 w-56">
          <motion.div
            className="absolute top-1 bottom-1 w-1/2 rounded-full bg-rushkey-500"
            layout
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{ left: isLogin ? '4px' : 'calc(50% + 2px)' }}
          />
          <button
            type="button"
            onClick={switchToLogin}
            className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
              isLogin ? 'text-white' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={switchToSignup}
            className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
              !isLogin ? 'text-white' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={isLogin ? 'login' : 'signup'}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {isLogin ? (
            <LoginForm onSubmit={handleLogin} loading={loading} />
          ) : (
            <SignupForm onSubmit={handleSignup} loading={loading} />
          )}
        </motion.div>
      </AnimatePresence>
    </AuthLayout>
  );
}
