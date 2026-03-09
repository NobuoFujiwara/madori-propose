"use client";

import { STEPS } from "@/lib/constants";

export default function StepProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  index < currentStep
                    ? "bg-forest-500 text-white"
                    : index === currentStep
                    ? "bg-forest-600 text-white ring-4 ring-forest-200"
                    : "bg-cream-200 text-wood-500"
                }`}
              >
                {index < currentStep ? "✓" : index + 1}
              </div>
              <span
                className={`text-xs mt-1 hidden sm:block ${
                  index <= currentStep ? "text-forest-600 font-medium" : "text-wood-500/60"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-colors ${
                  index < currentStep ? "bg-forest-500" : "bg-cream-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
