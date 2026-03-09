"use client";

import type { FloorDetail } from "@/lib/types";

export default function AsciiFloorPlan({ floors }: { floors: FloorDetail[] }) {
  return (
    <div className="space-y-6">
      {floors.map((floor) => (
        <div
          key={floor.floorNumber}
          className="bg-white rounded-xl shadow-sm border border-cream-200 p-6"
        >
          <h3 className="text-lg font-bold text-wood-600 mb-4">
            {floor.floorName}の間取り図
          </h3>
          <div className="bg-cream-50 rounded-lg p-4 overflow-x-auto">
            <pre className="font-mono text-sm text-wood-600 leading-relaxed whitespace-pre">
              {floor.asciiPlan}
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
}
