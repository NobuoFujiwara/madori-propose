"use client";

import { useHearingStore } from "@/stores/hearing-store";
import { REQUIREMENT_FEATURES } from "@/lib/constants";

export default function StepRequirements() {
  const { hearingData, updateRequirements } = useHearingStore();
  const req = hearingData.requirements;

  const toggleFeature = (feature: string) => {
    const updated = req.features.includes(feature)
      ? req.features.filter((f) => f !== feature)
      : [...req.features, feature];

    const isParking = feature === "駐車場";
    const isGarden = feature === "庭・ガーデン";

    updateRequirements({
      ...req,
      features: updated,
      parking: isParking ? !req.parking : req.parking,
      garden: isGarden ? !req.garden : req.garden,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-wood-600 mb-2">特別なご要望</h2>
      <p className="text-sm text-wood-500 mb-6">
        住まいに取り入れたい設備や機能をお選びください。
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {REQUIREMENT_FEATURES.map((feature) => (
          <label
            key={feature}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
              req.features.includes(feature)
                ? "border-forest-500 bg-forest-50"
                : "border-cream-300 bg-white hover:border-forest-300"
            }`}
          >
            <input
              type="checkbox"
              checked={req.features.includes(feature)}
              onChange={() => toggleFeature(feature)}
              className="w-4 h-4 rounded accent-forest-500"
            />
            <span className="text-sm text-wood-600">{feature}</span>
          </label>
        ))}
      </div>

      {req.parking && (
        <div className="mb-6 p-4 bg-cream-100 rounded-lg">
          <label className="text-sm font-medium text-wood-600 block mb-2">
            駐車場の台数
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                updateRequirements({
                  ...req,
                  parkingSpaces: Math.max(1, req.parkingSpaces - 1),
                })
              }
              className="w-8 h-8 rounded-full border border-cream-300 bg-white text-wood-600 hover:border-forest-400"
            >
              -
            </button>
            <span className="text-lg font-medium text-wood-600 w-8 text-center">
              {req.parkingSpaces}
            </span>
            <button
              type="button"
              onClick={() =>
                updateRequirements({
                  ...req,
                  parkingSpaces: Math.min(4, req.parkingSpaces + 1),
                })
              }
              className="w-8 h-8 rounded-full border border-cream-300 bg-white text-wood-600 hover:border-forest-400"
            >
              +
            </button>
            <span className="text-sm text-wood-500">台分</span>
          </div>
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-wood-600 block mb-2">
          その他のご要望（自由記述）
        </label>
        <textarea
          value={req.freeText}
          onChange={(e) =>
            updateRequirements({ ...req, freeText: e.target.value })
          }
          placeholder="例：リビングに大きな窓がほしい、キッチンから庭が見えるようにしたい"
          className="w-full px-4 py-3 rounded-lg border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 resize-none h-24"
        />
      </div>
    </div>
  );
}
