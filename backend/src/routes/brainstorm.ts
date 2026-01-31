import express, { Request, Response } from 'express';
import zaiService from '../services/zaiService';

const router = express.Router();

// POST /api/brainstorm/ideas
router.post('/ideas', async (req: Request, res: Response) => {
  try {
    const { prompt, context, ideaCount = 5 } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const brainstorm = await zaiService.brainstorm(prompt, context);

    res.json({
      success: true,
      data: {
        ...brainstorm,
        ideaCount: brainstorm.ideas.length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Brainstorm failed',
    });
  }
});

// POST /api/brainstorm/rapid
router.post('/rapid', async (req: Request, res: Response) => {
  try {
    const { topic, duration = 'short' } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const systemPrompt = duration === 'long'
      ? 'Generate comprehensive, in-depth brainstorming results with 10+ ideas, detailed categories, and extensive next steps.'
      : 'Generate quick, actionable brainstorming results with 5-7 focused ideas, clear categories, and immediate next steps.';

    const response = await zaiService.brainstorm(topic, `Duration: ${duration}`);

    res.json({
      success: true,
      data: {
        ...response,
        duration,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Rapid brainstorm failed',
    });
  }
});

// POST /api/brainstorm/mvp
router.post('/mvp', async (req: Request, res: Response) => {
  try {
    const { idea, constraints } = req.body;

    if (!idea) {
      return res.status(400).json({ error: 'Idea is required' });
    }

    const context = constraints
      ? `Idea: ${idea}\nConstraints: ${constraints}`
      : `Idea: ${idea}\nGoal: Create MVP plan with minimal viable features`;

    // This will use the brainstorm service with MVP-specific context
    const response = await zaiService.brainstorm('Create MVP feature list and development roadmap', context);

    res.json({
      success: true,
      data: {
        ...response,
        type: 'mvp',
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'MVP brainstorm failed',
    });
  }
});

export default router;
