import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDebounce } from '@/features/hooks/useDebounce';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onTypingChange?: (isTyping: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onTypingChange,
  placeholder = 'Type a message...',
  disabled = false,
  className = '',
}) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const debouncedIsTyping = useDebounce(isTyping, 1000);

  // 💬 Notify parent when typing changes
  useEffect(() => {
    onTypingChange?.(message.length > 0 && isTyping);
  }, [message, isTyping, onTypingChange]);

  useEffect(() => {
    if (!debouncedIsTyping) setIsTyping(false);
  }, [debouncedIsTyping]);

  // 📏 Auto resize on message change (pasting etc.)
  useEffect(() => {
    autoGrow();
  }, [message]);

  // 📏 Resize textarea height based on content
  const autoGrow = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = 'auto'; // reset first
    const maxHeight = 160; // ~10 lines
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setIsTyping(true);
  }, []);

  const handleSendMessage = useCallback(() => {
    const trimmed = message.trim();
    if (!trimmed || disabled) return;

    onSendMessage(trimmed);
    setMessage('');
    setIsTyping(false);

    if (textareaRef.current) {
      textareaRef.current.style.height = '2.75rem';
      textareaRef.current.style.overflowY = 'hidden';
      textareaRef.current.focus();
    }
  }, [message, onSendMessage, disabled]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const canSend = message.trim().length > 0 && !disabled;

  return (
    <div className={`${className} w-full`}>
      <div className="w-full flex items-end gap-2">
        {/* ✅ Text Area */}
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-400 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
              placeholder-gray-500 text-sm text-gray-900 transition-all duration-200 
              disabled:opacity-50 disabled:cursor-not-allowed resize-none max-h-40 overflow-hidden"
            maxLength={2000}
          />
          {message.length > 800 && (
            <div className="absolute bottom-2 right-4 text-xs text-gray-400">
              {2000 - message.length}
            </div>
          )}
        </div>

        {/* 🚀 Send Button */}
        <button
          onClick={handleSendMessage}
          disabled={!canSend}
          className={`w-12 h-12 rounded-full flex items-center justify-center
            transition-all duration-200 transform
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${
              canSend
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          aria-label="Send message"
        >
          <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
