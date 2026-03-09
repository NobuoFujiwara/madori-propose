import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { HearingData, FloorPlanProposal } from "@/lib/types";

interface HearingStore {
  hearingData: HearingData;
  currentStep: number;
  proposal: FloorPlanProposal | null;
  isLoading: boolean;
  error: string | null;

  updateFamily: (family: HearingData["family"]) => void;
  updateBudget: (budget: HearingData["budget"]) => void;
  updateRooms: (rooms: HearingData["rooms"]) => void;
  updateRequirements: (requirements: HearingData["requirements"]) => void;
  updateLifestyle: (lifestyle: HearingData["lifestyle"]) => void;
  updateLot: (lot: HearingData["lot"]) => void;
  setCurrentStep: (step: number) => void;
  setProposal: (proposal: FloorPlanProposal) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialHearingData: HearingData = {
  family: { members: [{ relationship: "本人", ageRange: "30代" }] },
  budget: { range: "3000万円〜3500万円", note: "" },
  rooms: {
    ldkType: "3LDK",
    floors: "2階建て",
    bathrooms: 1,
    additionalRooms: [],
  },
  requirements: {
    parking: true,
    parkingSpaces: 1,
    garden: false,
    features: [],
    freeText: "",
  },
  lifestyle: {
    pets: false,
    petDetails: "",
    hobbies: "",
    accessibility: [],
    multiGeneration: false,
    multiGenerationType: "",
  },
  lot: { size: 40, orientation: "南", shape: "整形地（四角形）", restrictions: "" },
};

export const useHearingStore = create<HearingStore>()(
  persist(
    (set) => ({
      hearingData: initialHearingData,
      currentStep: 0,
      proposal: null,
      isLoading: false,
      error: null,

      updateFamily: (family) =>
        set((state) => ({
          hearingData: { ...state.hearingData, family },
        })),
      updateBudget: (budget) =>
        set((state) => ({
          hearingData: { ...state.hearingData, budget },
        })),
      updateRooms: (rooms) =>
        set((state) => ({
          hearingData: { ...state.hearingData, rooms },
        })),
      updateRequirements: (requirements) =>
        set((state) => ({
          hearingData: { ...state.hearingData, requirements },
        })),
      updateLifestyle: (lifestyle) =>
        set((state) => ({
          hearingData: { ...state.hearingData, lifestyle },
        })),
      updateLot: (lot) =>
        set((state) => ({
          hearingData: { ...state.hearingData, lot },
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      setProposal: (proposal) => set({ proposal, isLoading: false }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error, isLoading: false }),
      reset: () =>
        set({
          hearingData: initialHearingData,
          currentStep: 0,
          proposal: null,
          error: null,
        }),
    }),
    {
      name: "hearing-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? sessionStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
    }
  )
);
