import React from 'react';

interface TypingIndicatorProps {
  userName: string;
  isVisible: boolean;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ userName, isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className="flex items-center space-x-3 px-4 py-2">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-900 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-blue-900 rounded-full animate-bounce delay-100" />
        <div className="w-2 h-2 bg-blue-900 rounded-full animate-bounce delay-200" />
      </div>
      <span className="text-xs ">{userName} is typing...</span>
    </div>
  );
};
