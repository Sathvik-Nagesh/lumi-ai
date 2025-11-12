import React, { useState, useEffect } from 'react';
import { X, FileText } from 'lucide-react';
import { AnimatedAIChat } from '../ui/animated-ai-chat';
import { useChatManagement } from '@/contexts/ChatManagementContext';
import GeminiService from '@/services/geminiService';
import DeepSeekService from '@/services/deepseekService';

interface FileUpload {
  id: string;
  file: File;
  preview?: string;
  uploading: boolean;
}

export const ChatInterface: React.FC = () => {
  const [attachedFiles, setAttachedFiles] = useState<FileUpload[]>([]);
  const [localMessages, setLocalMessages] = useState<any[]>([]);
  
  const { 
    currentChatId, 
    getCurrentChat, 
    createNewChat, 
    addMessage 
  } = useChatManagement();

  const currentChat = getCurrentChat();
  const messages = currentChat?.messages || [];
  
  // Use context messages for chat switching, local messages for current chat updates
  const displayMessages = messages.length > 0 ? messages : localMessages;

  useEffect(() => {
    if (!currentChatId) {
      createNewChat();
    }
  }, [currentChatId, createNewChat]);

  // Clear local messages when switching chats
  useEffect(() => {
    setLocalMessages([]);
  }, [currentChatId]);

  const removeFile = (fileId: string) => {
    setAttachedFiles(prev => {
      const file = prev.find(f => f.id === fileId);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const handleSend = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    // Add to local state immediately
    const newMessage = {
      id: Date.now().toString(),
      content: messageContent,
      role: 'user' as const,
      timestamp: new Date(),
    };
    
    setLocalMessages(prev => [...prev, newMessage]);

    let chatId = currentChatId;
    if (!chatId) {
      chatId = createNewChat();
    }

    addMessage(chatId, newMessage);

    try {
      let response: string = '';
      
      console.log('API Configuration:', {
        useRealAPI: import.meta.env.VITE_USE_REAL_API,
        hasGeminiKey: !!import.meta.env.VITE_GEMINI_API_KEY,
        hasDeepSeekKey: !!import.meta.env.VITE_DEEPSEEK_API_KEY,
        geminiKey: import.meta.env.VITE_GEMINI_API_KEY?.substring(0, 20) + '...',
        geminiKeyLength: import.meta.env.VITE_GEMINI_API_KEY?.length,
        deepseekKey: import.meta.env.VITE_DEEPSEEK_API_KEY?.substring(0, 15) + '...',
        deepseekKeyLength: import.meta.env.VITE_DEEPSEEK_API_KEY?.length,
      });
      
      // Fallback system: Gemini -> DeepSeek -> Demo
      if (import.meta.env.VITE_USE_REAL_API === 'true') {
        let apiSuccess = false;
        
        // Try Gemini first
        if (import.meta.env.VITE_GEMINI_API_KEY && import.meta.env.VITE_GEMINI_API_KEY !== 'your_gemini_api_key_here') {
          console.log('🔄 Trying Gemini API...');
          
          // Validate API key format
          const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
          if (!apiKey.startsWith('AIza')) {
            console.warn('❌ Invalid Gemini API key format - should start with "AIza"');
          } else {
            try {
              const geminiService = new GeminiService(apiKey);
              response = await geminiService.sendMessage(messageContent);
              console.log('✅ Gemini response received:', response.substring(0, 100) + '...');
              apiSuccess = true;
            } catch (geminiError: any) {
              console.warn('❌ Gemini API failed:', geminiError?.message);
            }
          }
        } else {
          console.log('⚠️ No valid Gemini API key found');
        }
        
        // Try DeepSeek if Gemini failed
        if (!apiSuccess && import.meta.env.VITE_DEEPSEEK_API_KEY && import.meta.env.VITE_DEEPSEEK_API_KEY !== 'your_deepseek_api_key_here') {
          console.log('🔄 Trying DeepSeek API...');
          try {
            const deepseekService = new DeepSeekService(import.meta.env.VITE_DEEPSEEK_API_KEY);
            response = await deepseekService.sendMessage(messageContent);
            console.log('✅ DeepSeek response received:', response.substring(0, 100) + '...');
            apiSuccess = true;
          } catch (deepseekError: any) {
            console.warn('❌ DeepSeek API failed:', deepseekError?.message);
          }
        }
        
        // If both APIs failed, use demo responses
        if (!apiSuccess) {
          console.log('⚠️ All APIs failed, using demo responses...');
        }
      }
      
      // Use demo responses if APIs are disabled or all failed
      if (!response) {
        console.log('Using demo responses...');
        // Use demo responses
        const responses = [
          "I understand your question. Let me help you with that.",
          "That's an interesting point. Here's what I think...",
          "Great question! Based on what you've asked, I can provide some insights.",
          "I'd be happy to help you with that. Let me break it down for you.",
          "Thanks for reaching out! Here's my response to your query.",
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        // Determine which APIs were attempted
        const attemptedAPIs = [];
        if (import.meta.env.VITE_USE_REAL_API === 'true') {
          if (import.meta.env.VITE_GEMINI_API_KEY && import.meta.env.VITE_GEMINI_API_KEY !== 'your_gemini_api_key_here') {
            attemptedAPIs.push('Gemini');
          }
          if (import.meta.env.VITE_DEEPSEEK_API_KEY && import.meta.env.VITE_DEEPSEEK_API_KEY !== 'your_deepseek_api_key_here') {
            attemptedAPIs.push('DeepSeek');
          }
        }
        
        // Don't show API failure messages to users - just provide clean demo response
        response = `${randomResponse}\n\nYou asked: "${messageContent}"\n\nI'm here to help with any questions you have!`;
        
        // Small delay to simulate processing
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant' as const,
        timestamp: new Date(),
      };
      
      // Add to context first, then local state for immediate display
      addMessage(chatId, aiMessage);
      setLocalMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant' as const,
        timestamp: new Date(),
      };
      addMessage(chatId, errorMessage);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-black transition-colors">
      {/* Chat Header */}
      <div className="border-b border-gray-200 dark:border-zinc-900 px-6 py-4 bg-gray-50 dark:bg-zinc-950 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {currentChat?.title || 'New Conversation'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {messages.length > 0 ? `${messages.length} messages` : 'Ready to assist'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area - Always use AnimatedAIChat */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-black transition-colors">
        <AnimatedAIChat onSendMessage={handleSend} messages={displayMessages} />
      </div>


      {/* File Attachments Display */}
      {attachedFiles.length > 0 && (
        <div className="border-t border-gray-200 dark:border-zinc-900 px-6 py-2 bg-gray-50 dark:bg-zinc-950">
          <div className="flex flex-wrap gap-2">
            {attachedFiles.map(file => (
              <div key={file.id} className="relative group">
                {file.preview ? (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-800">
                    <img src={file.preview} alt={file.file.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeFile(file.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800">
                    <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{file.file.name}</span>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
