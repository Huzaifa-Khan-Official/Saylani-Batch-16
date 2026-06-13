import React from 'react';

const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };

  return (
    <div className={`flex justify-center items-center p-8 ${className}`}>
      <div className={`animate-spin rounded-full border-indigo-500 border-t-transparent ${sizeClasses[size] || sizeClasses.medium}`}></div>
    </div>
  );
};

export default LoadingSpinner;
