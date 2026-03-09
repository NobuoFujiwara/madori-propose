"use client";

import { useRouter } from "next/navigation";
import { useHearingStore } from "@/stores/hearing-store";
import StepProgress from "./StepProgress";
import StepFamily from "./StepFamily";
import StepBudget from "./StepBudget";
import StepRooms from "./StepRooms";
import StepRequirements from "./StepRequirements";
import StepLifestyle from "./StepLifestyle";
import StepLotInfo from "./StepLotInfo";
import StepConfirm from "./StepConfirm";
import StepNavigation from "./StepNavigation";

const STEP_COMPONENTS = [
  StepFamily,
  StepBudget,
  StepRooms,
  StepRequirements,
  StepLifestyle,
  StepLotInfo,
  StepConfirm,
];

export default function HearingWizard() {
  const router = useRouter();
  const { currentStep, setCurrentStep } = useHearingStore();
  const CurrentStepComponent = STEP_COMPONENTS[currentStep];
  const isLastStep = currentStep === STEP_COMPONENTS.length - 1;

  const handleSubmit = () => {
    // 前回の結果をクリアして新しい提案を開始
    const store = useHearingStore.getState();
    store.setError(null);
    store.setLoading(false);
    useHearingStore.setState({ proposal: null });
    router.push("/result");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <StepProgress currentStep={currentStep} />
      <div className="bg-white rounded-xl shadow-sm border border-cream-200 p-6 sm:p-8">
        <CurrentStepComponent />
        <StepNavigation
          currentStep={currentStep}
          totalSteps={STEP_COMPONENTS.length}
          onNext={() => setCurrentStep(currentStep + 1)}
          onBack={() => setCurrentStep(currentStep - 1)}
          onSubmit={handleSubmit}
          isLastStep={isLastStep}
        />
      </div>
    </div>
  );
}
