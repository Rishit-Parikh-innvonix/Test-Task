import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { ChatSidebarProps } from '@/types/Sidebar';
import SidebarContent from './SideBarContent';

const ANIMATION_DURATION = 300;

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  users,
  selectedUserId,
  onSelect,
  onNewChat,
  isOpen = false,
  onClose,
}) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10); // slight delay for transition to apply
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => onClose?.();

  return (
    <>
      {/* ✅ Desktop */}
      <aside className="hidden lg:flex w-64 h-full bg-chat-bg-secondary border-r border-chat-gray-100 flex-col">
        <SidebarContent
          users={users}
          selectedUserId={selectedUserId}
          onSelect={onSelect}
          onNewChat={onNewChat}
        />
      </aside>

      {/* ✅ Tablet */}
      <aside className="hidden md:flex lg:hidden w-67 h-full bg-chat-bg-secondary border-r border-chat-gray-100 flex-col">
        <SidebarContent
          users={users}
          selectedUserId={selectedUserId}
          onSelect={onSelect}
          onNewChat={onNewChat}
          isTablet
        />
      </aside>

      {/* ✅ Mobile (Animated Drawer) */}
      {shouldRender && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className={`w-80 max-w-[85vw] bg-chat-bg-secondary h-full shadow-2xl flex flex-col transform transition-transform duration-300 ${
              isVisible ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="p-4 border-b border-chat-gray-100 flex justify-between items-center bg-chat-bg-secondary">
              <h2 className="text-lg font-semibold text-chat-gray-900">Chats</h2>
              <button
                onClick={handleClose}
                className="p-2 text-chat-gray-500 hover:text-chat-gray-800 hover:bg-chat-gray-100 rounded-full transition"
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            </div>

            <SidebarContent
              users={users}
              selectedUserId={selectedUserId}
              onSelect={(id) => {
                onSelect(id);
                handleClose();
              }}
              onNewChat={() => {
                onNewChat();
                handleClose();
              }}
              isMobile
            />
          </div>

          {/* Backdrop */}
          <div
            className="flex-1 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleClose}
            aria-label="Close sidebar"
          />
        </div>
      )}
    </>
  );
};

export default ChatSidebar;
