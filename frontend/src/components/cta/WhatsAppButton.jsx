import { forwardRef } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

function buildMessage(pgName, location) {
  return `Hi! I am interested in "${pgName}" located in ${location}. I saw this listing on the PG Finder platform. Please share more details about availability, rent, and visit timings.`;
}

const WhatsAppButton = forwardRef(function WhatsAppButton({ phone, pgName, location, message, children, className = '', onTrack, disabled, onClick }, ref) {
  const text = encodeURIComponent(message || buildMessage(pgName, location));
  const clean = phone.replace(/\D/g, '');
  const href = `https://wa.me/${clean}?text=${text}`;
  const base = 'flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed';

  if (disabled || onClick) {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={`${base} ${className}`}
      >
        <FaWhatsapp className="w-4 h-4 shrink-0" />
        {children || 'WhatsApp'}
      </button>
    );
  }

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onTrack}
      className={`${base} ${className}`}
    >
      <FaWhatsapp className="w-4 h-4 shrink-0" />
      {children || 'WhatsApp'}
    </a>
  );
});

export default WhatsAppButton;
