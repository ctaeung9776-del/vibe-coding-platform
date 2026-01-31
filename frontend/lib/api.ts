const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface PhotoAnalysisResponse {
  description: string;
  emotions: string[];
  objects: string[];
  insights: string[];
}

export interface MBTIResponse {
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

class APIClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('token');

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  // Auth
  async register(email: string, password: string, name?: string) {
    return this.request<{ success: boolean; data: any }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async login(email: string, password: string) {
    return this.request<{ success: boolean; data: any }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getMe() {
    return this.request<{ success: boolean; data: any }>('/api/auth/me');
  }

  // Photo Analysis
  async analyzePhoto(file: File): Promise<{ success: boolean; data: PhotoAnalysisResponse }> {
    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('token');
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/photo/analyze`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Photo analysis failed');
    }

    return response.json();
  }

  // MBTI
  async analyzeMBTI(input: string, type: 'text' | 'image' | 'quiz' = 'text') {
    return this.request<{ success: boolean; data: MBTIResponse }>('/api/mbti/analyze', {
      method: 'POST',
      body: JSON.stringify({ input, type }),
    });
  }

  async mbtiQuiz(answers: string[]) {
    return this.request<{ success: boolean; data: MBTIResponse }>('/api/mbti/quiz', {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  }

  // Chat Analysis
  async analyzeChat(chatHistory: string, platform: string = 'general') {
    return this.request<{ success: boolean; data: ChatAnalysisResponse }>(
      '/api/chat/analyze',
      {
        method: 'POST',
        body: JSON.stringify({ chatHistory, platform }),
      }
    );
  }

  async analyzeKakaoChat(chatText: string) {
    return this.request<{ success: boolean; data: ChatAnalysisResponse }>(
      '/api/chat/analyze-kakao',
      {
        method: 'POST',
        body: JSON.stringify({ chatText }),
      }
    );
  }

  // Brainstorming
  async brainstorm(prompt: string, context?: string, ideaCount?: number) {
    return this.request<{ success: boolean; data: BrainstormResponse }>(
      '/api/brainstorm/ideas',
      {
        method: 'POST',
        body: JSON.stringify({ prompt, context, ideaCount }),
      }
    );
  }

  async rapidBrainstorm(topic: string, duration: 'short' | 'long' = 'short') {
    return this.request<{ success: boolean; data: BrainstormResponse }>(
      '/api/brainstorm/rapid',
      {
        method: 'POST',
        body: JSON.stringify({ topic, duration }),
      }
    );
  }

  async mvpBrainstorm(idea: string, constraints?: string) {
    return this.request<{ success: boolean; data: BrainstormResponse }>(
      '/api/brainstorm/mvp',
      {
        method: 'POST',
        body: JSON.stringify({ idea, constraints }),
      }
    );
  }
}

export default new APIClient();
