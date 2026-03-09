"use client";

import type { FloorPlanProposal } from "@/lib/types";

export default function FloorPlanCard({
  proposal,
}: {
  proposal: FloorPlanProposal;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-cream-200 p-6 sm:p-8">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-wood-600">
            {proposal.planName}
          </h2>
          <p className="text-sm text-wood-500 mt-1">{proposal.summary}</p>
        </div>
        <span className="text-3xl">🏡</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <InfoBox
          label="延床面積"
          value={`${proposal.totalFloorArea.tsubo}坪`}
          sub={`${proposal.totalFloorArea.sqm}m²`}
        />
        <InfoBox
          label="建築面積"
          value={`${proposal.buildingFootprint.tsubo}坪`}
          sub={`${proposal.buildingFootprint.sqm}m²`}
        />
        <InfoBox
          label="概算費用"
          value={`${proposal.estimatedCost.min}〜${proposal.estimatedCost.max}万円`}
          sub={proposal.estimatedCost.note}
        />
        <InfoBox
          label="駐車場"
          value={`${proposal.parkingSpaces}台分`}
          sub={
            proposal.gardenArea.available
              ? `庭 ${proposal.gardenArea.sqm}m²`
              : "庭なし"
          }
        />
      </div>
    </div>
  );
}

function InfoBox({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="bg-cream-100 rounded-lg p-3">
      <p className="text-xs text-wood-500">{label}</p>
      <p className="text-sm font-bold text-wood-600 mt-1">{value}</p>
      <p className="text-xs text-wood-500/70 mt-0.5">{sub}</p>
    </div>
  );
}
