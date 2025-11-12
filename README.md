# Lumi AI - Dynamic Chat Interface

A modern, fully customizable AI chat interface built with React, TypeScript, and Tailwind CSS. Inspired by ChatGPT, Gemini, and Claude with unique design elements and comprehensive theming support.

## ✨ Features

- **🎨 Dynamic Theming**: Complete customization via environment variables
- **🤖 Multi-API Support**: Gemini API (primary) with DeepSeek fallback
- **💬 Rich Chat Interface**: Modern UI with message history and search
- **📱 Responsive Design**: Mobile-friendly with collapsible sidebar
- **🌙 Dark/Light Mode**: System-aware theme switching
- **📌 Chat Management**: Pin, search, and organize conversations
- **⚡ Real-time Loading**: Beautiful animated loading states
- **🎯 Accessibility**: Full keyboard navigation and screen reader support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
cd lumi-ai
npm install
```

2. **Configure environment variables:**
```bash
cp .env.example .env
```

3. **Add your API keys to `.env`:**
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

4. **Start development server:**
```bash
npm run dev
```

## 🎛️ Configuration

All aspects of the application can be customized via environment variables:

### API Configuration
```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_DEEPSEEK_API_KEY=your_deepseek_api_key
VITE_PRIMARY_API=gemini
```

### Branding
```env
VITE_APP_NAME=Lumi AI
VITE_APP_TAGLINE=Your Intelligent Assistant
VITE_WELCOME_MESSAGE=Hello! I'm Lumi, your AI assistant.
```

### Theme Colors
```env
VITE_PRIMARY_COLOR=#8B5CF6
VITE_SECONDARY_COLOR=#EC4899
VITE_ACCENT_COLOR=#10B981
```

### Layout & Features
```env
VITE_SIDEBAR_WIDTH=280
VITE_SIDEBAR_POSITION=left
VITE_ENABLE_VOICE_INPUT=false
VITE_ENABLE_FILE_UPLOAD=false
VITE_ENABLE_MARKDOWN=true
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── button.tsx
│   │   ├── dot-loader.tsx  # Animated loading component
│   │   └── ai-input.tsx    # Enhanced input with floating panel
│   ├── chat/               # Chat interface components
│   │   ├── ChatInterface.tsx
│   │   ├── MessageList.tsx
│   │   ├── MessageInput.tsx
│   │   └── WelcomeMessage.tsx
│   ├── sidebar/            # Sidebar components
│   │   ├── Sidebar.tsx
│   │   └── ChatHistory.tsx
│   └── layout/             # Layout components
│       └── ThemeToggle.tsx
├── contexts/               # React Context providers
│   ├── ThemeContext.tsx
│   ├── ChatContext.tsx
│   └── ConfigContext.tsx
├── services/               # API services
│   ├── geminiService.ts
│   └── deepseekService.ts
├── types/                  # TypeScript type definitions
│   └── index.ts
└── lib/                    # Utility functions
    └── utils.ts
```

## 🎨 Customization

### Theme Customization
The app supports complete theme customization through CSS variables and environment variables. Colors, fonts, spacing, and layout can all be modified.

### Component Customization
All components are built with shadcn/ui and can be easily customized or replaced while maintaining the same interface.

### API Integration
The modular API service architecture allows easy integration of additional AI providers.

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Tech Stack
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Context API
- **Build Tool**: Vite
- **API Integration**: Gemini API, DeepSeek API
- **Icons**: Lucide React

## 📦 Dependencies

### Core Dependencies
- `react` & `react-dom` - React framework
- `@google/generative-ai` - Gemini API integration
- `axios` - HTTP client for API calls
- `lucide-react` - Icon library
- `framer-motion` - Animation library

### UI Dependencies
- `tailwindcss` - Utility-first CSS framework
- `class-variance-authority` - Component variant management
- `@radix-ui/react-slot` - Composition utilities
- `clsx` & `tailwind-merge` - Conditional styling

## 🚀 Deployment

The app is ready for deployment to any static hosting service:

```bash
npm run build
# Deploy the 'dist' folder to your hosting provider
```

## 🔒 Environment Variables

Create a `.env` file based on `.env.example` and configure:

- **Required**: API keys for chosen AI services
- **Optional**: All theming and feature toggles have sensible defaults

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
