import React, { useMemo } from 'react';
import { ChatProps } from '@/features/chat/chat';
import { ChatHeader } from './ChatHeader';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from '@/components/TypingIndicator';
import { ChatInput } from './ChatInput';
import { useAutoScroll } from '@/features/hooks/useAutoScroll';

export const Chat: React.FC<ChatProps> = ({
  recipient,
  messages,
  onSendMessage,
  isTyping = false,
  className = '',
}) => {
  const messagesRef = useAutoScroll<HTMLDivElement>([messages, isTyping]);

  const sortedMessages = useMemo(
    () =>
      [...messages].sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      ),
    [messages]
  );

  return (
    <div className={`flex flex-col h-full max-h-full bg-gray-50 shadow-xl rounded-lg ${className}`}>
      <div className="h-[12%]">
        <ChatHeader recipient={recipient} />
      </div>

      <div
        ref={messagesRef}
        className="max-h-[75%] h-full overflow-y-auto p-4 scroll-smooth"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#3b82f6 #e5e7eb' }}
      >
        {sortedMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center text-gray-500">
            <div>
              <svg
                className="w-12 h-12 mx-auto mb-4 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                />
              </svg>
              <p className="text-sm">No messages yet</p>
              <p className="text-xs text-gray-400 mt-1">Start a conversation!</p>
            </div>
          </div>
        ) : (
          <>
            {sortedMessages.map((message, index) => (
              <MessageBubble key={index} message={message} isOwn={message.senderId === 'user'} />
            ))}
            <TypingIndicator isVisible={isTyping} />
          </>
        )}
      </div>

      <div className="border-t border-gray-200 p-2 bg-white h-[13%] flex items-center">
        <ChatInput onSendMessage={onSendMessage} placeholder={`Ask your AI assistant...`} />
      </div>
    </div>
  );
};
