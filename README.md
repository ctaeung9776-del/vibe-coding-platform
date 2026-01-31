# Vibe Coding Platform 🚀

AI-powered platform for photo analysis, MBTI, chat analysis, and brainstorming.

## Features

- 📸 **Photo Analysis** - AI-powered image insights, emotion detection, psychological analysis
- 🧠 **MBTI Analysis** - Personality typing through text, images, or interactive quizzes
- 💬 **Chat Analysis** - Analyze KakaoTalk and conversations for psychological insights
- 💡 **Brainstorming** - Generate creative ideas with AI-powered tools

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS

### Backend
- Node.js + Express
- TypeScript
- Z.ai API (GLM-4.7, GLM-4V)
- Firebase (Auth, Firestore)

### Infrastructure
- Vercel (Frontend hosting)
- Cloud Run (Backend hosting)

## Quick Start

### Installation

```bash
# Clone repository
git clone https://github.com/ctaeung9776-del/vibe-coding-platform.git
cd vibe-coding-platform

# Install dependencies (root + workspaces)
npm install

# Setup environment
cd backend
cp .env.example .env
# Edit .env with your API keys

# Start development
npm run dev
```

### Development

```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend

# Both (parallel)
npm run dev
```

### Build

```bash
npm run build
```

### Production

```bash
npm run start
```

## Environment Variables

See `backend/.env.example` for required variables:

- `ZAI_API_KEY` - Z.ai API key (required)
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `FIREBASE_PRIVATE_KEY` - Firebase service account key
- `STRIPE_SECRET_KEY` - Stripe for payments
- `ADSENSE_PUBLISHER_ID` - Google AdSense ID

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Photo Analysis
- `POST /api/photo/analyze` - Analyze uploaded image

### MBTI
- `POST /api/mbti/analyze` - Analyze MBTI from text/image
- `POST /api/mbti/quiz` - MBTI quiz analysis

### Chat Analysis
- `POST /api/chat/analyze` - General chat analysis
- `POST /api/chat/analyze-kakao` - KakaoTalk specific analysis

### Brainstorming
- `POST /api/brainstorm/ideas` - Generate ideas
- `POST /api/brainstorm/rapid` - Rapid brainstorming
- `POST /api/brainstorm/mvp` - MVP planning

## Project Structure

```
vibe-coding/
├── frontend/           # Next.js frontend
│   ├── app/
│   └── ...
├── backend/            # Express backend
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── index.ts
│   └── .env.example
├── package.json        # Root workspace config
└── README.md
```

## Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel deploy
```

### Backend (Cloud Run)
```bash
cd backend
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/vibe-coding-backend
gcloud run deploy vibe-coding-backend \
  --image gcr.io/YOUR_PROJECT_ID/vibe-coding-backend \
  --platform managed \
  --region asia-northeast3
```

## Revenue Model

1. **Freemium** - Basic features free, premium ₩9,900/month
2. **Google AdSense** - Display ads on free tier
3. **API Access** - Pay-per-use for developers

## Future Enhancements

- [ ] Firebase Auth integration
- [ ] Stripe subscription integration
- [ ] Google AdSense integration
- [ ] SEO optimization
- [ ] GEO targeting (Korean + English)
- [ ] Real-time chat analysis
- [ ] Export to PDF/Excel

## License

MIT

## Contact

- Creator: 태웅 Choi
- Email: ctaeung9776@gmail.com
- GitHub: [@ctaeung9776-del](https://github.com/ctaeung9776-del)
