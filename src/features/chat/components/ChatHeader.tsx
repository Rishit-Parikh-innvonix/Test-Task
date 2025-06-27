import React from 'react';
import { User } from '@/features/chat/chat';
import { Avatar } from '@/components/Avatar';

interface ChatHeaderProps {
  recipient: User;
  onBack?: () => void;
  className?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ recipient, onBack, className = '' }) => {
  return (
    <div
      className={`
      bg-white border-b border-gray-200 px-4 py-3 flex items-center space-x-3 shadow-sm h-[100%] ${className}
    `}
    >
      {onBack && (
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Go back"
        >
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      <Avatar user={recipient} showOnlineStatus className="flex-shrink-0" />

      <div className="min-w-0">
        <h2 className="font-semibold text-gray-900 truncate">AI Chat</h2>
      </div>
    </div>
  );
};
