import { GoogleGenerativeAI } from '@google/generative-ai';
import { ApiService } from '@/types';

class GeminiService implements ApiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    console.log('Initializing Gemini with API key:', apiKey.substring(0, 15) + '...');
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash"
    });
    console.log('Gemini service initialized successfully');
  }

  async sendMessage(message: string): Promise<string> {
    try {
      console.log('Sending message to Gemini:', message);
      
      // Validate message
      if (!message || message.trim().length === 0) {
        throw new Error('Message cannot be empty');
      }
      
      const result = await this.model.generateContent(message);
      console.log('Gemini result:', result);
      
      const response = await result.response;
      console.log('Gemini response object:', response);
      
      // Check if response is blocked
      if (response.promptFeedback && response.promptFeedback.blockReason) {
        throw new Error(`Content blocked: ${response.promptFeedback.blockReason}`);
      }
      
      const text = response.text();
      console.log('Gemini response text:', text);
      
      if (!text || text.trim().length === 0) {
        throw new Error('Empty response from Gemini');
      }
      
      return text;
    } catch (error: any) {
      console.error('Gemini API error details:', error);
      
      // Check for specific error types
      if (error?.message?.includes('API_KEY_INVALID')) {
        throw new Error('Invalid Gemini API key');
      } else if (error?.message?.includes('QUOTA_EXCEEDED')) {
        throw new Error('Gemini API quota exceeded');
      } else if (error?.message?.includes('PERMISSION_DENIED')) {
        throw new Error('Gemini API permission denied');
      }
      
      throw new Error(`Gemini API Error: ${error?.message || 'Unknown error'}`);
    }
  }
}

export default GeminiService;
