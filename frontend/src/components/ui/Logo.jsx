import { Link } from 'react-router-dom';

export default function Logo({ className = '', showText = true, size = 'md', whiteText = false }) {
  const dimensions = {
    sm: { img: 'h-7', text: 'text-lg' },
    md: { img: 'h-9', text: 'text-xl' },
    lg: { img: 'h-12', text: 'text-2xl' },
  };
  const d = dimensions[size] || dimensions.md;

  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 font-bold ${d.text} ${className}`}>
      <img
        src="/Logo.png"
        alt="Rushkey"
        className={`${d.img} w-auto shrink-0`}
      />
      {showText && (
        <span>
          <span className={`${whiteText ? 'text-white' : 'text-rushkey-500'}`}>Rush</span>
          <span className={`${whiteText ? 'text-white' : 'text-gray-900'}`}>key</span>
        </span>
      )}
    </Link>
  );
}
