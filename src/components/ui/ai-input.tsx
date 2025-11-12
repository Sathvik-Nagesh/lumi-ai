import React, { useState } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface AiInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const AiInput: React.FC<AiInputProps> = ({
  onSend,
  placeholder = "Type your message...",
  disabled = false,
  className
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex items-end gap-2 p-4", className)}>
      <div className="flex-1 relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full min-h-[44px] max-h-32 px-4 py-3 pr-12 border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground"
          rows={1}
        />
        <div className="absolute right-2 bottom-2 flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            disabled={disabled}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            disabled={disabled}
          >
            <Mic className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Button
        type="submit"
        disabled={disabled || !message.trim()}
        className="h-11 w-11 p-0"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

// Enhanced MorphPanel component for floating input
interface MorphPanelProps {
  onSend?: (message: string) => void;
  onSendMessage?: (message: string) => void;
  isVisible?: boolean;
}

export const MorphPanel: React.FC<MorphPanelProps> = ({ 
  onSend = () => {}, 
  onSendMessage,
  isVisible = true 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isExpanded ? (
        <div className="bg-card border border-border rounded-lg shadow-lg p-2 w-80">
          <AiInput
            onSend={(message) => {
              if (onSendMessage) {
                onSendMessage(message);
              } else {
                onSend(message);
              }
              setIsExpanded(false);
            }}
            placeholder="Ask me anything..."
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(false)}
            className="mt-2 w-full"
          >
            Close
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => setIsExpanded(true)}
          className="h-12 w-12 rounded-full shadow-lg"
        >
          <Send className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};
