"use client";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSubmit?: () => void;
  isLastStep?: boolean;
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onSubmit,
  isLastStep,
}: StepNavigationProps) {
  return (
    <div className="flex justify-between mt-8 pt-6 border-t border-cream-200">
      <button
        type="button"
        onClick={onBack}
        disabled={currentStep === 0}
        className="px-6 py-2.5 rounded-lg border border-cream-300 text-wood-600 hover:bg-cream-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        戻る
      </button>
      {isLastStep ? (
        <button
          type="button"
          onClick={onSubmit}
          className="px-8 py-2.5 rounded-lg bg-forest-600 text-white font-medium hover:bg-forest-700 transition-colors"
        >
          この内容で提案を受ける
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 rounded-lg bg-forest-500 text-white font-medium hover:bg-forest-600 transition-colors"
        >
          次へ
        </button>
      )}
    </div>
  );
}
