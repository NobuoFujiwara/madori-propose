export interface FamilyMember {
  relationship: string;
  ageRange: string;
}

export interface HearingData {
  family: {
    members: FamilyMember[];
  };
  budget: {
    range: string;
    note: string;
  };
  rooms: {
    ldkType: string;
    floors: string;
    bathrooms: number;
    additionalRooms: string[];
  };
  requirements: {
    parking: boolean;
    parkingSpaces: number;
    garden: boolean;
    features: string[];
    freeText: string;
  };
  lifestyle: {
    pets: boolean;
    petDetails: string;
    hobbies: string;
    accessibility: string[];
    multiGeneration: boolean;
    multiGenerationType: string;
  };
  lot: {
    size: number;
    orientation: string;
    shape: string;
    restrictions: string;
  };
}

export interface RoomDetail {
  name: string;
  sizeJo: number;
  sizeSqm: number;
  purpose: string;
  features: string[];
}

export interface RoomLayout {
  roomName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  roomType:
    | "ldk"
    | "bedroom"
    | "bathroom"
    | "toilet"
    | "entrance"
    | "hallway"
    | "closet"
    | "stairs"
    | "balcony"
    | "japanese"
    | "utility"
    | "other";
}

export interface DoorIndicator {
  x: number;
  y: number;
  direction: "top" | "bottom" | "left" | "right";
}

export interface FloorDetail {
  floorNumber: number;
  floorName: string;
  rooms: RoomDetail[];
  asciiPlan: string;
  roomLayouts?: RoomLayout[];
  doors?: DoorIndicator[];
  gridWidth?: number;
  gridHeight?: number;
}

export interface GeneratedImage {
  base64Data: string;
  mimeType: string;
  prompt: string;
}

export interface FloorPlanProposal {
  planName: string;
  summary: string;
  totalFloorArea: { tsubo: number; sqm: number };
  buildingFootprint: { tsubo: number; sqm: number };
  floors: FloorDetail[];
  recommendations: { title: string; description: string }[];
  designRationale: string;
  estimatedCost: { min: number; max: number; note: string };
  parkingSpaces: number;
  gardenArea: { available: boolean; sqm: number };
}
