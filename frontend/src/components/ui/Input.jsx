import { forwardRef, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const variantClasses = {
  outline: 'border border-gray-300 bg-white focus:border-rushkey-500 focus:ring-rushkey-500',
  filled: 'border-0 bg-gray-100 focus:bg-gray-50 focus:ring-rushkey-500',
};

const Input = forwardRef(function Input(
  {
    label,
    error,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    variant = 'outline',
    type = 'text',
    className = '',
    id,
    ...props
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  const isPassword = type === 'password';
  const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {LeftIcon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <LeftIcon className="w-5 h-5" />
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          type={resolvedType}
          className={`
            w-full rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400
            transition-colors duration-150 focus:outline-none focus:ring-2
            ${variantClasses[variant] || variantClasses.outline}
            ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-400' : ''}
            ${LeftIcon ? 'pl-10' : ''}
            ${RightIcon || isPassword ? 'pr-10' : ''}
            ${className}
          `}
          {...props}
        />
        {(RightIcon || isPassword) && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {isPassword ? (
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
              </button>
            ) : (
              <span className="text-gray-400 pointer-events-none">
                <RightIcon className="w-5 h-5" />
              </span>
            )}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

export default Input;
