import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Chat } from '@/components/Chat';
import ChatSidebar from '@/components/ChatSidebar';
import { CurrentUser, Message } from '@/features/chat/chat';
import { Menu } from 'lucide-react';
import { useWebSocketStore } from '@/features/chat/store';
import { createUser, getUserConversations } from '@/api/user';
import { getMessagesByConversationId } from '@/api/conversations';
import Header from '@/components/Header';
import dayjs from 'dayjs';

const LOCAL_STORAGE_KEY = 'chat_user';

const ChatPage: React.FC = () => {
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liveConversationId, setLiveConversationId] = useState<number | null>(null);
  const [liveMsgId, setLiveMsgId] = useState<string | null>(null);
  const wsStore = useWebSocketStore();

  // 🚀 Load or create the user on first render
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const localUser = localStorage.getItem(LOCAL_STORAGE_KEY);
        let user = localUser
          ? JSON.parse(localUser)
          : await createUser('sahilbbb', 'sahilrathovvvd@gmail.com');
        if (!localUser) localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));

        setCurrentUser(user);
        const userConvos = await getUserConversations(user.id);
        setConversations(userConvos);
      } catch (err) {
        console.error(err);
        setError('Failed to initialize chat session.');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // 💬 Load messages when user selects a conversation
  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedConversationId) return;
      try {
        const data = await getMessagesByConversationId(selectedConversationId);
        setMessages(
          data.map((m: any) => ({
            id: m.id.toString(),
            text: m.content,
            senderId: m.role,
            timestamp: dayjs.utc(m.created_at).local().toDate(),
            status: 'delivered',
          }))
        );
      } catch (err) {
        console.error('Failed to load messages', err);
        setMessages([]);
      }
    };

    loadMessages();
  }, [selectedConversationId]);

  // 🔌 Connect WebSocket and handle incoming messages
  useEffect(() => {
    if (!currentUser) return;

    const socketUrl = `${import.meta.env.VITE_API_URL}/ws/${currentUser.id}`;
    wsStore.connect(socketUrl);

    wsStore.onMessage((msg: any) => {
      if (msg.type === 'chunk') {
        setIsTyping(false);

        if (msg.conversation_id && !liveConversationId) {
          setLiveConversationId(msg.conversation_id); // ✅ capture only once after first reply
          setSelectedConversationId(msg.conversation_id);

          getUserConversations(currentUser.id)
            .then(setConversations)
            .catch(err =>
              console.error('❌ Failed to refresh conversations after assistant reply:', err)
            );
        }

        setMessages(prev => {
          const last = [...prev];
          const lastMsg = last[last.length - 1];

          if (lastMsg && lastMsg.senderId === 'assistant' && lastMsg.id === 'live') {
            return [
              ...last.slice(0, -1),
              {
                ...lastMsg,
                text: lastMsg.text + msg.content,
                status: 'delivered',
              },
            ];
          }
          const newLiveId = `live-${Date.now()}`;
          setLiveMsgId(newLiveId);
          return [
            ...prev,
            {
              id: 'live',
              text: msg.content,
              senderId: 'assistant',
              timestamp: new Date(),
              status: 'delivered',
            },
          ];
        });
      }
    });

    return () => {
      wsStore.disconnect();
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [currentUser]);

  // 📨 Handle sending user message
  const handleSendMessage = useCallback(
    (text: string) => {
      if (!currentUser) return;
      setIsTyping(true);

      const message: Message = {
        id: Date.now().toString(),
        text,
        senderId: 'user',
        timestamp: new Date(),
        status: 'sent',
      };

      setMessages(prev => [...prev, message]);
      wsStore.sendMessage(message, liveConversationId ?? undefined);
    },
    [currentUser, liveConversationId]
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">Loading chat...</div>
    );
  }

  if (error) {
    return <div className="h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="h-full w-full overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 border-b bg-white shadow-sm">
        <h1 className="text-lg font-semibold text-chat-gray-900">AI Chat</h1>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-full hover:bg-chat-gray-100 transition"
        >
          <Menu size={20} color="black" />
        </button>
      </div>

      {currentUser?.username && currentUser.email && (
        <Header username={currentUser.username} email={currentUser.email} />
      )}

      {/* Chat Layout */}
      <div className="flex md:h-[calc(100%-65px)] h-[calc(100%-125px)]">
        {/* Sidebar */}
        <div className="hidden md:block w-[25%] h-full">
          <ChatSidebar
            users={conversations.map(c => ({
              id: c.id.toString(),
              name: c.title,
              isOnline: true,
            }))}
            selectedUserId={selectedConversationId?.toString() || ''}
            onSelect={id => {
              const idNum = parseInt(id);
              setSelectedConversationId(idNum);
              setLiveConversationId(idNum);
              setIsSidebarOpen(false);
            }}
            onNewChat={() => {
              setSelectedConversationId(null);
              setLiveConversationId(null);
              setMessages([]);
              setIsSidebarOpen(false);
            }}
          />
        </div>

        {/* Chat Panel */}
        <main className="w-full md:w-[75%] bg-gradient-to-br from-blue-50 to-purple-50 p-4 h-full">
          <Chat
            recipient={{ id: 'assistant', name: 'AI', isOnline: true }}
            messages={messages}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
          />
        </main>

        {/* Mobile Sidebar Drawer */}
        {isSidebarOpen && (
          <ChatSidebar
            users={conversations.map(c => ({
              id: c.id.toString(),
              name: c.title,
              isOnline: true,
            }))}
            selectedUserId={selectedConversationId?.toString() || ''}
            onSelect={id => {
              const idNum = parseInt(id);
              setSelectedConversationId(idNum);
              setLiveConversationId(idNum);
              setIsSidebarOpen(false);
            }}
            onNewChat={() => {
              setSelectedConversationId(null);
              setLiveConversationId(null);
              setMessages([]);
              setIsSidebarOpen(false);
            }}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
