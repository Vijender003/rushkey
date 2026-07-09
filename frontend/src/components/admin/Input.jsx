export default function Input({
  label,
  error,
  icon: Icon,
  type = 'text',
  className = '',
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
        {type === 'textarea' ? (
          <textarea
            {...props}
            className={`w-full px-3 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rushkey-500/20 focus:border-rushkey-500 transition-all resize-none ${
              error ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'
            }`}
          />
        ) : type === 'select' ? (
          <select
            {...props}
            className={`w-full px-3 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rushkey-500/20 focus:border-rushkey-500 transition-all appearance-none ${
              error ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {props.children}
          </select>
        ) : (
          <input
            type={type}
            {...props}
            className={`w-full ${
              Icon ? 'pl-10 pr-4' : 'px-3'
            } py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rushkey-500/20 focus:border-rushkey-500 transition-all ${
              error ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'
            }`}
          />
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
