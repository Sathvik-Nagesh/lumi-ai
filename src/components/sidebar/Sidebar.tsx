import React, { useState, useEffect } from 'react';
import { 
  Search, Pin, Settings, Plus, MessageSquare, 
  ChevronLeft, ChevronRight, Trash2, Download,
  Star, Archive, MoreVertical, Moon, Sun, FolderOpen
} from 'lucide-react';
import { Button } from '../ui/button';
import { SettingsModal } from '../ui/settings-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useChatManagement } from '@/contexts/ChatManagementContext';

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showArchived, setShowArchived] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const {
    chats,
    currentChatId,
    pinnedChats,
    archivedChats,
    createNewChat,
    deleteChat,
    pinChat,
    unpinChat,
    archiveChat,
    unarchiveChat,
    setCurrentChat,
    searchChats,
    exportChat,
  } = useChatManagement();

  useEffect(() => {
    const savedTheme = localStorage.getItem(import.meta.env.VITE_THEME_STORAGE_KEY || 'lumi-theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme;
    } else {
      setTheme('dark');
      document.documentElement.className = 'dark';
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem(import.meta.env.VITE_THEME_STORAGE_KEY || 'lumi-theme', newTheme);
  };

  const handleNewChat = () => {
    createNewChat();
  };

  const handleDeleteChat = (chatId: string) => {
    if (window.confirm('Are you sure you want to delete this chat?')) {
      deleteChat(chatId);
    }
  };

  const handlePinToggle = (chatId: string, isPinned: boolean) => {
    if (isPinned) {
      unpinChat(chatId);
    } else {
      pinChat(chatId);
    }
  };

  const handleArchiveToggle = (chatId: string, isArchived: boolean) => {
    if (isArchived) {
      unarchiveChat(chatId);
    } else {
      archiveChat(chatId);
    }
  };

  const displayChats = showArchived ? archivedChats : searchQuery ? searchChats(searchQuery) : chats;
  const filteredPinnedChats = pinnedChats.filter(chat => 
    !searchQuery || chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarWidth = isCollapsed 
    ? import.meta.env.VITE_SIDEBAR_COLLAPSED_WIDTH || '60'
    : import.meta.env.VITE_SIDEBAR_WIDTH || '280';

  return (
    <motion.div
      initial={false}
      animate={{ width: `${sidebarWidth}px` }}
      className="h-full bg-gray-50 dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-900 flex flex-col relative transition-colors"
    >
      {/* Logo and Brand */}
      <div className="p-4 border-b border-gray-200 dark:border-zinc-900">
        <div className="flex items-center justify-between">
          <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold shadow-lg"
            >
              {import.meta.env.VITE_APP_LOGO_TEXT || 'L'}
            </motion.div>
            {!isCollapsed && (
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {import.meta.env.VITE_APP_NAME}
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-500">
                  {import.meta.env.VITE_APP_TAGLINE}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 z-10 h-6 w-6 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronLeft className="h-3 w-3 text-gray-600 dark:text-gray-400" />
        )}
      </Button>

      {/* New Chat Button */}
      <div className="p-3">
        <Button 
          onClick={handleNewChat}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          {!isCollapsed && "New Chat"}
        </Button>
      </div>

      {/* Search Bar */}
      {!isCollapsed && import.meta.env.VITE_ENABLE_SEARCH === 'true' && (
        <div className="px-3 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Archive Toggle */}
      {!isCollapsed && (
        <div className="px-3 pb-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-gray-600 dark:text-gray-400"
            onClick={() => setShowArchived(!showArchived)}
          >
            <FolderOpen className="w-4 h-4 mr-2" />
            {showArchived ? 'Show Active Chats' : 'Show Archived'}
          </Button>
        </div>
      )}

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {/* Pinned Chats */}
        {!showArchived && filteredPinnedChats.length > 0 && (
          <div className="mb-4">
            {!isCollapsed && (
              <div className="px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-500 uppercase tracking-wider">
                Pinned
              </div>
            )}
            {filteredPinnedChats.map(chat => (
              <ChatHistoryItem
                key={chat.id}
                chat={chat}
                isActive={currentChatId === chat.id}
                isCollapsed={isCollapsed}
                onSelect={() => setCurrentChat(chat.id)}
                onPin={() => handlePinToggle(chat.id, chat.isPinned)}
                onArchive={() => handleArchiveToggle(chat.id, chat.isArchived)}
                onDelete={() => handleDeleteChat(chat.id)}
                onExport={() => exportChat(chat.id)}
              />
            ))}
          </div>
        )}

        {/* Regular/Archived Chats */}
        <div>
          {!isCollapsed && (
            <div className="px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-500 uppercase tracking-wider">
              {showArchived ? 'Archived' : 'Recent'}
            </div>
          )}
          {displayChats
            .filter(chat => !chat.isPinned || showArchived)
            .map(chat => (
              <ChatHistoryItem
                key={chat.id}
                chat={chat}
                isActive={currentChatId === chat.id}
                isCollapsed={isCollapsed}
                onSelect={() => setCurrentChat(chat.id)}
                onPin={() => handlePinToggle(chat.id, chat.isPinned)}
                onArchive={() => handleArchiveToggle(chat.id, chat.isArchived)}
                onDelete={() => handleDeleteChat(chat.id)}
                onExport={() => exportChat(chat.id)}
              />
            ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-gray-200 dark:border-zinc-900 space-y-2">
        {import.meta.env.VITE_ENABLE_SETTINGS === 'true' && (
          <Button 
            variant="ghost" 
            onClick={() => setShowSettings(true)}
            className="w-full justify-start text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <Settings className="w-4 h-4 mr-2" />
            {!isCollapsed && "Settings"}
          </Button>
        )}
        
        {import.meta.env.VITE_ENABLE_THEME_TOGGLE === 'true' && (
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
            onClick={toggleTheme}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 mr-2" />
            ) : (
              <Sun className="w-4 h-4 mr-2" />
            )}
            {!isCollapsed && (theme === 'light' ? 'Dark Mode' : 'Light Mode')}
          </Button>
        )}
      </div>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </motion.div>
  );
};

interface ChatHistoryItemProps {
  chat: any;
  isActive: boolean;
  isCollapsed: boolean;
  onSelect: () => void;
  onPin: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onExport: () => void;
}

const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({ 
  chat, 
  isActive, 
  isCollapsed, 
  onSelect, 
  onPin, 
  onArchive,
  onDelete,
  onExport,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative group mb-1">
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start",
          isActive 
            ? "bg-purple-100 dark:bg-purple-900/20 text-purple-900 dark:text-purple-300" 
            : "text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
        )}
        onClick={onSelect}
      >
        {chat.isPinned ? (
          <Star className="w-4 h-4 mr-2 flex-shrink-0 text-yellow-500 fill-yellow-500" />
        ) : chat.isArchived ? (
          <Archive className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
        ) : (
          <MessageSquare className="w-4 h-4 mr-2 flex-shrink-0" />
        )}
        {!isCollapsed && (
          <>
            <span className="flex-1 text-left truncate text-sm">{chat.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded transition-opacity"
            >
              <MoreVertical className="w-3 h-3" />
            </button>
          </>
        )}
      </Button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {showMenu && !isCollapsed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute right-2 top-8 z-20 w-40 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-xl py-1 overflow-hidden"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPin();
                setShowMenu(false);
              }}
              className="w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center gap-2 transition-colors"
            >
              <Pin className="w-3 h-3" />
              {chat.isPinned ? "Unpin" : "Pin"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onArchive();
                setShowMenu(false);
              }}
              className="w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center gap-2 transition-colors"
            >
              <Archive className="w-3 h-3" />
              {chat.isArchived ? "Unarchive" : "Archive"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onExport();
                setShowMenu(false);
              }}
              className="w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center gap-2 transition-colors"
            >
              <Download className="w-3 h-3" />
              Export
            </button>
            <div className="border-t border-gray-200 dark:border-zinc-800 my-1"></div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
                setShowMenu(false);
              }}
              className="w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
