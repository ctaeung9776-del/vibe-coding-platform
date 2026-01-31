import express, { Request, Response } from 'express';
import zaiService from '../services/zaiService';

const router = express.Router();

// POST /api/chat/analyze
router.post('/analyze', async (req: Request, res: Response) => {
  try {
    const { chatHistory, platform = 'general' } = req.body;

    if (!chatHistory) {
      return res.status(400).json({ error: 'Chat history is required' });
    }

    const analysis = await zaiService.analyzeChat(chatHistory);

    res.json({
      success: true,
      data: {
        ...analysis,
        platform,
        analyzedAt: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Chat analysis failed',
    });
  }
});

// POST /api/chat/analyze-kakao
router.post('/analyze-kakao', async (req: Request, res: Response) => {
  try {
    const { chatText } = req.body;

    if (!chatText) {
      return res.status(400).json({ error: 'Chat text is required' });
    }

    // Preprocess KakaoTalk format
    const processedText = this.preprocessKakaoChat(chatText);
    const analysis = await zaiService.analyzeChat(processedText);

    res.json({
      success: true,
      data: {
        ...analysis,
        platform: 'kakaotalk',
        analyzedAt: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Kakao chat analysis failed',
    });
  }
});

// Helper function to preprocess KakaoTalk chat format
function preprocessKakaoChat(chatText: string): string {
  // Remove timestamps and format for cleaner analysis
  return chatText
    .replace(/\[\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}\]/g, '') // Remove timestamps
    .replace(/^\s*\w+\s*:\s*/gm, '') // Remove usernames
    .replace(/님이\s*보낸\s*메시지/g, '')
    .replace(/님이\s*보낸\s*사진/g, '')
    .trim();
}

export default router;
