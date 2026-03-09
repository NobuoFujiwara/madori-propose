"use client";

import { useHearingStore } from "@/stores/hearing-store";
import { ACCESSIBILITY_OPTIONS, MULTI_GEN_TYPES } from "@/lib/constants";

export default function StepLifestyle() {
  const { hearingData, updateLifestyle } = useHearingStore();
  const ls = hearingData.lifestyle;

  const toggleAccessibility = (option: string) => {
    const updated = ls.accessibility.includes(option)
      ? ls.accessibility.filter((a) => a !== option)
      : [...ls.accessibility, option];
    updateLifestyle({ ...ls, accessibility: updated });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-wood-600 mb-2">ライフスタイル</h2>
      <p className="text-sm text-wood-500 mb-6">
        暮らし方に関する情報をお教えください。間取りに反映します。
      </p>

      <div className="space-y-6">
        <div className="p-4 bg-cream-100 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={ls.pets}
              onChange={(e) =>
                updateLifestyle({ ...ls, pets: e.target.checked })
              }
              className="w-4 h-4 rounded accent-forest-500"
            />
            <span className="text-sm font-medium text-wood-600">
              ペットを飼っている（飼う予定）
            </span>
          </label>
          {ls.pets && (
            <input
              type="text"
              value={ls.petDetails}
              onChange={(e) =>
                updateLifestyle({ ...ls, petDetails: e.target.value })
              }
              placeholder="例：犬（中型犬1匹）、猫2匹"
              className="mt-3 w-full px-4 py-2 rounded-md border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
            />
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-wood-600 block mb-2">
            趣味・スペースが必要な活動（任意）
          </label>
          <input
            type="text"
            value={ls.hobbies}
            onChange={(e) =>
              updateLifestyle({ ...ls, hobbies: e.target.value })
            }
            placeholder="例：ピアノ、筋トレ、ガーデニング、DIY"
            className="w-full px-4 py-2 rounded-md border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-wood-600 block mb-3">
            バリアフリー・アクセシビリティ（複数選択可）
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ACCESSIBILITY_OPTIONS.map((option) => (
              <label
                key={option}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                  ls.accessibility.includes(option)
                    ? "border-forest-500 bg-forest-50"
                    : "border-cream-300 bg-white hover:border-forest-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={ls.accessibility.includes(option)}
                  onChange={() => toggleAccessibility(option)}
                  className="w-4 h-4 rounded accent-forest-500"
                />
                <span className="text-sm text-wood-600">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="p-4 bg-cream-100 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={ls.multiGeneration}
              onChange={(e) =>
                updateLifestyle({ ...ls, multiGeneration: e.target.checked })
              }
              className="w-4 h-4 rounded accent-forest-500"
            />
            <span className="text-sm font-medium text-wood-600">
              二世帯住宅を検討している
            </span>
          </label>
          {ls.multiGeneration && (
            <div className="mt-3 flex flex-wrap gap-2">
              {MULTI_GEN_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    updateLifestyle({ ...ls, multiGenerationType: type })
                  }
                  className={`px-4 py-2 rounded-md border text-sm transition-colors ${
                    ls.multiGenerationType === type
                      ? "border-forest-500 bg-forest-50 text-forest-700 font-medium"
                      : "border-cream-300 bg-white text-wood-600 hover:border-forest-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
