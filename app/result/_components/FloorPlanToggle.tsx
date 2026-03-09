"use client";

export default function FloorPlanToggle({
  view,
  onViewChange,
  hasSvgData,
}: {
  view: "svg" | "ascii";
  onViewChange: (view: "svg" | "ascii") => void;
  hasSvgData: boolean;
}) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex rounded-lg border border-cream-300 overflow-hidden">
        <button
          onClick={() => onViewChange("svg")}
          disabled={!hasSvgData}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            view === "svg"
              ? "bg-forest-600 text-white"
              : hasSvgData
                ? "bg-white text-wood-600 hover:bg-cream-100"
                : "bg-cream-100 text-wood-400 cursor-not-allowed"
          }`}
        >
          2D間取り図
        </button>
        <button
          onClick={() => onViewChange("ascii")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            view === "ascii"
              ? "bg-forest-600 text-white"
              : "bg-white text-wood-600 hover:bg-cream-100"
          }`}
        >
          テキスト表示
        </button>
      </div>
    </div>
  );
}
