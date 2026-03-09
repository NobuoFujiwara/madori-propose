"use client";

import { useState } from "react";

export default function RegeneratePanel({
  onRegenerate,
  isLoading,
}: {
  onRegenerate: (instructions: string) => void;
  isLoading: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [instructions, setInstructions] = useState("");

  const handleSubmit = () => {
    onRegenerate(instructions);
    setInstructions("");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-cream-200 p-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-lg font-bold text-wood-600">
          間取りを再提案してもらう
        </h3>
        <span
          className={`text-wood-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <p className="text-sm text-wood-500">
            変更したい点や追加のご要望を入力してください。
          </p>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="例：リビングをもっと広くしたい、和室を追加してほしい、玄関を南側にしてほしい"
            className="w-full px-4 py-3 rounded-lg border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 resize-none h-24"
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-lg bg-forest-600 text-white font-medium hover:bg-forest-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? "生成中..." : "再提案する"}
            </button>
            <button
              type="button"
              onClick={() => onRegenerate("")}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-lg border border-cream-300 text-wood-600 hover:bg-cream-100 disabled:opacity-50 transition-colors"
            >
              同じ条件で再生成
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
