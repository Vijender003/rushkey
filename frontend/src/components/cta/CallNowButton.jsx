import { forwardRef } from 'react';
import { FiPhone } from 'react-icons/fi';

const CallNowButton = forwardRef(function CallNowButton({ phone, children, className = '', onTrack, disabled, onClick }, ref) {
  const base = 'flex items-center justify-center gap-2 bg-rushkey-500 hover:bg-rushkey-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-rushkey-500/20 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed';

  if (disabled || onClick) {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={`${base} ${className}`}
      >
        <FiPhone className="w-4 h-4 shrink-0" />
        {children || 'Call Now'}
      </button>
    );
  }

  return (
    <a
      ref={ref}
      href={`tel:${phone.replace(/\s/g, '')}`}
      onClick={onTrack}
      className={`${base} ${className}`}
    >
      <FiPhone className="w-4 h-4 shrink-0" />
      {children || 'Call Now'}
    </a>
  );
});

export default CallNowButton;
