export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
   conversation_id?: number; // Optional
}

export interface User {
  id: string;
  name: string;
  email?:string
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
  username?:string
}


export interface CurrentUser {
  email:string
  username:string
  id:number
}



export interface ChatProps {
  recipient: User;
  messages: Message[];
  onSendMessage: (text: string) => void;
  isTyping?: boolean;
  className?: string;
}