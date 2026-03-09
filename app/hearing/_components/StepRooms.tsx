"use client";

import { useHearingStore } from "@/stores/hearing-store";
import { LDK_TYPES, FLOOR_OPTIONS, ADDITIONAL_ROOMS } from "@/lib/constants";

export default function StepRooms() {
  const { hearingData, updateRooms } = useHearingStore();
  const rooms = hearingData.rooms;

  const toggleAdditionalRoom = (room: string) => {
    const current = rooms.additionalRooms;
    const updated = current.includes(room)
      ? current.filter((r) => r !== room)
      : [...current, room];
    updateRooms({ ...rooms, additionalRooms: updated });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-wood-600 mb-2">ご希望の部屋数・構成</h2>
      <p className="text-sm text-wood-500 mb-6">
        ご希望の間取りタイプと構成をお選びください。
      </p>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-wood-600 block mb-3">
            間取りタイプ
          </label>
          <div className="flex flex-wrap gap-3">
            {LDK_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => updateRooms({ ...rooms, ldkType: type })}
                className={`px-5 py-2.5 rounded-lg border text-sm transition-colors ${
                  rooms.ldkType === type
                    ? "border-forest-500 bg-forest-50 text-forest-700 font-medium ring-2 ring-forest-200"
                    : "border-cream-300 bg-white text-wood-600 hover:border-forest-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-wood-600 block mb-3">
            階数
          </label>
          <div className="flex flex-wrap gap-3">
            {FLOOR_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => updateRooms({ ...rooms, floors: option })}
                className={`px-5 py-2.5 rounded-lg border text-sm transition-colors ${
                  rooms.floors === option
                    ? "border-forest-500 bg-forest-50 text-forest-700 font-medium ring-2 ring-forest-200"
                    : "border-cream-300 bg-white text-wood-600 hover:border-forest-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-wood-600 block mb-3">
            浴室数
          </label>
          <div className="flex gap-3">
            {[1, 2].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => updateRooms({ ...rooms, bathrooms: n })}
                className={`px-5 py-2.5 rounded-lg border text-sm transition-colors ${
                  rooms.bathrooms === n
                    ? "border-forest-500 bg-forest-50 text-forest-700 font-medium ring-2 ring-forest-200"
                    : "border-cream-300 bg-white text-wood-600 hover:border-forest-300"
                }`}
              >
                {n}つ
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-wood-600 block mb-3">
            追加で欲しい部屋・スペース（複数選択可）
          </label>
          <div className="grid grid-cols-2 gap-3">
            {ADDITIONAL_ROOMS.map((room) => (
              <label
                key={room}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                  rooms.additionalRooms.includes(room)
                    ? "border-forest-500 bg-forest-50"
                    : "border-cream-300 bg-white hover:border-forest-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={rooms.additionalRooms.includes(room)}
                  onChange={() => toggleAdditionalRoom(room)}
                  className="w-4 h-4 text-forest-500 rounded accent-forest-500"
                />
                <span className="text-sm text-wood-600">{room}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
