import React from 'react';
import { Message } from '@/features/chat/chat';
import { formatMessageTime } from '@/utils/dateUtils';
import AiAvtar from '@/assets/svg/aiAvtar.svg?react';
import UserAvtar from '@/assets/svg/user.svg?react';
interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
  className?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwn,
  showAvatar = true,
  className = '',
}) => {
  return (
    <div
      className={`
        flex items-end space-x-2 mb-4 group
        ${isOwn ? 'justify-end' : 'justify-start'}
        ${className}
      `}
    >
      {!isOwn && showAvatar && (
        <AiAvtar className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />
      )}

      <div
        className={`
          max-w-xs lg:max-w-md px-4 py-2 rounded-2xl
          ${
            isOwn
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md'
              : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
          }
          shadow-sm
          transform transition-all duration-200 ease-out
          group-hover:scale-[1.02]
        `}
      >
        <p className="text-sm leading-relaxed break-words">{message.text}</p>

        <div
          className={`
            flex items-center justify-end mt-1 space-x-1
            ${isOwn ? 'text-blue-100' : 'text-gray-500'}
          `}
        >
          <span className="text-xs text-gray-400">{formatMessageTime(message.timestamp)}</span>

          {isOwn && message.status && (
            <div className="flex">
              {message.status === 'sending' && (
                <div className="w-3 h-3 animate-spin rounded-full border border-current border-t-transparent" />
              )}
              {message.status === 'sent' && (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {message.status === 'delivered' && (
                <div className="flex">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg className="w-3 h-3 -ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
              {message.status === 'read' && (
                <div className="flex text-blue-300">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg className="w-3 h-3 -ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {isOwn && showAvatar && (
        <UserAvtar className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />
      )}
    </div>
  );
};
