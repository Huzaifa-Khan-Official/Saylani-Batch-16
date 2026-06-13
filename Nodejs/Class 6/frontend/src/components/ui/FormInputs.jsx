import React from 'react';

export const Input = ({ label, id, error, className = '', ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-3.5 py-2 border rounded-lg shadow-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors text-sm text-slate-800 border-slate-200 placeholder-slate-400 bg-white ${
          error ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500' : 'border-slate-200'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
};

export const Select = ({ label, id, error, options = [], className = '', ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full px-3.5 py-2 border rounded-lg shadow-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors text-sm text-slate-800 border-slate-200 bg-white ${
          error ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500' : 'border-slate-200'
        } ${className}`}
        {...props}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
};

export const Textarea = ({ label, id, error, className = '', ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`w-full px-3.5 py-2 border rounded-lg shadow-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors text-sm text-slate-800 border-slate-200 placeholder-slate-400 bg-white min-h-[100px] ${
          error ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500' : 'border-slate-200'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
};
