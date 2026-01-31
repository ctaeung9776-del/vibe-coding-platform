'use client';

import { useState } from 'react';
import api from '@/lib/api';

const MBTI_QUESTIONS = [
  {
    question: '파티에 갔을 때, 보통 어떻게 행동하나요?',
    options: ['새로운 사람들과 이야기하며 즐긴다', '아는 사람들과 이야기한다', '구석에서 조용히 지킨다'],
    dimension: 'E_I',
  },
  {
    question: '어려운 문제를 해결할 때, 어떻게 접근하나요?',
    options: ['실용적인 해결책을 찾는다', '창의적인 가능성을 탐색한다'],
    dimension: 'S_N',
  },
  {
    question: '친구가 문제를 털어놓으면, 보통?',
    options: ['해결책을 제안한다', '감정적으로 지지해준다'],
    dimension: 'T_F',
  },
  {
    question: '여행을 계획할 때?',
    options: ['자세한 일정을 짠다', '즉흥에 따라 간다'],
    dimension: 'J_P',
  },
  {
    question: '주말에는 보통?',
    options: ['밖에서 활동적으로 보낸다', '집에서 조용히 쉰니다'],
    dimension: 'E_I',
  },
  {
    question: '새로운 정보를 접할 때?',
    options: ['구체적인 사실과 세부사항에 집중한다', '큰 그림과 패턴을 파악한다'],
    dimension: 'S_N',
  },
  {
    question: '결정을 내릴 때?',
    options: ['논리와 분석에 의존한다', '감정과 가치관을 고려한다'],
    dimension: 'T_F',
  },
  {
    question: '업무나 공부 스타일?',
    options: ['기한과 계획을 철저히 지킨다', '유연하게 대처하고 변경에 개방적이다'],
    dimension: 'J_P',
  },
];

export default function MBTITool() {
  const [mode, setMode] = useState<'quiz' | 'text'>('quiz');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [textInput, setTextInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < MBTI_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz complete - analyze
      analyzeMBTI(newAnswers);
    }
  };

  const analyzeMBTI = async (quizAnswers?: string[]) => {
    setLoading(true);
    setError(null);

    try {
      let response;
      if (mode === 'quiz' && quizAnswers) {
        response = await api.mbtiQuiz(quizAnswers);
      } else {
        response = await api.analyzeMBTI(textInput, 'text');
      }
      setResult(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '분석 실패');
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setError(null);
    setTextInput('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">🧠 MBTI 성격 분석</h2>

      {/* Mode Toggle */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setMode('quiz')}
          className={`px-6 py-3 rounded-lg font-semibold ${
            mode === 'quiz'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          퀴즈로 분석
        </button>
        <button
          onClick={() => setMode('text')}
          className={`px-6 py-3 rounded-lg font-semibold ${
            mode === 'text'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          텍스트로 분석
        </button>
      </div>

      {/* Quiz Mode */}
      {mode === 'quiz' && !result && !loading && (
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">문제 {currentQuestion + 1} / {MBTI_QUESTIONS.length}</span>
              <div className="flex gap-1">
                {MBTI_QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-2 rounded ${
                      i < currentQuestion + 1
                        ? 'bg-purple-600'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-6">
              {MBTI_QUESTIONS[currentQuestion].question}
            </h3>
            <div className="space-y-3">
              {MBTI_QUESTIONS[currentQuestion].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Text Mode */}
      {mode === 'text' && !result && !loading && (
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-4">
              자신에 대해 이야기해 주세요
            </label>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full h-48 border-2 border-gray-300 rounded-lg p-4 focus:border-purple-500 focus:outline-none"
              placeholder="성격, 관심사항, 일상적인 행동 패턴 등을 자유롭게 적어주세요..."
            />
            <button
              onClick={() => analyzeMBTI()}
              disabled={!textInput.trim() || loading}
              className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? '분석 중...' : 'MBTI 분석 시작'}
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-xl p-12 shadow-lg text-center">
          <div className="text-6xl animate-spin mb-4">🧠</div>
          <p className="text-xl text-gray-600">AI 분석 중...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          {error}
          <button onClick={resetQuiz} className="ml-4 underline">
            다시 시도
          </button>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="bg-white rounded-xl p-8 shadow-lg animate-fade-in">
          <h3 className="text-2xl font-bold mb-6 text-center">당신의 MBTI는</h3>

          {/* MBTI Type */}
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
              {result.mbti}
            </div>
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full">
              신뢰도: {Math.round(result.confidence * 100)}%
            </div>
          </div>

          {/* Traits */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {result.traits?.E_I}
              </div>
              <div className="text-gray-600">외향 vs 내향</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {result.traits?.S_N}
              </div>
              <div className="text-gray-600">감각 vs 직관</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {result.traits?.T_F}
              </div>
              <div className="text-gray-600">사고 vs 감정</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {result.traits?.J_P}
              </div>
              <div className="text-gray-600">판단 vs 인식</div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="font-semibold text-lg mb-2">📝 성격 설명</h4>
            <p className="text-gray-700">{result.description}</p>
          </div>

          {/* Advice */}
          <div className="mb-8">
            <h4 className="font-semibold text-lg mb-2">💡 맞춤 조언</h4>
            <ul className="space-y-2">
              {result.advice?.map((advice: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span className="text-gray-700">{advice}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reset Button */}
          <div className="text-center">
            <button
              onClick={resetQuiz}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              다시 테스트
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
