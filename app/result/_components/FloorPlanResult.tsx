"use client";

import { useState } from "react";
import type { FloorPlanProposal, GeneratedImage } from "@/lib/types";
import FloorPlanCard from "./FloorPlanCard";
import SVGFloorPlan from "./SVGFloorPlan";
import AsciiFloorPlan from "./AsciiFloorPlan";
import FloorPlanToggle from "./FloorPlanToggle";
import RoomBreakdown from "./RoomBreakdown";
import Recommendations from "./Recommendations";
import RegeneratePanel from "./RegeneratePanel";
import GenerateImageButton from "./GenerateImageButton";
import HouseImageDisplay from "./HouseImageDisplay";

export default function FloorPlanResult({
  proposal,
  onRegenerate,
  isLoading,
}: {
  proposal: FloorPlanProposal;
  onRegenerate: (instructions: string) => void;
  isLoading: boolean;
}) {
  const hasSvgData = proposal.floors.some(
    (f) => f.roomLayouts && f.roomLayouts.length > 0
  );
  const [floorPlanView, setFloorPlanView] = useState<"svg" | "ascii">(
    hasSvgData ? "svg" : "ascii"
  );
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(
    null
  );

  return (
    <div className="space-y-6">
      <FloorPlanCard proposal={proposal} />

      <FloorPlanToggle
        view={floorPlanView}
        onViewChange={setFloorPlanView}
        hasSvgData={hasSvgData}
      />

      {floorPlanView === "svg" && hasSvgData ? (
        <SVGFloorPlan floors={proposal.floors} />
      ) : (
        <AsciiFloorPlan floors={proposal.floors} />
      )}

      <RoomBreakdown floors={proposal.floors} />
      <Recommendations proposal={proposal} />

      {/* AI外観イメージ生成セクション */}
      <div className="bg-white rounded-xl shadow-sm border border-cream-200 p-6">
        <h3 className="text-lg font-bold text-wood-600 mb-4">
          外観イメージ
        </h3>
        {generatedImage ? (
          <HouseImageDisplay image={generatedImage} />
        ) : (
          <GenerateImageButton
            proposal={proposal}
            onImageGenerated={setGeneratedImage}
          />
        )}
      </div>

      <RegeneratePanel onRegenerate={onRegenerate} isLoading={isLoading} />
    </div>
  );
}
