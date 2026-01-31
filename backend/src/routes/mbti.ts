import express, { Request, Response } from 'express';
import zaiService from '../services/zaiService';

const router = express.Router();

// POST /api/mbti/analyze
router.post('/analyze', async (req: Request, res: Response) => {
  try {
    const { input, type = 'text' } = req.body;

    if (!input) {
      return res.status(400).json({ error: 'Input is required' });
    }

    if (!['text', 'image', 'quiz'].includes(type)) {
      return res.status(400).json({ error: 'Invalid type. Must be: text, image, or quiz' });
    }

    const analysis = await zaiService.analyzeMBTI(input, type);

    res.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'MBTI analysis failed',
    });
  }
});

// POST /api/mbti/quiz
router.post('/quiz', async (req: Request, res: Response) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Quiz answers array is required' });
    }

    const answersText = answers.map((a: any, i: number) => `Q${i + 1}: ${a}`).join('\n');
    const analysis = await zaiService.analyzeMBTI(answersText, 'quiz');

    res.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'MBTI quiz failed',
    });
  }
});

export default router;
