import React from 'react';
import { FiInbox } from 'react-icons/fi';

const EmptyState = ({ title = 'No data available', description = 'There are no records matching your query.', actionText, onAction, icon: Icon = FiInbox }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white border border-dashed border-slate-200 rounded-xl text-center">
      <div className="p-3 bg-slate-50 text-slate-400 rounded-full mb-3 border border-slate-100">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
      <p className="text-xs text-slate-500 max-w-xs mt-1">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs hover:shadow-sm transition-all"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
