"use client";

import type { FloorDetail, RoomLayout } from "@/lib/types";

const CELL_SIZE = 50;

const ROOM_COLORS: Record<
  RoomLayout["roomType"],
  { fill: string; stroke: string; label: string }
> = {
  ldk: { fill: "#FFF3E0", stroke: "#E65100", label: "#BF360C" },
  bedroom: { fill: "#E3F2FD", stroke: "#1565C0", label: "#0D47A1" },
  bathroom: { fill: "#E0F7FA", stroke: "#00838F", label: "#006064" },
  toilet: { fill: "#F3E5F5", stroke: "#7B1FA2", label: "#4A148C" },
  entrance: { fill: "#FBE9E7", stroke: "#BF360C", label: "#BF360C" },
  hallway: { fill: "#F5F5F5", stroke: "#616161", label: "#424242" },
  closet: { fill: "#EFEBE9", stroke: "#795548", label: "#4E342E" },
  stairs: { fill: "#ECEFF1", stroke: "#455A64", label: "#263238" },
  balcony: { fill: "#E8F5E9", stroke: "#2E7D32", label: "#1B5E20" },
  japanese: { fill: "#F1F8E9", stroke: "#558B2F", label: "#33691E" },
  utility: { fill: "#FFF8E1", stroke: "#F9A825", label: "#F57F17" },
  other: { fill: "#FAFAFA", stroke: "#9E9E9E", label: "#616161" },
};

function SVGFloorView({ floor }: { floor: FloorDetail }) {
  const gridW = floor.gridWidth || 12;
  const gridH = floor.gridHeight || 10;
  const svgWidth = gridW * CELL_SIZE;
  const svgHeight = gridH * CELL_SIZE;
  const layouts = floor.roomLayouts || [];

  return (
    <div className="bg-cream-50 rounded-lg p-4 overflow-x-auto">
      <svg
        viewBox={`-1 -1 ${svgWidth + 2} ${svgHeight + 2}`}
        width="100%"
        style={{ maxWidth: svgWidth + 2 }}
        preserveAspectRatio="xMidYMid meet"
        className="mx-auto"
      >
        {/* Building outline */}
        <rect
          x={0}
          y={0}
          width={svgWidth}
          height={svgHeight}
          fill="none"
          stroke="#5D4037"
          strokeWidth={2}
        />

        {/* Grid lines (subtle) */}
        {Array.from({ length: gridW - 1 }, (_, i) => (
          <line
            key={`vg-${i}`}
            x1={(i + 1) * CELL_SIZE}
            y1={0}
            x2={(i + 1) * CELL_SIZE}
            y2={svgHeight}
            stroke="#E0E0E0"
            strokeWidth={0.5}
            strokeDasharray="2,4"
          />
        ))}
        {Array.from({ length: gridH - 1 }, (_, i) => (
          <line
            key={`hg-${i}`}
            x1={0}
            y1={(i + 1) * CELL_SIZE}
            x2={svgWidth}
            y2={(i + 1) * CELL_SIZE}
            stroke="#E0E0E0"
            strokeWidth={0.5}
            strokeDasharray="2,4"
          />
        ))}

        {/* Rooms */}
        {layouts.map((room, idx) => {
          const colors = ROOM_COLORS[room.roomType] || ROOM_COLORS.other;
          const rx = room.x * CELL_SIZE;
          const ry = room.y * CELL_SIZE;
          const rw = room.width * CELL_SIZE;
          const rh = room.height * CELL_SIZE;
          const centerX = rx + rw / 2;
          const centerY = ry + rh / 2;

          // Find matching room detail for size info
          const roomDetail = floor.rooms.find(
            (r) => r.name === room.roomName
          );

          return (
            <g key={idx}>
              <rect
                x={rx}
                y={ry}
                width={rw}
                height={rh}
                fill={colors.fill}
                stroke={colors.stroke}
                strokeWidth={1.5}
                rx={2}
              />
              {/* Room name */}
              <text
                x={centerX}
                y={centerY - (roomDetail ? 6 : 0)}
                textAnchor="middle"
                dominantBaseline="central"
                fill={colors.label}
                fontSize={rw < 120 ? 11 : 14}
                fontWeight="bold"
                fontFamily="'Noto Sans JP', sans-serif"
              >
                {room.roomName}
              </text>
              {/* Room size */}
              {roomDetail && (
                <text
                  x={centerX}
                  y={centerY + 12}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={colors.label}
                  fontSize={rw < 120 ? 9 : 11}
                  opacity={0.8}
                  fontFamily="'Noto Sans JP', sans-serif"
                >
                  {roomDetail.sizeJo}帖
                </text>
              )}
            </g>
          );
        })}

        {/* Door indicators */}
        {(floor.doors || []).map((door, idx) => {
          const dx = door.x * CELL_SIZE;
          const dy = door.y * CELL_SIZE;
          const doorSize = CELL_SIZE * 0.6;

          let pathD = "";
          switch (door.direction) {
            case "bottom":
              pathD = `M ${dx - doorSize / 2} ${dy} A ${doorSize / 2} ${doorSize / 2} 0 0 1 ${dx + doorSize / 2} ${dy}`;
              break;
            case "top":
              pathD = `M ${dx - doorSize / 2} ${dy} A ${doorSize / 2} ${doorSize / 2} 0 0 0 ${dx + doorSize / 2} ${dy}`;
              break;
            case "right":
              pathD = `M ${dx} ${dy - doorSize / 2} A ${doorSize / 2} ${doorSize / 2} 0 0 1 ${dx} ${dy + doorSize / 2}`;
              break;
            case "left":
              pathD = `M ${dx} ${dy - doorSize / 2} A ${doorSize / 2} ${doorSize / 2} 0 0 0 ${dx} ${dy + doorSize / 2}`;
              break;
          }

          return (
            <path
              key={`door-${idx}`}
              d={pathD}
              fill="none"
              stroke="#8D6E63"
              strokeWidth={1.5}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default function SVGFloorPlan({ floors }: { floors: FloorDetail[] }) {
  return (
    <div className="space-y-6">
      {floors.map((floor) => {
        const hasSvgData =
          floor.roomLayouts && floor.roomLayouts.length > 0;

        return (
          <div
            key={floor.floorNumber}
            className="bg-white rounded-xl shadow-sm border border-cream-200 p-6"
          >
            <h3 className="text-lg font-bold text-wood-600 mb-4">
              {floor.floorName}の間取り図
            </h3>
            {hasSvgData ? (
              <SVGFloorView floor={floor} />
            ) : (
              <div className="bg-cream-50 rounded-lg p-4 overflow-x-auto">
                <pre className="font-mono text-sm text-wood-600 leading-relaxed whitespace-pre">
                  {floor.asciiPlan}
                </pre>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
