# 🤖 Gemini API Setup Guide

## Quick Setup Instructions

### 1. Get Your Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variables
Open your `.env` file and update these values:

```env
# Enable real API
VITE_USE_REAL_API=true

# Add your Gemini API key
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Test the Integration
1. Save the `.env` file
2. Restart the development server: `npm run dev`
3. Open the app and send a message
4. You should now get real AI responses from Gemini!

## Features Ready for Gemini API

✅ **Real-time AI Responses** - Get actual AI responses instead of demo messages
✅ **Error Handling** - Graceful fallback if API fails
✅ **Environment Toggle** - Easy switch between demo and real API
✅ **Secure Configuration** - API key stored in environment variables

## Demo Mode vs Real API

### Demo Mode (Current)
- `VITE_USE_REAL_API=false`
- Shows predefined demo responses
- No API key required
- Perfect for development and testing

### Real API Mode
- `VITE_USE_REAL_API=true`
- Uses Google Gemini Pro model
- Requires valid API key
- Real AI conversations

## Troubleshooting

### API Key Issues
- Make sure your API key is valid
- Check that you have credits/quota available
- Ensure the key has proper permissions

### Environment Variables
- Restart the dev server after changing `.env`
- Make sure `.env` is in the project root
- Don't commit your real API key to version control

## Security Notes

⚠️ **Important**: Never commit your real API key to version control!

- Keep your API key in `.env` (already in `.gitignore`)
- Use environment variables in production
- Rotate your API key if compromised

## Ready to Go! 🚀

Your Lumi AI is now ready for Gemini API integration. Just add your API key and enable real API mode to start having real AI conversations!
