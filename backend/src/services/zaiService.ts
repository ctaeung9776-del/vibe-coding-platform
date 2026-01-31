import axios from 'axios';

const ZAI_API_KEY = process.env.ZAI_API_KEY;
const ZAI_BASE_URL = 'https://api.z.ai/v1';

export interface PhotoAnalysisResponse {
  description: string;
  emotions: string[];
  objects: string[];
  insights: string[];
}

export interface MBTIAnalysisResponse {
  mbti: string;
  confidence: number;
  traits: {
    E_I: string;
    S_N: string;
    T_F: string;
    J_P: string;
  };
  description: string;
  advice: string[];
}

export interface ChatAnalysisResponse {
  overallTone: string;
  mood: string;
  keyTopics: string[];
  personalityInsights: string[];
  suggestions: string[];
}

export interface BrainstormResponse {
  ideas: string[];
  categories: string[];
  nextSteps: string[];
}

class ZAIService {
  private headers = {
    'Authorization': `Bearer ${ZAI_API_KEY}`,
    'Content-Type': 'application/json',
  };

  async analyzePhoto(imageBase64: string): Promise<PhotoAnalysisResponse> {
    try {
      const response = await axios.post(
        `${ZAI_BASE_URL}/chat/completions`,
        {
          model: 'glm-4v',
          messages: [
            {
              role: 'system',
              content: 'You are an expert image analyst. Analyze images and provide detailed insights.',
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Analyze this image and provide: 1) Description, 2) Emotions detected, 3) Objects/people visible, 4) Psychological insights. Respond in JSON format.',
                },
                {
                  type: 'image_url',
                  image_url: { url: imageBase64 },
                },
              ],
            },
          ],
          response_format: { type: 'json_object' },
        },
        { headers: this.headers }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Photo analysis error:', error);
      throw new Error('Failed to analyze photo');
    }
  }

  async analyzeMBTI(input: string, type: 'text' | 'image' | 'quiz'): Promise<MBTIAnalysisResponse> {
    try {
      const systemPrompt = type === 'quiz'
        ? 'You are an MBTI expert. Analyze quiz responses and determine MBTI type with confidence level.'
        : 'You are an MBTI expert. Analyze the provided content and determine MBTI type with confidence level.';

      const userPrompt = type === 'image'
        ? 'Analyze this image for MBTI type based on visual cues, expressions, and context. Respond in JSON.'
        : `Analyze this content for MBTI type: ${input}. Respond in JSON with: mbti, confidence, traits (E_I, S_N, T_F, J_P), description, advice.`;

      const response = await axios.post(
        `${ZAI_BASE_URL}/chat/completions`,
        {
          model: 'glm-4.7',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          response_format: { type: 'json_object' },
        },
        { headers: this.headers }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('MBTI analysis error:', error);
      throw new Error('Failed to analyze MBTI');
    }
  }

  async analyzeChat(chatHistory: string): Promise<ChatAnalysisResponse> {
    try {
      const response = await axios.post(
        `${ZAI_BASE_URL}/chat/completions`,
        {
          model: 'glm-4.7',
          messages: [
            {
              role: 'system',
              content: 'You are a psychological analyst specializing in chat conversations. Analyze conversations for emotional patterns, communication style, and personality insights.',
            },
            {
              role: 'user',
              content: `Analyze this conversation:\n${chatHistory}\n\nProvide: overallTone, mood, keyTopics, personalityInsights, suggestions. Respond in JSON.`,
            },
          ],
          response_format: { type: 'json_object' },
        },
        { headers: this.headers }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Chat analysis error:', error);
      throw new Error('Failed to analyze chat');
    }
  }

  async brainstorm(prompt: string, context?: string): Promise<BrainstormResponse> {
    try {
      const systemPrompt = 'You are a creative brainstorming assistant. Generate diverse, innovative ideas based on user input. Organize by categories and provide actionable next steps.';

      const userPrompt = context
        ? `Context: ${context}\n\nBrainstorm ideas for: ${prompt}`
        : `Brainstorm ideas for: ${prompt}`;

      const response = await axios.post(
        `${ZAI_BASE_URL}/chat/completions`,
        {
          model: 'glm-4.7',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          response_format: { type: 'json_object' },
        },
        { headers: this.headers }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Brainstorm error:', error);
      throw new Error('Failed to brainstorm');
    }
  }
}

export default new ZAIService();
