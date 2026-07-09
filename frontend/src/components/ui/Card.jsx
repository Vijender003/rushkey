import { motion } from 'framer-motion';

const shadowVariants = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  none: '',
};

export default function Card({
  children,
  className = '',
  onClick,
  image,
  badge,
  badgeVariant = 'default',
  shadow = 'md',
  hover = true,
  padding = true,
}) {
  const badgeStyles = {
    default: 'bg-rushkey-500 text-white',
    success: 'bg-emerald-500 text-white',
    warning: 'bg-amber-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -6, transition: { duration: 0.2 } } : undefined}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-2xl border border-gray-100 overflow-hidden transition-shadow duration-300 ${
        shadowVariants[shadow] || shadowVariants.md
      } ${hover ? 'hover:shadow-xl hover:border-gray-200' : ''} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {image && (
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt=""
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {badge && (
            <span
              className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${
                badgeStyles[badgeVariant] || badgeStyles.default
              }`}
            >
              {badge}
            </span>
          )}
        </div>
      )}
      {padding ? <div className="p-5">{children}</div> : children}
    </motion.div>
  );
}
