import { motion } from 'framer-motion';
import { HiSearch } from 'react-icons/hi';

export default function DataTable({
  columns,
  data,
  search,
  onSearch,
  searchPlaceholder = 'Search...',
  filters,
  emptyMessage = 'No data found',
  onRowClick,
  loading,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      {(onSearch || filters) && (
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            {onSearch && (
              <div className="relative flex-1 max-w-sm">
                <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={(e) => onSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rushkey-500/20 focus:border-rushkey-500 transition-all"
                />
              </div>
            )}
            {filters && <div className="flex gap-2 flex-wrap">{filters}</div>}
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5 ${
                    col.hideOnSmall ? 'hidden ' + col.hideOnSmall : ''
                  } ${col.align === 'right' ? 'text-right' : ''}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 py-3.5 ${col.hideOnSmall || ''}`}>
                      <div className="h-4 bg-gray-100 rounded animate-pulse" style={{ width: `${60 + Math.random() * 30}%` }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-16">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <HiSearch className="w-5 h-5 text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-400">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <motion.tr
                  key={row.id || i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  onClick={() => onRowClick?.(row)}
                  className={`border-b border-gray-50 transition-all duration-150 ${
                    onRowClick ? 'cursor-pointer' : ''
                  } hover:bg-gray-50/70`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-3.5 text-sm ${col.hideOnSmall || ''} ${
                        col.align === 'right' ? 'text-right' : ''
                      } ${col.className || ''}`}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
