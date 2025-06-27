import React from 'react';

interface LoaderProps {
  message?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Loading...', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
      
      {/* Optional loading message */}
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default Loader;
