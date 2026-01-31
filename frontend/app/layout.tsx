import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  title: 'Vibe Coding Platform - AI Photo Analysis, MBTI, Chat Analysis',
  description: 'AI-powered platform for photo analysis, MBTI psychological testing, chat conversation analysis, and creative brainstorming. Free tier available.',
  keywords: 'AI photo analysis, MBTI test, chat analysis, brainstorming, psychological insights, AI tools, Korean AI platform',
  openGraph: {
    title: 'Vibe Coding Platform',
    description: 'AI-powered insights for photos, personality, and conversations',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Coding Platform',
    description: 'AI-powered insights for photos, personality, and conversations',
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
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
