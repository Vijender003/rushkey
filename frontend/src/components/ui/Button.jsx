import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Spinner from './Spinner';

const variantClasses = {
  primary: 'bg-rushkey-500 text-white hover:bg-rushkey-600 focus:ring-rushkey-300 shadow-sm',
  secondary: 'border-2 border-rushkey-500 text-rushkey-500 hover:bg-rushkey-50 focus:ring-rushkey-300',
  ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-300',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300 shadow-sm',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2.5',
};

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
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
      whileTap={isDisabled ? undefined : { scale: 0.97 }}
      className={`
        inline-flex items-center justify-center font-medium rounded-lg
        transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant] || variantClasses.primary}
        ${sizeClasses[size] || sizeClasses.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && <Spinner size="sm" color={variant === 'primary' || variant === 'danger' ? 'white' : 'rushkey-500'} />}
      {children}
    </motion.button>
  );
});

export default Button;
