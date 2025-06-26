import React, { useState } from 'react';
import { Bell, Settings, LogOut, User, ChevronDown, MessageCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  username: string;
  email: string;
  onSearch?: (query: string) => void;
  onSettings?: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, email, onSearch, onSettings }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  const { logout } = useAuth();
  return (
    <header className="w-full bg-chat-bg-secondary border-b border-chat-gray-100 shadow-chat sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-chat-gradient rounded-lg flex items-center justify-center">
              <MessageCircle size={18} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm md:text-lg font-semibold text-chat-gray-900 ">AI Chat</h1>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Toggle */}

          {/* Notifications */}
          <button className="relative p-2 text-chat-gray-600 hover:text-chat-gray-900 hover:bg-chat-gray-50 rounded-lg transition-colors">
            <Bell size={18} />
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1.5 text-chat-gray-700 hover:bg-chat-gray-50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-chat-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {getInitials(username)}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-chat-gray-900 truncate max-w-32">
                  {username}
                </p>
                <p className="text-xs text-chat-gray-500 truncate max-w-32">{email}</p>
              </div>
              <ChevronDown
                size={16}
                className={`hidden sm:block text-chat-gray-400 transition-transform ${
                  isProfileOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-chat-bg-secondary border border-chat-gray-200 rounded-chat shadow-chat-lg py-2 z-50">
                <div className="px-4 py-3 border-b border-chat-gray-100">
                  <p className="text-sm font-medium text-chat-gray-900">{username}</p>
                  <p className="text-xs text-chat-gray-500">{email}</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      onSettings?.();
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-chat-gray-700 hover:bg-chat-gray-50 transition-colors"
                  >
                    <Settings size={16} />
                    Settings
                  </button>

                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-chat-gray-700 hover:bg-chat-gray-50 transition-colors">
                    <User size={16} />
                    Profile
                  </button>

                  <hr className="my-1 border-chat-gray-100" />

                  <button
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-chat-red-600 hover:bg-chat-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-30" onClick={() => setIsProfileOpen(false)} />
      )}
    </header>
  );
};

export default Header;
