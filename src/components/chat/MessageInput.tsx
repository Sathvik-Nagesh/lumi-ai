import React, { useState, useRef } from 'react';
import { Send, Paperclip, Mic, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useConfig } from '@/contexts/ConfigContext';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  className?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  disabled = false,
  className
}) => {
  const { config } = useConfig();
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const toggleRecording = () => {
    if (config.enableVoiceInput) {
      setIsRecording(!isRecording);
      // Voice recording logic would go here
    }
  };

  return (
    <div className={cn("border-t border-border bg-background", className)}>
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          {/* File Upload Button */}
          {config.enableFileUpload && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="mb-1"
              disabled={disabled}
            >
              <Paperclip className="w-4 h-4" />
            </Button>
          )}

          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
              disabled={disabled}
              className={cn(
                "w-full min-h-[44px] max-h-[120px] px-4 py-3 pr-12 border border-input rounded-lg resize-none",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                "bg-background text-foreground placeholder:text-muted-foreground",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              rows={1}
            />
            
            {/* Voice Input Button */}
            {config.enableVoiceInput && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                  "absolute right-2 bottom-2 h-8 w-8",
                  isRecording && "text-red-500 animate-pulse"
                )}
                onClick={toggleRecording}
                disabled={disabled}
              >
                {isRecording ? (
                  <Square className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>

          {/* Send Button */}
          <Button
            type="submit"
            disabled={disabled || !message.trim()}
            className="mb-1 h-11 w-11 p-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>

        {/* Input Footer */}
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>
            {config.appName} can make mistakes. Consider checking important information.
          </span>
          <span>
            {message.length}/2000
          </span>
        </div>
      </div>
    </div>
  );
};
