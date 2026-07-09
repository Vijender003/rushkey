import { motion } from 'framer-motion';

const shadowVariants = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  none: '',
};

export default function Card({
  children,
  className = '',
  onClick,
  image,
  badge,
  shadow = 'md',
  hover = true,
}) {
  const Component = onClick ? motion.div : motion.div;

  return (
    <Component
      onClick={onClick}
      whileHover={hover && onClick ? { scale: 1.02, y: -4 } : hover ? { y: -4 } : undefined}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-xl overflow-hidden ${
        shadowVariants[shadow] || shadowVariants.md
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {image && (
        <div className="relative">
          <img
            src={image}
            alt=""
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          {badge && (
            <span className="absolute top-3 left-3 bg-rushkey-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {badge}
            </span>
          )}
        </div>
      )}
      <div className="p-4">{children}</div>
    </Component>
  );
}
