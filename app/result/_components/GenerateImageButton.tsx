"use client";

import { useState } from "react";
import type { FloorPlanProposal, GeneratedImage } from "@/lib/types";

export default function GenerateImageButton({
  proposal,
  onImageGenerated,
}: {
  proposal: FloorPlanProposal;
  onImageGenerated: (image: GeneratedImage) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposal }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "画像生成に失敗しました");
      }

      const data: GeneratedImage = await response.json();
      onImageGenerated(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "画像生成に失敗しました。もう一度お試しください。"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-forest-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-wood-600 font-medium">
            AIが外観イメージを作成中...
          </p>
        </div>
        <p className="text-sm text-wood-400 mt-2">
          数秒〜十数秒かかることがあります
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-4">
      {error && (
        <p className="text-red-600 text-sm mb-3">{error}</p>
      )}
      <button
        onClick={handleGenerate}
        className="px-6 py-3 rounded-lg bg-forest-600 text-white font-medium hover:bg-forest-700 transition-colors inline-flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        外観イメージを生成する
      </button>
      <p className="text-xs text-wood-400 mt-2">
        Google Gemini AIが外観の完成イメージを生成します
      </p>
    </div>
  );
}
