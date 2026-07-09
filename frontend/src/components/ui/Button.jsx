import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Spinner from './Spinner';

const variantClasses = {
  primary:
    'bg-rushkey-500 text-white hover:bg-rushkey-600 focus:ring-rushkey-300 shadow-lg shadow-rushkey-500/20 hover:shadow-rushkey-500/40',
  secondary:
    'border-2 border-rushkey-500 text-rushkey-500 hover:bg-rushkey-50 focus:ring-rushkey-300',
  outline:
    'border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 focus:ring-gray-200',
  ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-200',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300 shadow-lg shadow-red-500/20',
  'white-glass':
    'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 focus:ring-white/30',
};

const sizeClasses = {
  xs: 'px-3 py-1.5 text-xs gap-1.5',
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3 text-base gap-2',
  xl: 'px-8 py-4 text-lg gap-2.5',
};

const radiusClasses = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  full: 'rounded-full',
};

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    radius = 'lg',
    loading = false,
    disabled = false,
    fullWidth = false,
    className = '',
    children,
    type = 'button',
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={isDisabled}
      whileHover={isDisabled ? undefined : { scale: 1.02, y: -1 }}
      whileTap={isDisabled ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`
        inline-flex items-center justify-center font-semibold
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${variantClasses[variant] || variantClasses.primary}
        ${sizeClasses[size] || sizeClasses.md}
        ${radiusClasses[radius] || radiusClasses.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <Spinner
          size="sm"
          color={['primary', 'danger', 'white-glass'].includes(variant) ? 'white' : 'rushkey-500'}
        />
      )}
      {children}
    </motion.button>
  );
});

export default Button;
