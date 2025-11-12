import React, { createContext, useContext, useState, useEffect } from 'react';

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  isPinned: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  attachments?: FileAttachment[];
}

interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface ChatManagementContextType {
  chats: Chat[];
  currentChatId: string | null;
  pinnedChats: Chat[];
  archivedChats: Chat[];
  createNewChat: () => string;
  deleteChat: (chatId: string) => void;
  deleteAllChats: () => void;
  pinChat: (chatId: string) => void;
  unpinChat: (chatId: string) => void;
  archiveChat: (chatId: string) => void;
  unarchiveChat: (chatId: string) => void;
  setCurrentChat: (chatId: string) => void;
  getCurrentChat: () => Chat | null;
  addMessage: (chatId: string, message: Message) => void;
  searchChats: (query: string) => Chat[];
  exportChat: (chatId: string) => void;
  exportAllChats: () => void;
}

const ChatManagementContext = createContext<ChatManagementContextType | undefined>(undefined);

export const ChatManagementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  // Load chats from localStorage on mount
  useEffect(() => {
    const savedChats = localStorage.getItem('lumi-chats');
    if (savedChats) {
      try {
        const parsedChats = JSON.parse(savedChats);
        setChats(parsedChats.map((chat: any) => ({
          ...chat,
          createdAt: new Date(chat.createdAt),
          updatedAt: new Date(chat.updatedAt),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        })));
      } catch (error) {
        console.error('Failed to load chats:', error);
      }
    }
  }, []);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('lumi-chats', JSON.stringify(chats));
    }
  }, [chats]);

  const createNewChat = (): string => {
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      title: 'New Conversation',
      messages: [],
      isPinned: false,
      isArchived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    return newChat.id;
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  const deleteAllChats = () => {
    setChats([]);
    setCurrentChatId(null);
  };

  const pinChat = (chatId: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, isPinned: true } : chat
    ));
  };

  const unpinChat = (chatId: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, isPinned: false } : chat
    ));
  };

  const archiveChat = (chatId: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, isArchived: true } : chat
    ));
  };

  const unarchiveChat = (chatId: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, isArchived: false } : chat
    ));
  };

  const setCurrentChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const getCurrentChat = (): Chat | null => {
    return chats.find(chat => chat.id === currentChatId) || null;
  };

  const addMessage = (chatId: string, message: Message) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        const updatedChat = {
          ...chat,
          messages: [...chat.messages, message],
          updatedAt: new Date(),
        };
        // Update title based on first user message
        if (chat.messages.length === 0 && message.role === 'user') {
          updatedChat.title = message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '');
        }
        return updatedChat;
      }
      return chat;
    }));
  };

  const searchChats = (query: string): Chat[] => {
    if (!query) return chats.filter(chat => !chat.isArchived);
    
    const lowerQuery = query.toLowerCase();
    return chats.filter(chat => 
      !chat.isArchived && (
        chat.title.toLowerCase().includes(lowerQuery) ||
        chat.messages.some(msg => msg.content.toLowerCase().includes(lowerQuery))
      )
    );
  };

  const exportChat = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (!chat) return;

    const exportData = {
      title: chat.title,
      exportDate: new Date().toISOString(),
      messages: chat.messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chat.title.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
  };

  const exportAllChats = () => {
    if (chats.length === 0) {
      return;
    }

    const exportData = {
      exportDate: new Date().toISOString(),
      totalChats: chats.length,
      chats: chats.map(chat => ({
        id: chat.id,
        title: chat.title,
        isPinned: chat.isPinned,
        isArchived: chat.isArchived,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
        messages: chat.messages.map(msg => ({
          id: msg.id,
          content: msg.content,
          role: msg.role,
          timestamp: msg.timestamp,
        })),
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lumi_ai_all_chats_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
  };

  const pinnedChats = chats.filter(chat => chat.isPinned && !chat.isArchived);
  const archivedChats = chats.filter(chat => chat.isArchived);

  return (
    <ChatManagementContext.Provider value={{
      chats: chats.filter(chat => !chat.isArchived),
      currentChatId,
      pinnedChats,
      archivedChats,
      createNewChat,
      deleteChat,
      deleteAllChats,
      pinChat,
      unpinChat,
      archiveChat,
      unarchiveChat,
      setCurrentChat,
      getCurrentChat,
      addMessage,
      searchChats,
      exportChat,
      exportAllChats,
    }}>
      {children}
    </ChatManagementContext.Provider>
  );
};

export const useChatManagement = () => {
  const context = useContext(ChatManagementContext);
  if (!context) {
    throw new Error('useChatManagement must be used within ChatManagementProvider');
  }
  return context;
};
