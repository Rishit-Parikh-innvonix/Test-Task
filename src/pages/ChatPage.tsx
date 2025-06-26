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
  const wsStore = useWebSocketStore();

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liveConversationId, setLiveConversationId] = useState<number | null>(null);
  const [suppressNextMessageLoad, setSuppressNextMessageLoad] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const localUser = localStorage.getItem(LOCAL_STORAGE_KEY);
        let user = localUser ? JSON.parse(localUser) : await createUser('sahilbbb', 'sahilrathovvvd@gmail.com');
        if (!localUser) localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
        setCurrentUser(user);
        setConversations(await getUserConversations(user.id));
      } catch (err) {
        console.error(err);
        setError('Failed to initialize chat session.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!selectedConversationId || suppressNextMessageLoad) {
      setSuppressNextMessageLoad(false);
      return;
    }
    (async () => {
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
    })();
  }, [selectedConversationId]);

  useEffect(() => {
    if (!currentUser) return;

    const socketUrl = `${import.meta.env.VITE_API_URL}/ws/${currentUser.id}`;
    wsStore.connect(socketUrl);

    const handleMessage = (msg: any) => {
      if (msg.type !== 'chunk') return;

      setIsTyping(false);

      if (msg.conversation_id && !liveConversationId) {
        setLiveConversationId(msg.conversation_id);
        setSelectedConversationId(msg.conversation_id);
        setSuppressNextMessageLoad(true);
        getUserConversations(currentUser.id)
          .then(setConversations)
          .catch(err => console.error('❌ Failed to refresh conversations:', err));
      }

      setMessages(prev => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg?.senderId === 'assistant' && lastMsg.id === 'live') {
          return [...prev.slice(0, -1), { ...lastMsg, text: lastMsg.text + msg.content }];
        }
        return [...prev, { id: 'live', text: msg.content, senderId: 'assistant', timestamp: new Date(), status: 'delivered' }];
      });
    };

    wsStore.onMessage(handleMessage);
    return () => {
      wsStore.disconnect();
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [currentUser, liveConversationId]);

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

  const handleSelect = (id: string) => {
    const idNum = parseInt(id);
    setSelectedConversationId(idNum);
    setLiveConversationId(idNum);
    setIsSidebarOpen(false);
    setSuppressNextMessageLoad(false);
  };

  const handleNewChat = () => {
    setSelectedConversationId(null);
    setLiveConversationId(null);
    setMessages([]);
    setSuppressNextMessageLoad(false);
    setIsSidebarOpen(false);
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-gray-500">Loading chat...</div>;
  if (error) return <div className="h-screen flex items-center justify-center text-red-500">{error}</div>;

  const sidebarProps = {
    users: conversations.map(c => ({ id: c.id.toString(), name: c.title, isOnline: true })),
    selectedUserId: selectedConversationId?.toString() || '',
    onSelect: handleSelect,
    onNewChat: handleNewChat,
  };

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="md:hidden flex justify-between items-center px-4 py-3 border-b bg-white shadow-sm">
        <h1 className="text-lg font-semibold text-chat-gray-900">AI Chat</h1>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-full hover:bg-chat-gray-100 transition">
          <Menu size={20} color="black" />
        </button>
      </div>

      {currentUser?.username && currentUser.email && <Header username={currentUser.username} email={currentUser.email} />}

      <div className="flex md:h-[calc(100%-65px)] h-[calc(100%-125px)]">
        <div className="hidden md:block w-[25%] h-full">
          <ChatSidebar {...sidebarProps} />
        </div>

        <main className="w-full md:w-[75%] bg-gradient-to-br from-blue-50 to-purple-50 p-4 h-full">
          <Chat recipient={{ id: 'assistant', name: 'AI', isOnline: true }} messages={messages} onSendMessage={handleSendMessage} isTyping={isTyping} />
        </main>

        {isSidebarOpen && (
          <ChatSidebar {...sidebarProps} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
