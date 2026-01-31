'use client';

import { useState } from 'react';
import api from '@/lib/api';

export default function PhotoAnalysisTool() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
      setResult(null);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.analyzePhoto(image);
      setResult(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '분석 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">📸 AI 사진 분석</h2>

      {/* Upload Section */}
      <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition">
          {preview ? (
            <img src={preview} alt="Preview" className="max-h-96 mx-auto rounded-lg" />
          ) : (
            <div>
              <div className="text-6xl mb-4">📷</div>
              <p className="text-gray-600 mb-4">이미지를 업로드하세요</p>
              <label className="cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                파일 선택
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        {image && (
          <button
            onClick={analyzeImage}
            disabled={loading}
            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? '분석 중...' : 'AI 분석 시작'}
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="bg-white rounded-xl p-8 shadow-lg animate-fade-in">
          <h3 className="text-2xl font-bold mb-6">분석 결과</h3>

          {/* Description */}
          <div className="mb-6">
            <h4 className="font-semibold text-lg mb-2">📝 설명</h4>
            <p className="text-gray-700">{result.description}</p>
          </div>

          {/* Emotions */}
          <div className="mb-6">
            <h4 className="font-semibold text-lg mb-2">😊 감정 분석</h4>
            <div className="flex flex-wrap gap-2">
              {result.emotions?.map((emotion: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                  {emotion}
                </span>
              ))}
            </div>
          </div>

          {/* Objects */}
          <div className="mb-6">
            <h4 className="font-semibold text-lg mb-2">🔍 탐지된 객체</h4>
            <div className="flex flex-wrap gap-2">
              {result.objects?.map((obj: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {obj}
                </span>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div>
            <h4 className="font-semibold text-lg mb-2">💡 심리학적 통찰</h4>
            <ul className="space-y-2">
              {result.insights?.map((insight: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span className="text-gray-700">{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
