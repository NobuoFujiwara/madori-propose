"use client";

import type { FloorPlanProposal } from "@/lib/types";

export default function Recommendations({
  proposal,
}: {
  proposal: FloorPlanProposal;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-cream-200 p-6">
      <h3 className="text-lg font-bold text-wood-600 mb-4">
        設計のポイント
      </h3>

      <div className="space-y-3 mb-6">
        {proposal.recommendations.map((rec, i) => (
          <div key={i} className="flex gap-3 p-3 bg-cream-50 rounded-lg">
            <span className="text-forest-500 font-bold text-sm mt-0.5">
              {i + 1}.
            </span>
            <div>
              <p className="font-medium text-sm text-wood-600">{rec.title}</p>
              <p className="text-xs text-wood-500 mt-1">{rec.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-cream-200 pt-4">
        <h4 className="text-sm font-bold text-wood-600 mb-2">
          この間取りをお勧めする理由
        </h4>
        <p className="text-sm text-wood-500 leading-relaxed">
          {proposal.designRationale}
        </p>
      </div>
    </div>
  );
}
