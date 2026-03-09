"use client";

import type { FloorDetail } from "@/lib/types";

export default function RoomBreakdown({ floors }: { floors: FloorDetail[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-cream-200 p-6">
      <h3 className="text-lg font-bold text-wood-600 mb-4">部屋別詳細</h3>
      <div className="space-y-6">
        {floors.map((floor) => (
          <div key={floor.floorNumber}>
            <h4 className="text-sm font-bold text-forest-600 mb-3">
              {floor.floorName}
            </h4>
            <div className="space-y-2">
              {floor.rooms.map((room, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-3 bg-cream-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium text-wood-600">
                        {room.name}
                      </span>
                      <span className="text-sm text-forest-600 font-medium">
                        {room.sizeJo}帖
                      </span>
                      <span className="text-xs text-wood-500">
                        ({room.sizeSqm}m²)
                      </span>
                    </div>
                    <p className="text-xs text-wood-500 mt-1">{room.purpose}</p>
                    {room.features.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {room.features.map((f, j) => (
                          <span
                            key={j}
                            className="text-xs px-2 py-0.5 bg-forest-50 text-forest-600 rounded-full"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
