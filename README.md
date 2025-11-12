# 🤖 Lumi AI

A modern, intelligent AI assistant built with React and TypeScript, featuring real-time AI conversations, file uploads, and beautiful animated UI.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Sathvik-Nagesh/lumi-ai)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Sathvik-Nagesh/lumi-ai)

## ✨ Features

### 🤖 **AI Integration**
- **Gemini 2.0 Flash API** - Latest Google AI model
- **DeepSeek API Fallback** - Backup AI service
- **Smart Fallback System** - Always works, even without API keys
- **Real-time Responses** - Fast AI conversations

### 📎 **File Management**
- **Real File Upload** - Drag & drop or click to upload
- **Multiple File Types** - Images, PDFs, documents, text files
- **File Previews** - Visual file attachments
- **File Removal** - Easy attachment management

### 💬 **Chat Management**
- **Pin Conversations** - Keep important chats at top
- **Archive Chats** - Organize old conversations
- **Delete Chats** - Individual or bulk deletion
- **Export Chats** - Download conversations as JSON
- **Search Chats** - Find conversations quickly

### ⚙️ **Settings & Configuration**
- **Settings Panel** - Comprehensive app configuration
- **Bulk Operations** - Delete all chats, export all data
- **App Information** - Version, API status, chat count
- **Environment Controls** - Easy feature toggles

### 🎨 **Beautiful UI**
- **Animated Interface** - Glassmorphism effects with smooth animations
- **Command Palette** - Quick actions with `/` commands
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Theme Support** - Light/dark mode with system detection
- **Loading States** - Beautiful animated feedback

### 🔧 **Developer Features**
- **TypeScript** - Full type safety
- **Environment Variables** - Easy configuration
- **Modular Architecture** - Clean, maintainable code
- **Production Ready** - Optimized builds

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
git clone https://github.com/Sathvik-Nagesh/lumi-ai.git
cd lumi-ai
npm install
```

2. **Configure environment variables:**
```bash
cp .env.example .env
```

3. **Add your API keys to `.env`:**
```env
# Enable real AI responses
VITE_USE_REAL_API=true

# Add your API keys
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_DEEPSEEK_API_KEY=your_deepseek_api_key_here

# Customize branding (optional)
VITE_APP_NAME=Your AI Assistant
VITE_APP_TAGLINE=Your Custom Tagline
```

4. **Start development server:**
```bash
npm run dev
```

5. **Build for production:**
```bash
npm run build
npm run preview
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

## 🚀 Deployment

### Quick Deploy Options

**Vercel (Recommended):**
1. Go to [vercel.com](https://vercel.com)
2. Import `Sathvik-Nagesh/lumi-ai`
3. Add environment variables
4. Deploy!

**GitHub Pages:**
1. Go to repository Settings → Pages
2. Source: "GitHub Actions"
3. Auto-deploys on push

**Netlify:**
1. Go to [netlify.com](https://netlify.com)
2. "New site from Git"
3. Build: `npm run build`, Publish: `dist`

### Environment Variables for Production

```env
VITE_USE_REAL_API=true
VITE_GEMINI_API_KEY=your_actual_api_key
VITE_DEEPSEEK_API_KEY=your_actual_api_key
```

## 🏗️ Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS
- **Animations:** Framer Motion
- **AI APIs:** Google Gemini 2.0 Flash, DeepSeek
- **Build Tool:** Vite
- **Icons:** Lucide React
- **Deployment:** Vercel, Netlify, GitHub Pages

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

## 📚 Documentation

- **[Deployment Guide](./DEPLOYMENT.md)** - Complete deployment instructions
- **[Gemini Setup](./GEMINI_SETUP.md)** - API key configuration guide

## 🎯 Key Features Showcase

### Command Palette
Type `/` to access quick commands:
- `/ask` - Ask AI about coding, design, or technology
- `/code` - Generate React, TypeScript, or other code
- `/ui` - Get help with UI/UX design and components
- `/debug` - Help debug and fix code issues

### Smart Fallback System
1. **Primary:** Gemini 2.0 Flash API
2. **Fallback:** DeepSeek API
3. **Final:** Demo responses (always works)

### File Upload Support
- **Images:** JPG, PNG, GIF, WebP, SVG
- **Documents:** PDF, DOC, DOCX, TXT
- **Data:** JSON, CSV
- **Preview:** Automatic image previews

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for your own AI assistant!

## 🙏 Acknowledgments

- **Google AI** - For the Gemini API
- **DeepSeek** - For the backup AI service
- **Vercel** - For easy deployment
- **Tailwind CSS** - For beautiful styling
- **Framer Motion** - For smooth animations

---

**Built with ❤️ by [Sathvik Nagesh](https://github.com/Sathvik-Nagesh)**

**⭐ Star this repo if you find it useful!**
