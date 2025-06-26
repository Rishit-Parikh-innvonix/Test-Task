import { ChatSidebarProps } from '@/types/Sidebar';

const SidebarContent = ({
  users,
  selectedUserId,
  onSelect,
  onNewChat,
  isMobile = false,
  isTablet = false,
}: Omit<ChatSidebarProps, 'isOpen' | 'onClose'> & {
  isMobile?: boolean;
  isTablet?: boolean;
}) => {
  return (
    <>
      {/* New Chat Button */}
      <div
        className={`border-b border-chat-gray-100 flex items-center ${isMobile ? 'px-3' : 'px-4'} h-[10%]`}
      >
        <button
          onClick={onNewChat}
          className={`w-full bg-chat-blue-500 hover:bg-chat-blue-600 active:bg-chat-blue-700 text-white font-medium rounded-chat transition-all duration-200 flex items-center justify-center gap-2 shadow-chat hover:shadow-chat-lg ${
            isMobile ? 'py-2 px-3 text-sm' : 'py-2.5 px-4'
          }`}
        >
          <span className={isMobile ? 'text-base' : 'text-lg'}>+</span>
          New Chat
        </button>
      </div>

      {/* Conversations List */}
      <div className="h-[80%]">
        <div className={`border-b border-chat-gray-50 ${isMobile ? 'px-3 py-2' : 'px-4 py-3'}`}>
          <h3
            className={`font-medium text-chat-gray-500 uppercase tracking-wide ${
              isMobile ? 'text-xs' : 'text-sm'
            }`}
          >
            Recent Conversations
          </h3>
        </div>

        <div
          className={`overflow-y-auto pb-4 ${
            isMobile ? 'px-1 max-h-[calc(100vh-220px)]' : 'px-4 max-h-[calc(100vh-280px)]'
          }`}
          style={{
            scrollbarWidth: 'thin', // Firefox
            scrollbarColor: '#3b82f6 #e5e7eb', // Firefox: thumb color and track color
          }}
        >
          <ul className="space-y-1">
            {users.length === 0 ? (
              <li className={`text-center text-chat-gray-500 ${isMobile ? 'text-sm' : ''}`}>
                No conversations yet
              </li>
            ) : (
              users.map(user => (
                <li key={user.id}>
                  <button
                    onClick={() => onSelect(user.id)}
                    className={`w-full flex items-center gap-3 rounded-message transition-all duration-200 group touch-manipulation ${
                      isMobile ? 'p-2.5' : 'p-3'
                    } ${
                      user.id === selectedUserId
                        ? 'bg-chat-gradient text-white shadow-chat-lg'
                        : 'hover:bg-chat-gray-50 active:bg-chat-gray-100 text-chat-gray-700'
                    }`}
                  >
                    {/* User Avatar */}
                    <div
                      className={`relative flex-shrink-0 rounded-full flex items-center justify-center font-semibold ${
                        isMobile
                          ? 'w-8 h-8 text-xs'
                          : isTablet
                            ? 'w-9 h-9 text-sm'
                            : 'w-10 h-10 text-sm'
                      } ${
                        user.id === selectedUserId
                          ? 'bg-white/20 text-white'
                          : 'bg-chat-blue-500 text-white'
                      }`}
                    >
                      {user.name.charAt(0).toUpperCase()}

                      {/* Online Status Indicator */}
                    </div>

                    {/* User Info */}
                    <div className="min-w-0 text-left">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`font-medium truncate ${isMobile ? 'text-sm' : 'text-sm'} ${
                            user.id === selectedUserId ? 'text-white' : 'text-chat-gray-900'
                          }`}
                        >
                          {user.name}
                        </h4>
                      </div>
                    </div>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      {/* Profile Footer - hide on mobile to save space */}

      <div className={`border-t border-chat-gray-100 h-[10%] flex items-center`}>
        <div
          className={`flex items-center gap-3 rounded-chat hover:bg-chat-gray-50 transition-colors cursor-pointer px-4`}
        >
          <div
            className={`bg-chat-blue-500 rounded-full flex items-center justify-center text-white font-semibold ${
              isTablet ? 'w-7 h-7 text-xs' : 'w-8 h-8 text-sm'
            }`}
          >
            Y
          </div>
          <div className="min-w-0">
            <p
              className={`font-medium text-chat-gray-900 truncate ${
                isTablet ? 'text-xs' : 'text-sm'
              }`}
            >
              Your Profile
            </p>
            <p className={`text-chat-gray-500 ${isTablet ? 'text-xs' : 'text-xs'}`}>
              Settings & Privacy
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarContent;
