
import React from 'react';
import { User } from '@/features/chat/chat';

interface AvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showOnlineStatus?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

export const Avatar: React.FC<AvatarProps> = ({
  user,
  size = 'md',
  showOnlineStatus = false,
  className = '',
}) => {
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          ${sizeClasses[size]}
          rounded-full
          bg-gradient-to-br from-blue-500 to-purple-600
          flex items-center justify-center
          text-white font-semibold
          shadow-lg
        `}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </div>
      
      {showOnlineStatus && (
        <div
          className={`
            absolute -bottom-0.5 -right-0.5
            w-3 h-3 rounded-full border-2 border-white
            ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}
          `}
        />
      )}
    </div>
  );
};