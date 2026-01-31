import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://vibe-coding.com'),
  title: 'Vibe Coding Platform - AI Photo Analysis, MBTI, Chat Analysis',
  description: 'AI-powered platform for photo analysis, MBTI psychological testing, chat conversation analysis, and creative brainstorming. Free tier available. Try our AI tools today!',
  keywords: [
    'AI photo analysis',
    'MBTI test',
    'MBTI analysis',
    'personality test',
    'chat analysis',
    'KakaoTalk analysis',
    'conversation analysis',
    'brainstorming',
    'AI tools',
    'psychological analysis',
    'emotion detection',
    'AI insights',
    'Korean AI platform',
    'AI 플랫폼',
    '사진 분석',
    'MBTI 검사',
    '대화 분석',
    '아이디어 생성',
    'Z.ai',
  ],
  authors: [{ name: '태웅 Choi', url: 'https://github.com/ctaeung9776-del' }],
  creator: 'Vibe Coding',
  publisher: 'Vibe Coding Platform',
  
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: ['en_US'],
    siteName: 'Vibe Coding',
    title: 'Vibe Coding Platform - AI-Powered Insights',
    description: 'Discover your personality type, analyze photos, understand conversations and brainstorm ideas with AI. Free tier available!',
    url: 'https://vibe-coding.com',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Vibe Coding Platform',
    }],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Coding Platform - AI-Powered Insights',
    description: 'Discover your personality type, analyze photos, and brainstorm ideas with AI',
    images: ['/twitter-image.jpg'],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  
  alternates: {
    canonical: 'https://vibe-coding.com',
    languages: {
      'ko-KR': 'https://vibe-coding.com/ko',
      'en-US': 'https://vibe-coding.com/en',
      'ja-JP': 'https://vibe-coding.com/ja',
      'zh-CN': 'https://vibe-coding.com/zh',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Vibe Coding Platform",
              "description": "AI-powered platform for photo analysis, MBTI psychological testing, chat conversation analysis, and creative brainstorming",
              "url": "https://vibe-coding.com",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "KRW",
                "description": "Free tier with basic features"
              },
              "author": {
                "@type": "Person",
                "name": "태웅 Choi"
              },
              "provider": {
                "@type": "Organization",
                "name": "Vibe Coding",
                "url": "https://vibe-coding.com"
              }
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
