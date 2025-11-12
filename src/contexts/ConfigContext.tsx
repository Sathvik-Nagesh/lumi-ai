import React, { createContext, useContext, useMemo } from 'react';
import { Config } from '@/types';

const ConfigContext = createContext<{ config: Config }>({ config: {} as Config });

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const config = useMemo(() => ({
    appName: import.meta.env.VITE_APP_NAME || 'Lumi AI',
    appTagline: import.meta.env.VITE_APP_TAGLINE || 'Your Intelligent Assistant',
    welcomeMessage: import.meta.env.VITE_WELCOME_MESSAGE || 'Hello! I\'m Lumi, your AI assistant. How can I help you today?',
    primaryColor: import.meta.env.VITE_PRIMARY_COLOR || '#8B5CF6',
    secondaryColor: import.meta.env.VITE_SECONDARY_COLOR || '#EC4899',
    accentColor: import.meta.env.VITE_ACCENT_COLOR || '#10B981',
    backgroundLight: import.meta.env.VITE_BACKGROUND_LIGHT || '#FFFFFF',
    backgroundDark: import.meta.env.VITE_BACKGROUND_DARK || '#0F172A',
    textLight: import.meta.env.VITE_TEXT_LIGHT || '#1E293B',
    textDark: import.meta.env.VITE_TEXT_DARK || '#F1F5F9',
    fontFamily: import.meta.env.VITE_FONT_FAMILY || 'Inter, system-ui, sans-serif',
    fontSizeBase: parseInt(import.meta.env.VITE_FONT_SIZE_BASE) || 16,
    fontSizeHeading: parseInt(import.meta.env.VITE_FONT_SIZE_HEADING) || 24,
    sidebarWidth: parseInt(import.meta.env.VITE_SIDEBAR_WIDTH) || 280,
    sidebarPosition: (import.meta.env.VITE_SIDEBAR_POSITION as 'left' | 'right') || 'left',
    chatMaxWidth: parseInt(import.meta.env.VITE_CHAT_MAX_WIDTH) || 800,
    messageAnimation: import.meta.env.VITE_MESSAGE_ANIMATION === 'true',
    enableVoiceInput: import.meta.env.VITE_ENABLE_VOICE_INPUT === 'true',
    enableFileUpload: import.meta.env.VITE_ENABLE_FILE_UPLOAD === 'true',
    enableMarkdown: import.meta.env.VITE_ENABLE_MARKDOWN === 'true',
    enableCodeHighlighting: import.meta.env.VITE_ENABLE_CODE_HIGHLIGHTING === 'true',
    enableChatExport: import.meta.env.VITE_ENABLE_CHAT_EXPORT === 'true',
    borderRadius: parseInt(import.meta.env.VITE_BORDER_RADIUS) || 8,
    buttonStyle: (import.meta.env.VITE_BUTTON_STYLE as 'rounded' | 'square') || 'rounded',
    themeDefault: (import.meta.env.VITE_THEME_DEFAULT as 'light' | 'dark') || 'light',
    primaryApi: (import.meta.env.VITE_PRIMARY_API as 'gemini' | 'deepseek') || 'gemini',
  }), []);

  return (
    <ConfigContext.Provider value={{ config }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
