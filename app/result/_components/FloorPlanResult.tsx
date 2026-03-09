"use client";

import type { FloorPlanProposal } from "@/lib/types";
import FloorPlanCard from "./FloorPlanCard";
import AsciiFloorPlan from "./AsciiFloorPlan";
import RoomBreakdown from "./RoomBreakdown";
import Recommendations from "./Recommendations";
import RegeneratePanel from "./RegeneratePanel";

export default function FloorPlanResult({
  proposal,
  onRegenerate,
  isLoading,
}: {
  proposal: FloorPlanProposal;
  onRegenerate: (instructions: string) => void;
  isLoading: boolean;
}) {
  return (
    <div className="space-y-6">
      <FloorPlanCard proposal={proposal} />
      <AsciiFloorPlan floors={proposal.floors} />
      <RoomBreakdown floors={proposal.floors} />
      <Recommendations proposal={proposal} />
      <RegeneratePanel onRegenerate={onRegenerate} isLoading={isLoading} />
    </div>
  );
}
