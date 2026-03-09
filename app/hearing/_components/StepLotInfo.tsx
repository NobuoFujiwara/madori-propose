"use client";

import { useHearingStore } from "@/stores/hearing-store";
import { ORIENTATION_OPTIONS, LOT_SHAPES } from "@/lib/constants";

export default function StepLotInfo() {
  const { hearingData, updateLot } = useHearingStore();
  const lot = hearingData.lot;

  return (
    <div>
      <h2 className="text-xl font-bold text-wood-600 mb-2">土地情報</h2>
      <p className="text-sm text-wood-500 mb-6">
        土地のおおよその情報をお教えください。未定の場合はそのままで構いません。
      </p>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-wood-600 block mb-2">
            土地面積（坪）
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={20}
              max={100}
              step={5}
              value={lot.size}
              onChange={(e) =>
                updateLot({ ...lot, size: Number(e.target.value) })
              }
              className="flex-1 accent-forest-500"
            />
            <div className="flex items-baseline gap-1 min-w-[80px]">
              <span className="text-xl font-bold text-forest-600">
                {lot.size}
              </span>
              <span className="text-sm text-wood-500">坪</span>
            </div>
          </div>
          <p className="text-xs text-wood-500/60 mt-1">
            約{(lot.size * 3.306).toFixed(0)}m²
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-wood-600 block mb-3">
            道路の方角（接道方向）
          </label>
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 rounded-full border-2 border-cream-300 bg-cream-100" />
              {ORIENTATION_OPTIONS.map((dir, i) => {
                const angle = (i * 45 - 90) * (Math.PI / 180);
                const x = 50 + 38 * Math.cos(angle);
                const y = 50 + 38 * Math.sin(angle);
                return (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => updateLot({ ...lot, orientation: dir })}
                    className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium transition-colors -translate-x-1/2 -translate-y-1/2 ${
                      lot.orientation === dir
                        ? "bg-forest-500 text-white shadow-md"
                        : "bg-white border border-cream-300 text-wood-600 hover:border-forest-400"
                    }`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    {dir}
                  </button>
                );
              })}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-wood-500/60">敷地</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-wood-600 block mb-3">
            土地の形状
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {LOT_SHAPES.map((shape) => (
              <button
                key={shape}
                type="button"
                onClick={() => updateLot({ ...lot, shape })}
                className={`px-4 py-3 rounded-lg border text-sm transition-colors ${
                  lot.shape === shape
                    ? "border-forest-500 bg-forest-50 text-forest-700 font-medium ring-2 ring-forest-200"
                    : "border-cream-300 bg-white text-wood-600 hover:border-forest-300"
                }`}
              >
                {shape}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-wood-600 block mb-2">
            制限事項・備考（任意）
          </label>
          <textarea
            value={lot.restrictions}
            onChange={(e) =>
              updateLot({ ...lot, restrictions: e.target.value })
            }
            placeholder="例：北側斜線制限あり、高さ制限10m"
            className="w-full px-4 py-3 rounded-lg border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 resize-none h-20"
          />
        </div>
      </div>
    </div>
  );
}
