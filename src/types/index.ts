export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  isPinned?: boolean;
}

export interface Config {
  appName: string;
  appTagline: string;
  welcomeMessage: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundLight: string;
  backgroundDark: string;
  textLight: string;
  textDark: string;
  fontFamily: string;
  fontSizeBase: number;
  fontSizeHeading: number;
  sidebarWidth: number;
  sidebarPosition: 'left' | 'right';
  chatMaxWidth: number;
  messageAnimation: boolean;
  enableVoiceInput: boolean;
  enableFileUpload: boolean;
  enableMarkdown: boolean;
  enableCodeHighlighting: boolean;
  enableChatExport: boolean;
  borderRadius: number;
  buttonStyle: 'rounded' | 'square';
  themeDefault: 'light' | 'dark';
  primaryApi: 'gemini' | 'deepseek';
}

export interface ApiService {
  sendMessage(message: string): Promise<string>;
}
