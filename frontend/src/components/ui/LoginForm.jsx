import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMail, HiOutlineLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';

function FloatingInput({ label, type, value, onChange, error, icon: Icon }) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isFloating = focused || value;
  const isPassword = type === 'password';
  const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <motion.div
      className="relative"
      animate={error ? { x: [0, -8, 8, -8, 8, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      <div
        className={`relative rounded-xl border-2 transition-all duration-300 ${
          error
            ? 'border-red-400 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]'
            : focused
            ? 'border-rushkey-500 shadow-[0_0_0_4px_rgba(255,90,31,0.1)]'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={resolvedType}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-transparent pt-6 pb-2 text-gray-900 outline-none text-base placeholder-transparent ${
            Icon ? 'pl-12' : 'pl-4'
          } ${isPassword ? 'pr-12' : 'pr-4'}`}
          placeholder={label}
          autoComplete={type === 'password' ? 'current-password' : 'email'}
        />
        <label
          className={`absolute transition-all duration-300 pointer-events-none origin-left select-none ${
            Icon ? 'left-12' : 'left-4'
          } ${
            isFloating
              ? 'top-3 text-[11px] font-medium text-rushkey-500'
              : 'top-1/2 -translate-y-1/2 text-gray-400 text-base'
          }`}
        >
          {label}
        </label>
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
          </button>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 text-xs text-red-400 pl-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function LoginForm({ onSubmit, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Please enter a valid email';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'At least 6 characters needed';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ email, password });
  };

  const clearError = (field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <motion.div variants={itemVariants} className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-400 text-sm mt-1">Sign in to continue to Rushkey</p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <FloatingInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
          error={errors.email}
          icon={HiOutlineMail}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FloatingInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); clearError('password'); }}
          error={errors.password}
          icon={HiOutlineLockClosed}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="relative">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="sr-only" />
            <div
              className={`w-4 h-4 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                remember ? 'bg-rushkey-500 border-rushkey-500' : 'border-gray-300 group-hover:border-gray-400'
              }`}
            >
              {remember && (
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
        </label>
        <button type="button" className="text-sm font-medium text-rushkey-500 hover:text-rushkey-600 transition-colors">
          Forgot password?
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255,90,31,0.3)' }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rushkey-500 to-rushkey-600 text-white font-semibold text-base shadow-lg shadow-rushkey-500/25 hover:shadow-rushkey-500/40 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Signing in...
            </span>
          ) : (
            'Login'
          )}
        </motion.button>
      </motion.div>

      <motion.div variants={itemVariants} className="text-center">
        <p className="text-xs text-gray-400">Protected by end-to-end encryption. Your data is safe with us.</p>
      </motion.div>
    </motion.form>
  );
}
