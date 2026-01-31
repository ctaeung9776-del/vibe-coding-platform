'use client';

import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'photo' | 'mbti' | 'chat' | 'brainstorm'>('photo');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
          Vibe Coding Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          AI-powered insights: Photo Analysis, MBTI, Chat Analysis, & Brainstorming
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#features"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Get Started Free
          </a>
          <a
            href="#pricing"
            className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition"
          >
            View Pricing
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon="📸"
            title="Photo Analysis"
            description="Upload photos for AI-powered insights, emotion detection, and psychological analysis"
            onClick={() => setActiveTab('photo')}
          />
          <FeatureCard
            icon="🧠"
            title="MBTI Analysis"
            description="Discover your personality type through text, images, or interactive quizzes"
            onClick={() => setActiveTab('mbti')}
          />
          <FeatureCard
            icon="💬"
            title="Chat Analysis"
            description="Analyze KakaoTalk and other chat conversations for psychological insights"
            onClick={() => setActiveTab('chat')}
          />
          <FeatureCard
            icon="💡"
            title="Brainstorming"
            description="Generate creative ideas with AI-powered brainstorming tools"
            onClick={() => setActiveTab('brainstorm')}
          />
        </div>
      </section>

      {/* Tool Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {activeTab === 'photo' && <PhotoAnalysisTool />}
          {activeTab === 'mbti' && <MBTITool />}
          {activeTab === 'chat' && <ChatAnalysisTool />}
          {activeTab === 'brainstorm' && <BrainstormTool />}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PricingCard
            title="Free"
            price="₩0"
            features={[
              'Basic photo analysis (5/day)',
              'MBTI quiz (unlimited)',
              'Chat analysis (limited)',
              'Brainstorming (10 ideas)',
            ]}
            highlighted={false}
          />
          <PricingCard
            title="Premium"
            price="₩9,900/mo"
            features={[
              'Unlimited photo analysis',
              'All MBTI features',
              'Unlimited chat analysis',
              'Unlimited brainstorming',
              'Priority processing',
              'Export results',
              'No watermarks',
            ]}
            highlighted={true}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>&copy; 2026 Vibe Coding Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer text-left"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </button>
  );
}

function PricingCard({ title, price, features, highlighted }: any) {
  return (
    <div
      className={`rounded-2xl p-8 ${
        highlighted
          ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white scale-105 shadow-2xl'
          : 'bg-white border-2 border-gray-200'
      }`}
    >
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="text-4xl font-bold mb-6">{price}</div>
      <ul className="space-y-3 mb-8">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-center gap-2">
            <span>✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-3 rounded-lg font-semibold ${
          highlighted
            ? 'bg-white text-purple-600 hover:bg-gray-100'
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}
      >
        {highlighted ? 'Start Premium' : 'Get Started'}
      </button>
    </div>
  );
}

// Placeholder components for tools
function PhotoAnalysisTool() {
  return (
    <div className="text-center py-12">
      <h3 className="text-2xl font-bold mb-4">Photo Analysis</h3>
      <p className="text-gray-600 mb-6">Upload an image to get AI-powered insights</p>
      <input type="file" accept="image/*" className="mx-auto block" />
    </div>
  );
}

function MBTITool() {
  return (
    <div className="text-center py-12">
      <h3 className="text-2xl font-bold mb-4">MBTI Analysis</h3>
      <p className="text-gray-600 mb-6">Discover your personality type</p>
      <button className="px-6 py-3 bg-purple-600 text-white rounded-lg">
        Start Quiz
      </button>
    </div>
  );
}

function ChatAnalysisTool() {
  return (
    <div className="text-center py-12">
      <h3 className="text-2xl font-bold mb-4">Chat Analysis</h3>
      <p className="text-gray-600 mb-6">Paste your chat history for insights</p>
      <textarea
        className="w-full h-48 border-2 border-gray-300 rounded-lg p-4"
        placeholder="Paste your chat here..."
      />
    </div>
  );
}

function BrainstormTool() {
  return (
    <div className="text-center py-12">
      <h3 className="text-2xl font-bold mb-4">Brainstorming</h3>
      <p className="text-gray-600 mb-6">Generate creative ideas instantly</p>
      <input
        type="text"
        className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 mb-4"
        placeholder="What do you want to brainstorm?"
      />
      <button className="px-6 py-3 bg-purple-600 text-white rounded-lg">
        Generate Ideas
      </button>
    </div>
  );
}
