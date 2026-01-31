# 🚀 Vibe Coding Platform

AI-powered platform for photo analysis, MBTI psychological testing, chat conversation analysis, and creative brainstorming.

## ✨ Features

- 📸 **Photo Analysis** - AI-powered image insights, emotion detection, psychological analysis
- 🧠 **MBTI Analysis** - Personality typing through text, images, or interactive quizzes
- 💬 **Chat Analysis** - Analyze KakaoTalk and conversations for psychological insights
- 💡 **Brainstorming** - Generate creative ideas with AI-powered tools
- 🔐 **Authentication** - User registration and login
- 📊 **Analytics** - Track user usage and insights

## 🏗️ Tech Stack

### Frontend
- **Next.js 16** (App Router, React Server Components)
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Z.ai API** - GLM-4.7 & GLM-4V for AI features

### Backend
- **Node.js + Express** - RESTful API
- **TypeScript** - Type-safe API development
- **Z.ai Integration** - AI model integration
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Infrastructure
- **Vercel** - Frontend hosting (planned)
- **Cloud Run** - Backend hosting (planned)
- **Firebase** - Auth & Firestore (to be added)
- **Stripe** - Payment processing (to be added)

## 📦 Project Structure

```
vibe-coding-platform/
├── frontend/                    # Next.js frontend
│   ├── app/                     # Next.js App Router
│   │   ├── page.tsx             # Landing page
│   │   ├── layout.tsx            # Root layout (with SEO)
│   │   └── sitemap.ts            # Auto-generated sitemap
│   ├── components/              # React components
│   │   ├── PhotoAnalysisTool.tsx # Photo upload & analysis
│   │   └── MBTITool.tsx          # MBTI quiz & analysis
│   ├── lib/                      # Utilities
│   │   └── api.ts                # API client
│   ├── public/                   # Static files
│   │   ├── robots.txt            # Search engine directives
│   │   └── favicon.ico
│   └── package.json
│
├── backend/                     # Express backend
│   ├── src/
│   │   ├── index.ts              # Server entry point
│   │   ├── routes/               # API endpoints
│   │   │   ├── auth.ts           # Register & login
│   │   │   ├── photoAnalysis.ts  # Photo upload & analysis
│   │   │   ├── mbti.ts             # MBTI analysis
│   │   │   ├── chatAnalysis.ts   # Chat & KakaoTalk analysis
│   │   │   └── brainstorm.ts      # Brainstorming tools
│   │   ├── services/              # Business logic
│   │   │   └── zaiService.ts      # Z.ai API integration
│   │   └── middleware/            # Express middleware
│   │       └── errorHandler.ts   # Error handling
│   ├── dist/                      # Compiled JS
│   └── package.json
│
├── ai-chatbot-backend/           # Reference project
├── ai-content-generator-backend/ # Reference project
├── payment-analyzer-backend/      # Reference project
├── resume-ai-research-backend/     # Reference project
├── package.json                 # Root workspace
└── README.md                    # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/ctaeung9776-del/vibe-coding-platform.git
cd vibe-coding-platform

# Install dependencies
npm install
```

### Development

Start both frontend and backend in parallel:

```bash
# Start frontend (Terminal 1)
cd frontend
npm run dev
# Frontend: http://localhost:3000

# Start backend (Terminal 2)
cd backend
npm run dev
# Backend: http://localhost:3001
```

### Build

```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd backend
npm run build
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Photo Analysis
- `POST /api/photo/analyze` - Analyze uploaded image
  - Body: `FormData` with `image` field
  - Response: Photo analysis with emotions, objects, insights

### MBTI Analysis
- `POST /api/mbti/analyze` - Analyze MBTI from text/image
  - Body: `{ input, type: 'text' | 'image' | 'quiz' }`
  - Response: MBTI type with confidence and traits
- `POST /api/mbti/quiz` - MBTI quiz analysis
  - Body: `{ answers: string[] }`
  - Response: MBTI type with detailed analysis

### Chat Analysis
- `POST /api/chat/analyze` - General chat analysis
  - Body: `{ chatHistory, platform }`
  - Response: Tone, mood, topics, personality insights
- `POST /api/chat/analyze-kakao` - KakaoTalk specific analysis
  - Body: `{ chatText }`
  - Response: KakaoTalk format analysis

### Brainstorming
- `POST /api/brainstorm/ideas` - Generate ideas
  - Body: `{ prompt, context, ideaCount }`
  - Response: List of ideas with categories
- `POST /api/brainstorm/rapid` - Rapid brainstorming
  - Body: `{ topic, duration: 'short' | 'long' }`
  - Response: Quick brainstorming results
- `POST /api/brainstorm/mvp` - MVP planning
  - Body: `{ idea, constraints }`
  - Response: MVP feature list and roadmap

## 🔑 Environment Variables

See `backend/.env.example`:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Z.ai Configuration
ZAI_API_KEY=your-zai-api-key-here

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000

# JWT Secret
JWT_SECRET=your-jwt-secret-here

# Firebase Configuration (to be added)
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=

# Stripe Configuration (to be added)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_MONTHLY=

# Google AdSense (to be added)
ADSENSE_PUBLISHER_ID=
ADSENSE_AD_SLOT_ID=
```

## 🌐 Deployment

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

## 📊 Revenue Model

### 1. Freemium
- **Free Tier**: Basic features, limited usage
- **Premium Tier**: ₩9,900/month, unlimited access

### 2. Google AdSense
- Display ads on free tier pages
- Estimated revenue: ₩50,000 - ₩200,000/month (early stage)

### 3. API Access (Future)
- Pay-per-use API for developers
- Rate-limited free tier for testing

## 📈 Projected Revenue

### Month 1-3
- Google AdSense: ₩50,000 - ₩200,000/month
- Free users: 100 - 500 users

### Month 3-6
- Subscription (₩9,900/month × 50 users): ₩495,000/month
- AdSense: ₩300,000 - ₩500,000/month
- **Total**: ₩795,000 - ₩995,000/month

### Month 6-12
- Subscription (500 users): ₩4,950,000/month
- AdSense: ₩1,000,000/month
- **Total**: ₩5,950,000+/month

## 🎯 Marketing Strategy

### Reddit (Free)
- r/SaaS - Show MVP case study
- r/startups - Startup discussions
- r/Korean - Korean community promotion
- r/ArtificialIntelligence - AI tools showcase

### International Communities
- **IndieHackers** - "Show IH" for MVP
- **Hacker News** - "Show HN" for project
- **Product Hunt** - Product launch

### SEO
- Blog posts about MBTI, psychology, AI tools
- YouTube tutorials (Korean + English)
- Guest posts on tech blogs

## 🔮 Future Enhancements

- [ ] Firebase Auth integration
- [ ] Stripe subscription integration
- [ ] Google AdSense integration
- [ ] Real-time collaboration features
- [ ] Export to PDF/Excel
- [ ] Mobile app (React Native)
- [ ] API documentation portal
- [ ] User dashboard with analytics

## 📝 License

MIT

## 👤 Contact

- **Creator**: 태웅 Choi
- **Email**: ctaeung9776@gmail.com
- **GitHub**: [@ctaeung9776-del](https://github.com/ctaeung9776-del)
- **Twitter**: [@vibe_coding](https://twitter.com/vibe_coding)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Z.ai](https://z.ai/) - AI models (GLM-4.7, GLM-4V)
- [Express](https://expressjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ❤️ for AI enthusiasts worldwide**
