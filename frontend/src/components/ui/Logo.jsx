import { Link } from 'react-router-dom';

export default function Logo({ className = '', showText = true, size = 'md' }) {
  const dimensions = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', inner: 'text-sm' },
    md: { icon: 'w-9 h-9', text: 'text-xl', inner: 'text-base' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', inner: 'text-lg' },
  };
  const d = dimensions[size] || dimensions.md;

  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 font-bold ${d.text} ${className}`}>
      <div className={`${d.icon} rounded-xl bg-rushkey-500 flex items-center justify-center text-white ${d.inner} font-extrabold shadow-lg shadow-rushkey-500/30 shrink-0`}>
        R
      </div>
      {showText && (
        <span>
          <span className="text-rushkey-500">Rush</span>
          <span className="text-gray-900">key</span>
        </span>
      )}
    </Link>
  );
}
