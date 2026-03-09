"use client";

import { useHearingStore } from "@/stores/hearing-store";
import { BUDGET_OPTIONS } from "@/lib/constants";

export default function StepBudget() {
  const { hearingData, updateBudget } = useHearingStore();
  const { range, note } = hearingData.budget;

  return (
    <div>
      <h2 className="text-xl font-bold text-wood-600 mb-2">ご予算</h2>
      <p className="text-sm text-wood-500 mb-6">
        建物本体のおおよそのご予算をお選びください（土地代は含みません）。
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {BUDGET_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => updateBudget({ ...hearingData.budget, range: option })}
            className={`px-4 py-3 rounded-lg border text-sm transition-colors ${
              range === option
                ? "border-forest-500 bg-forest-50 text-forest-700 font-medium ring-2 ring-forest-200"
                : "border-cream-300 bg-white text-wood-600 hover:border-forest-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <label className="text-sm text-wood-500 block mb-2">
          予算に関する備考（任意）
        </label>
        <textarea
          value={note}
          onChange={(e) => updateBudget({ ...hearingData.budget, note: e.target.value })}
          placeholder="ローンの想定額、こだわりたい部分など"
          className="w-full px-4 py-3 rounded-lg border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 resize-none h-20"
        />
      </div>
    </div>
  );
}
