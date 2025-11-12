import axios from 'axios';
import { ApiService } from '@/types';

class DeepSeekService implements ApiService {
  private apiKey: string;
  private baseURL: string = 'https://api.deepseek.com/v1';

  constructor(apiKey: string) {
    console.log('Initializing DeepSeek with API key:', apiKey.substring(0, 15) + '...');
    this.apiKey = apiKey;
    console.log('DeepSeek service initialized successfully');
  }

  async sendMessage(message: string): Promise<string> {
    try {
      console.log('Sending message to DeepSeek:', message);
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: "deepseek-chat",
          messages: [{ role: "user", content: message }]
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('DeepSeek response:', response.data);
      const content = response.data.choices[0].message.content;
      console.log('DeepSeek response text:', content);
      return content;
    } catch (error: any) {
      console.error('DeepSeek API error details:', error?.response?.data || error?.message || error);
      throw new Error(`DeepSeek API Error: ${error?.response?.data?.error?.message || error?.message || 'Unknown error'}`);
    }
  }
}

export default DeepSeekService;
