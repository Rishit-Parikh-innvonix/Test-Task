import { User } from "@/features/chat/chat";

export interface ChatSidebarProps {
  users: User[];
  selectedUserId: string;
  onSelect: (userId: string) => void;
  onNewChat: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}