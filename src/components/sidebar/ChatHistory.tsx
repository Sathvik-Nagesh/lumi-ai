import React from 'react';
import { MessageSquare, Pin, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChat } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';

interface ChatHistoryProps {
  searchQuery: string;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ searchQuery }) => {
  const { sessions, currentSession, switchSession, deleteSession, pinSession } = useChat();

  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedSessions = filteredSessions.filter(session => session.isPinned);
  const regularSessions = filteredSessions.filter(session => !session.isPinned);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  const ChatItem = ({ session }: { session: any }) => (
    <div
      className={cn(
        "group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors",
        "hover:bg-accent",
        currentSession?.id === session.id && "bg-accent"
      )}
      onClick={() => switchSession(session.id)}
    >
      <MessageSquare className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate text-foreground">
          {session.title}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatDate(session.updatedAt)}
        </p>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={(e) => {
            e.stopPropagation();
            pinSession(session.id);
          }}
        >
          <Pin className={cn(
            "w-3 h-3",
            session.isPinned && "fill-current text-primary"
          )} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-destructive hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            deleteSession(session.id);
          }}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Pinned Chats */}
      {pinnedSessions.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
            Pinned
          </h3>
          <div className="space-y-1">
            {pinnedSessions.map((session) => (
              <ChatItem key={session.id} session={session} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Chats */}
      {regularSessions.length > 0 && (
        <div>
          {pinnedSessions.length > 0 && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
              Recent
            </h3>
          )}
          <div className="space-y-1">
            {regularSessions.map((session) => (
              <ChatItem key={session.id} session={session} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredSessions.length === 0 && (
        <div className="text-center py-8">
          <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            {searchQuery ? 'No chats found' : 'No chat history yet'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {searchQuery ? 'Try a different search term' : 'Start a conversation to see it here'}
          </p>
        </div>
      )}
    </div>
  );
};
