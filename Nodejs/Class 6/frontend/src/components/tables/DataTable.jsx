import React, { useState } from 'react';
import EmptyState from '../ui/EmptyState';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const DataTable = ({ columns = [], data = [], itemsPerPage = 8, emptyTitle, emptyDesc, actionText, onAction }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (data.length === 0) {
    return (
      <div className="py-8">
        <EmptyState 
          title={emptyTitle} 
          description={emptyDesc} 
          actionText={actionText} 
          onAction={onAction} 
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  className={`px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.map((row, rowIdx) => (
              <tr 
                key={row.id || rowIdx} 
                className="hover:bg-slate-50/50 transition-colors"
              >
                {columns.map((col, colIdx) => (
                  <td 
                    key={colIdx} 
                    className={`px-6 py-4 text-sm text-slate-700 whitespace-nowrap ${col.className || ''}`}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-slate-100">
          <div className="text-xs text-slate-500">
            Showing <span className="font-semibold text-slate-800">{startIndex + 1}</span> to{' '}
            <span className="font-semibold text-slate-800">
              {Math.min(startIndex + itemsPerPage, data.length)}
            </span>{' '}
            of <span className="font-semibold text-slate-800">{data.length}</span> entries
          </div>
          <div className="flex space-x-1.5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-lg border text-slate-600 transition-all ${
                currentPage === 1 
                  ? 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed' 
                  : 'border-slate-200 hover:bg-slate-50 active:scale-95'
              }`}
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  currentPage === page
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50 active:scale-95'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-1.5 rounded-lg border text-slate-600 transition-all ${
                currentPage === totalPages 
                  ? 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed' 
                  : 'border-slate-200 hover:bg-slate-50 active:scale-95'
              }`}
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
