# 🚀 Lumi AI Deployment Guide

## Quick Deploy Options

### 🔥 Option 1: Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/lumi-ai)

**Steps:**
1. Push code to GitHub
2. Connect Vercel to your GitHub account
3. Import the repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### 🐙 Option 2: GitHub Pages

**Steps:**
1. Go to repository Settings → Pages
2. Select "GitHub Actions" as source
3. The workflow will automatically deploy on push

### ⚡ Option 3: Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/lumi-ai)

## Environment Variables for Production

**Required for AI Features:**
```env
VITE_USE_REAL_API=true
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

**Optional Customization:**
```env
VITE_APP_NAME=Your AI Assistant
VITE_APP_TAGLINE=Your Custom Tagline
VITE_PRIMARY_COLOR=#8B5CF6
VITE_SECONDARY_COLOR=#EC4899
```

## Build Commands

**Development:**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
npm run preview
```

## Features Included

✅ **AI Integration** - Gemini API with DeepSeek fallback
✅ **File Upload** - Real file handling and attachments
✅ **Chat Management** - Pin, archive, delete, export chats
✅ **Settings Panel** - Bulk operations and app info
✅ **Theme Support** - Light/dark mode with persistence
✅ **Responsive Design** - Works on all devices
✅ **Animated UI** - Beautiful glassmorphism effects
✅ **Fallback System** - Always works, even without API keys

## Security Notes

⚠️ **Important:**
- Never commit real API keys to version control
- Use environment variables for all sensitive data
- The `.env` file is already in `.gitignore`
- Set up environment variables in your deployment platform

## Performance

- **Bundle Size:** Optimized with Vite
- **Loading:** Lazy loading and code splitting
- **Caching:** Service worker ready
- **SEO:** Meta tags and structured data included

## Support

- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS + Framer Motion
- **Build Tool:** Vite
- **Deployment:** Static site (works anywhere)

## Post-Deployment Checklist

- [ ] Test AI responses with real API keys
- [ ] Verify file upload functionality
- [ ] Check theme switching
- [ ] Test chat management features
- [ ] Confirm responsive design on mobile
- [ ] Validate settings panel operations

**Your Lumi AI is now ready for production! 🎉**
